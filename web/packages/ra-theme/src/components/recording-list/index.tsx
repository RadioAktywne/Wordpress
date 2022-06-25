import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load a recording directly.
 */
export default loadable(() => import("./recording-list"));
