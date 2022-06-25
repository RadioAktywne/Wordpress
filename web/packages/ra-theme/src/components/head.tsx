import { connect, decode, Head as FrontityHead, useConnect } from "frontity";
import { isAuthor, isError, isPostType, isTerm } from "@frontity/source";
import { Packages } from "../../types";
import React from "react";

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
  // Set the default title.
  let title = state.frontity.title;

  if (isTerm(data)) {
    // Add titles to taxonomies, like "Category: Nature - Blog Name" or "Tag: Japan - Blog Name".
    // 1. Get the taxonomy entity from the state to get its taxonomy term and name.
    const { taxonomy, name } = state.source[data.taxonomy][data.id];
    // 2. Uppercase first letter of the taxonomy term (from "category" to "Category").
    const taxonomyCapitalized =
      taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1);
    // 3. Render the proper title.
    title = `${taxonomyCapitalized}: ${decode(name)} - ${state.frontity.title}`;
  } else if (isAuthor(data)) {
    // Add titles to authors, like "Author: Jon Snow - Blog Name".
    // 1. Get the author entity from the state to get its name.
    const { name } = state.source.author[data.id];
    // 2. Render the proper title.
    title = `Author: ${decode(name)} - ${state.frontity.title}`;
  } else if (isPostType(data)) {
    // Add titles to posts and pages, using the title and ending with the Blog Name.
    // 1. Get the post entity from the state and get its title.
    const postTitle = state.source[data.type][data.id].title.rendered;
    // 2. Remove any HTML tags found in the title.
    const cleanTitle = decode(postTitle);
    // 3. Render the proper title.
    title = `${cleanTitle} - ${state.frontity.title}`;
  } else if (isError(data) && data.is404) {
    // Add titles to 404's.
    title = `404 Not Found - ${state.frontity.title}`;
  }

  return (
    <FrontityHead {...props}>
      <title>{title}</title>
      {children}
    </FrontityHead>
  );
}

export default connect(Head);
