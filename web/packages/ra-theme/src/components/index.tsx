import { connect, css, Global, styled, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import { isError, isHome, isPage, isPostArchive } from "@frontity/source";
import Header from "./header";
import Footer from "./footer";
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
  isEventArchive,
  isInfoTileArchive,
  isMember,
  isMemberArchive,
  isPostType,
  isRecording,
  isRecordingArchive,
  isShow,
  isShowArchive,
} from "../data";
import Member from "./member";
import Show from "./show";
import Album from "./album";
import Recording from "./recording";
import Head from "./head";
import Page from "./page";
import Home from "./home";
import ReactPlayer from "react-player";
import React from "react";
import PostList from "./post-list/post-list";
import Post from "./post";
import Favicon from "../img/favicon.png"

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @returns The top-level react component representing the theme.
 */

function Theme() {
  const { state, actions } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  /**
   * Things related to playing audio (needs to be global)
   */
  // handle for ReactPlayer object (right now undefined)
  const recplayer = React.useRef<ReactPlayer>(null);
  // when recording is ready to be played, show its duration
  const setDuration = function () {
    state.players.recordings.durations[state.players.recordings.openedRec] =
      recplayer.current.getDuration();
  };
  // when recording progresses, update played (recording progress) state
  const handleProgress = (played) => {
    state.players.recordings.played = played;
  };
  // when recording ends, change play icon to pause
  const recordingEnded = function () {
    actions.players.recordings.playerPause();
  };
  /**
   * End of things related to playing audio (needs to be global)
   */

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      {/* @ts-ignore */}
      <Head>
        <meta name="description" content={state.frontity.description} />
        <link rel="icon" type="image/x-icon" href={Favicon}></link>
        <html lang="pl" />
      </Head>

      {/* Add some global styles for the whole site, like body or a's.
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={globalStyles} />

      {/* Add the header of the site. */}
      <HeadContainer>
        <Header />
      </HeadContainer>

      {/* radio player needs to be on each page - thats why its here */}
      <ReactPlayer
        playing={state.players.main.playing}
        url={state.players.main.srcUrl}
        volume={state.players.main.volume}
        width={0}
        height={0}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />

      {/* same with recording player */}
      <ReactPlayer
        playing={state.players.recordings.playing}
        url={state.players.recordings.srcUrl}
        volume={1}
        muted={state.players.recordings.muted}
        width={0}
        height={0}
        ref={recplayer}
        progressInterval={50}
        onReady={setDuration}
        onProgress={(e) => {
          handleProgress(e.played);
        }}
        onEnded={recordingEnded}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />

      <PlayerContext.Provider value={recplayer}>
        <Main>
          {/* @ts-ignore */}
          <Switch>
            <Loading when={data.isFetching} />
            <PageError when={isError(data)} data={isError(data) && data} />
            <Home
              when={isHome(data) && isPage(data)}
              data={isHome(data) && isPage(data) && data}
            />
            <PostList
              when={isPostArchive(data)}
              data={isPostArchive(data) && data}
            />
            <Page when={isPage(data)} data={isPage(data) && data} />
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
            <Album when={isAlbum(data)} data={isAlbum(data) && data} />
            <Recording
              when={isRecording(data)}
              data={isRecording(data) && data}
            />
            <Post when={isPostType(data)} data={isPostType(data) && data} />
          </Switch>
        </Main>
      </PlayerContext.Provider>

      <Footer />
    </>
  );
}

export default connect(Theme);
export const PlayerContext = React.createContext(undefined);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    background-color: #f7f5f6;
    line-height: 1.7;
    font-family: sans-serif;
  }

  @media (max-width: 1400px) {
    body {
      font-size: 12px;
    }
  }

  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }
`;

const HeadContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
  background-color: #3c3c4c;

  padding: 0 3rem;

  @media (max-width: 1020px) {
    padding: 0 0.3rem;
  }

  @media (max-width: 940px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 42px; //space for footer + 2px
`;
