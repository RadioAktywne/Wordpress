import { loadable } from "frontity";

/**
 * Split the list component, so it's not included if the users
 * load a survey directly.
 */
export default loadable(() => import("./survey-list"));
