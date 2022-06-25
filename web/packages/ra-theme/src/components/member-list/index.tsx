import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load a member directly.
 */
export default loadable(() => import("./member-list"));
