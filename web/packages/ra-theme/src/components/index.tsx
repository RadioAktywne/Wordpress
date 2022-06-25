import { connect, css, Global, styled, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import { isError } from "@frontity/source";
import Header from "./header";
import MemberList from "./member-list";
import ShowList from "./show-list";
import EventList from "./event-list";
import AlbumList from "./album-list";
import RecordingList from "./recording-list";
import InfoTileList from "./info-tile-list";
import Loading from "./loading";
import PageError from "./page-error";
import { Packages } from "../../types";
import {
  isAlbum,
  isAlbumArchive,
  isEvent,
  isEventArchive,
  isInfoTileArchive,
  isMember,
  isMemberArchive,
  isRecording,
  isRecordingArchive,
  isShow,
  isShowArchive
} from "../data";
import Member from "./member";
import Show from "./show";
import Event from "./event";
import Album from "./album";
import Recording from "./recording";
import Head from "./head";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @returns The top-level react component representing the theme.
 */
function Theme() {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  console.log(data)

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      {/* @ts-ignore */}
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
        {/* @ts-ignore */}
        <Switch>
          <Loading when={data.isFetching} />
          <PageError when={isError(data)} data={isError(data) && data} />
          <MemberList
            when={isMemberArchive(data)}
            data={isMemberArchive(data) && data}
          />
          <ShowList
            when={isShowArchive(data)}
            data={isShowArchive(data) && data}
          />
          <EventList
            when={isEventArchive(data)}
            data={isEventArchive(data) && data}
          />
          <AlbumList
            when={isAlbumArchive(data)}
            data={isAlbumArchive(data) && data}
          />
          <RecordingList
            when={isRecordingArchive(data)}
            data={isRecordingArchive(data) && data}
          />
          <InfoTileList
            when={isInfoTileArchive(data)}
            data={isInfoTileArchive(data) && data}
          />
          <Member when={isMember(data)} data={isMember(data) && data} />
          <Show when={isShow(data)} data={isShow(data) && data} />
          <Event when={isEvent(data)} data={isEvent(data) && data} />
          <Album when={isAlbum(data)} data={isAlbum(data) && data} />
          <Recording
            when={isRecording(data)}
            data={isRecording(data) && data}
          />
        </Switch>
      </Main>
    </>
  );
}

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
  background-image: linear-gradient(180deg,
  rgba(66, 174, 228, 0.1),
  rgba(66, 174, 228, 0));
`;
