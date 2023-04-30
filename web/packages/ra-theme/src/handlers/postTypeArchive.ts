import { ServerError } from "@frontity/source";
import capitalize from "@frontity/wp-source/src/libraries/handlers/utils/capitalize";
import { Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";
import populate from "../lib/populate";

/**
 * The parameters for {@link postTypeArchiveHandler}.
 */
interface PostTypeArchiveHandlerParams {
  /**
   * The slug of the post type as configured in WordPress.
   *
   * @example "movie"
   */
  type: string;

  /**
   * The [WP REST API endpoint](https://developer.wordpress.org/rest-api/reference/)
   * from which the generated handler is going to fetch the data.
   *
   * @example "movies"
   */
  endpoint: string;

  /**
   * Additional API params to be passed to the endpoint.
   */
  params?: { [p: string]: any };
}

/**
 * A {@link Handler} function generator for WordPress Post Type archives.
 *
 * This function will generate a handler function for a specific [WP REST API
 * endpoint](https://developer.wordpress.org/rest-api/reference/) from which the
 * data is going to be fetched.
 *
 * @param options - Options for the handler generator:
 * {@link PostTypeArchiveHandlerParams}.
 *
 * @example
 * ```js
 *   const postTypeArchiveHandlerFunc = postTypeHandler({
 *     type: "movie",
 *     endpoint: "movies",
 *   });
 *   libraries.source.handlers.push({
 *     name: "movies archive handler",
 *     priority: 30,
 *     pattern: "/filmy/",
 *     func: postTypeArchiveHandlerFunc,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the
 * handler object. This function will be invoked by the frontity framework when
 * calling `source.fetch()` for a specific entity.
 */
const postTypeArchiveHandler =
  ({
    type,
    endpoint,
    params: apiParams = {},
  }: PostTypeArchiveHandlerParams): Handler<Packages> =>
  async ({
    link: currentLink,
    route: currentRoute,
    state,
    libraries,
    force,
  }) => {
    // This 'or' is only for backward compatibility for the moment when handlers
    // used to receive `route` instead of `link`.
    const link = currentLink || currentRoute;
    const { page, query, route } = libraries.source.parse(link);

    const finalEndpoint =
      endpoint === "posts" ? state.source.postEndpoint : endpoint;

    // 1. fetch the specified page
    const response = await libraries.source.api.get({
      endpoint: finalEndpoint,
      params: {
        search: query.s,
        page,
        _embed: true,
        ...apiParams,
        ...state.source.params,
      },
    });

    // 2. populate response
    const items = await populate({
      response,
      state,
      force,
    });
    if (page > 1 && items.length === 0)
      throw new ServerError(`post archive doesn't have page ${page}`, 404);

    // 4. get posts and pages count
    const total = libraries.source.getTotal(response, items.length);
    const totalPages = libraries.source.getTotalPages(response, 0);

    // returns true if next page exists
    const hasNewerPosts = page < totalPages;
    // returns true if previous page exists
    const hasOlderPosts = page > 1;

    // 5. add data to source
    const currentPageData = state.source.get(route);

    const newPageData = {
      type,
      items,
      total,
      totalPages,
      isArchive: true,
      isPostTypeArchive: true,
      [`is${capitalize(type)}Archive`]: true,
      isReady: true,
      isFetching: false,

      // Add next and previous if they exist.
      ...(hasOlderPosts && {
        previous: libraries.source.stringify({
          route: route,
          query,
          page: page - 1,
        }),
      }),
      ...(hasNewerPosts && {
        next: libraries.source.stringify({
          route: route,
          query,
          page: page + 1,
        }),
      }),

      // Add search data if this is a search.
      ...(query.s && { isSearch: true, searchQuery: query.s }),
    };

    // This ensures the resulting type is correct.
    Object.assign(currentPageData, newPageData);
  };

export default postTypeArchiveHandler;
