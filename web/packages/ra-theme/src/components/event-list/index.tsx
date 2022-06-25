import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load an event directly.
 */
export default loadable(() => import("./event-list"));
