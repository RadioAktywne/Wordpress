import { ServerError } from "@frontity/source";
import { PostTypeData } from "@frontity/source/types/data";
import capitalize from "@frontity/wp-source/src/libraries/handlers/utils/capitalize";
import { Handler } from "@frontity/wp-source/types";
import populate from "../lib/populate";
import { Packages } from "../../types";

/**
 * The parameters for {@link postTypeHandler}.
 */
interface PostTypeHandlerParams {
  /**
   * The slug of the post type as configured in WordPress.
   *
   * @example "movie"
   */
  type: string;

  /**
   * Endpoint [WP REST API endpoint](https://developer.wordpress.org/rest-api/reference/)
   * from which the generated handler is going to fetch the data.
   */
  endpoint: string;

  /**
   * Additional API params to be passed to the endpoint.
   */
  params?: { [p: string]: any };
}

/**
 * A {@link Handler} function generator for WordPress Post Types.
 *
 * This function will generate a handler function for specific
 * [WP REST API endpoint](https://developer.wordpress.org/rest-api/reference/)
 * from which the data is going to be fetched.
 *
 * @param options - Options for the handler generator: {@link PostTypeHandlerParams}.
 *
 * @example
 * ```js
 *   const postTypeHandlerFunc = postTypeHandler({
 *     type: "movie",
 *     endpoint: "movie",
 *   });
 *   libraries.source.handlers.push({
 *     name: "movie handler",
 *     priority: 30,
 *     pattern: "/film/:slug",
 *     func: postTypeHandlerFunc,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the handler object.
 * This function will be invoked by the frontity framework when calling `source.fetch()` for
 * a specific entity.
 */
const postTypeHandler =
  ({
    type,
    endpoint,
    params: apiParams = {},
  }: PostTypeHandlerParams): Handler<Packages> =>
  async ({ link, params, state, libraries, force }) => {
    const { route, query } = libraries.source.parse(link);

    const finalEndpoint =
      endpoint === "posts" ? state.source.postEndpoint : endpoint;

    // 1. search id in state or get the entity from WP REST API
    const isInState =
      (state.source.get(route) as Partial<PostTypeData>).id !== undefined;

    if (!isInState || force) {
      const { slug } = params;

      // 1.1 fetch data from WP REST API
      const response = await libraries.source.api.get({
        endpoint: finalEndpoint,
        params: {
          slug,
          _embed: true,
          ...apiParams,
          ...state.source.params,
        },
      });

      // 1.2 populate state with fetched data
      const addedArray = await populate({
        response,
        state,
        force,
      });

      // 1.3 throw error if no data was found
      if (addedArray.length === 0) {
        throw new ServerError(
          `post type from endpoint "${finalEndpoint}" with slug "${slug}" not found`,
          404
        );
      }
    }

    // 2. get `type` and `id` from route data and assign props to data
    const data: Partial<PostTypeData> = state.source.get(route);

    Object.assign(data, {
      ...data,
      type,
      link: route,
      route: route,
      query,
      isPostType: true,
      [`is${capitalize(data.type)}`]: true,
    }); // This ensures the resulting type is correct.

    // Overwrite properties if the request is a preview.
    if (query.preview && state.source.auth) {
      // Fetch the latest revision using the token.
      const response = await libraries.source.api.get({
        endpoint: `${finalEndpoint}/${data.id}/revisions`,
        params: { ...state.source.params, per_page: 1 },
        auth: state.source.auth,
      });

      // Get modified props from revision.
      const revision = await response.json();
      if (revision.code) {
        console.log(revision);
        throw new ServerError(revision.message, revision.data.status);
      }

      const [json] = revision;

      if (json.parent === data.id) {
        const { title, content, excerpt } = json;
        // Merge props with entity.
        Object.assign(data, { title, content, excerpt });
      } else {
        // Error response.
        console.warn(json);
      }
    }
  };

export default postTypeHandler;
