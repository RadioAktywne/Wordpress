import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load an info tile directly.
 */
export default loadable(() => import("./info-tile-list"));
