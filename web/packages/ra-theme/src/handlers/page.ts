import { ServerError } from "@frontity/source";
import { PageData } from "@frontity/source/types/data";
import { Handler } from "@frontity/wp-source/types";
import { Packages } from "../../types";
import populate from "../lib/populate";

/**
 * The parameters for {@link pageHandler}.
 */
interface PageHandlerParams {
  /**
   * The slug of the page as configured in WordPress.
   *
   * @example "about"
   */
  slug: string;
}

/**
 * A {@link Handler} function generator for WordPress Pages.
 *
 * This function will generate a handler function for specific page.
 *
 * @param options - Options for the handler generator: {@link PageHandlerParams}.
 *
 * @example
 * ```js
 *   const pageHandlerFunc = pageHandler({
 *     slug: "about",
 *   });
 *   libraries.source.handlers.push({
 *     name: "about page handler",
 *     priority: 30,
 *     pattern: "/o-nas/",
 *     func: pageHandlerFunc,
 *   })
 * ```
 *
 * @returns An async "handler" function that can be passed as an argument to the handler object.
 * This function will be invoked by the frontity framework when calling `source.fetch()` for
 * a specific entity.
 */
const pageHandler =
  ({ slug }: PageHandlerParams): Handler<Packages> =>
  async ({ link, state, libraries, force }) => {
    const { route, query } = libraries.source.parse(link);

    // 1. search id in state or get the entity from WP REST API
    const isInState =
      (state.source.get(route) as Partial<PageData>).id !== undefined;

    if (!isInState || force) {
      // 1.1 fetch data from WP REST API
      const response = await libraries.source.api.get({
        endpoint: "pages",
        params: {
          slug,
          _embed: true,
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
        throw new ServerError(`page with slug "${slug}" not found`, 404);
      }
    }

    // 2. get `type` and `id` from route data and assign props to data
    const data: Partial<PageData> = state.source.get(route);

    Object.assign(data, {
      ...data,
      type: "page",
      link: route,
      route: route,
      query,
      isPage: true,
      isReady: true,
      isFetching: false,
    }); // This ensures the resulting type is correct.

    // Overwrite properties if the request is a preview.
    if (query.preview && state.source.auth) {
      // Fetch the latest revision using the token.
      const response = await libraries.source.api.get({
        endpoint: `${slug}/${data.id}/revisions`,
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

export default pageHandler;
