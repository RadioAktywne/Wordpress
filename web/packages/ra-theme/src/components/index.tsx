import { connect, css, Global, Head, styled, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import { isArchive, isError, isPost } from "@frontity/source";
import Header from "./header";
import List from "./list";
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import { Packages } from "../../types";
import {
  isAlbum,
  isEvent,
  isInfoTile,
  isMember,
  isRecording,
  isShow
} from "../data";
import Member from "./member";
import Show from "./show";
import Event from "./event";
import Album from "./album";
import Recording from "./recording";
import InfoTile from "./info-tile";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @returns The top-level react component representing the theme.
 */
const Theme = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <Main>
        <Switch>
          <Loading when={data.isFetching} />
          <List when={isArchive(data)} data={isArchive(data) && data} />
          <Post when={isPost(data)} data={isPost(data) && data} />
          <PageError when={isError(data)} data={isError(data) && data} />
          <Member when={isMember(data)} data={isMember(data) && data} />
          <Show when={isShow(data)} data={isShow(data) && data} />
          <Event when={isEvent(data)} data={isEvent(data) && data} />
          <Album when={isAlbum(data)} data={isAlbum(data) && data} />
          <Recording
            when={isRecording(data)}
            data={isRecording(data) && data}
          />
          <InfoTile when={isInfoTile(data)} data={isInfoTile(data) && data} />
        </Switch>
      </Main>
    </>
  );
};

export default connect(Theme);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1f38c5;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    rgba(66, 174, 228, 0.1),
    rgba(66, 174, 228, 0)
  );
`;
