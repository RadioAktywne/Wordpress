import {
  isAuthor,
  isError,
  isHome,
  isPostArchive,
  isPostType,
  isTerm,
} from "@frontity/source";
import { Head as FrontityHead, connect, decode, useConnect } from "frontity";
import React from "react";
import { Packages } from "../../types";
import {
  isAlbumArchive,
  isEventArchive,
  isInfoTileArchive,
  isMemberArchive,
  isRecordingArchive,
  isShowArchive,
  isSurveyArchive,
} from "../data";

/**
 * Head with `<title>` tag populated with different titles, based on the type of
 * page rendered.
 *
 * @returns The `<head>` tag.
 */
function Head({
  // @ts-ignore
  children,
  ...props
}: React.ComponentProps<typeof FrontityHead>): JSX.Element {
  const { state } = useConnect<Packages>();
  // Get data about the current URL.
  const data = state.source.get(state.router.link);

  const getTitle = () => {
    if (isTerm(data)) {
      // Add titles to taxonomies, like "Category: Nature - Blog Name" or "Tag: Japan - Blog Name".
      // 1. Get the taxonomy entity from the state to get its taxonomy term and name.
      const { taxonomy, name } = state.source[data.taxonomy][data.id];
      // 2. Uppercase first letter of the taxonomy term (from "category" to "Category").
      const taxonomyCapitalized =
        taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1);
      // 3. Render the proper title.
      return `${taxonomyCapitalized}: ${decode(name)} - ${
        state.frontity.title
      }`;
    }

    if (isAuthor(data)) {
      // Add titles to authors, like "Author: Jon Snow - Blog Name".
      // 1. Get the author entity from the state to get its name.
      const { name } = state.source.author[data.id];
      // 2. Render the proper title.
      return `Author: ${decode(name)} - ${state.frontity.title}`;
    }

    if (isPostType(data) && !isHome(data)) {
      // Add titles to posts and pages, using the title and ending with the Blog Name.
      // 1. Get the post entity from the state and get its title.
      const postTitle = state.source[data.type][data.id].title.rendered;
      // 2. Remove any HTML tags found in the title.
      const cleanTitle = decode(postTitle);
      // 3. Render the proper title.
      return `${cleanTitle} - ${state.frontity.title}`;
    }

    if (isMemberArchive(data)) {
      return `Radiowcy - ${state.frontity.title}`;
    }

    if (isShowArchive(data)) {
      return `Audycje - ${state.frontity.title}`;
    }

    if (isEventArchive(data)) {
      return `Ramówka - ${state.frontity.title}`;
    }

    if (isAlbumArchive(data)) {
      return `Płyty Tygodnia - ${state.frontity.title}`;
    }

    if (isRecordingArchive(data)) {
      return `Nagrania - ${state.frontity.title}`;
    }

    if (isSurveyArchive(data)) {
      return `Ankiety - ${state.frontity.title}`;
    }

    if (isInfoTileArchive(data)) {
      return `Radio - ${state.frontity.title}`;
    }

    if (isPostArchive(data)) {
      return `Blog - ${state.frontity.title}`;
    }

    if (isError(data) && data.is404) {
      // Add titles to 404's.
      return `404 Not Found - ${state.frontity.title}`;
    }

    return state.frontity.title;
  };

  return (
    <FrontityHead {...props}>
      <title>{getTitle()}</title>
      <meta property="og:title" content={getTitle()} />
      {children}
    </FrontityHead>
  );
}

export default connect(Head);
