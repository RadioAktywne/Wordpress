import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load an album directly.
 */
export default loadable(() => import("./post-list"));
