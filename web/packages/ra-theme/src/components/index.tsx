import { connect, css, Global, styled, useConnect } from "frontity";
import Switch from "@frontity/components/switch";
import { isError, isHome, isPage } from "@frontity/source";
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
  isShowArchive,
} from "../data";
import Member from "./member";
import Show from "./show";
import Event from "./event";
import Album from "./album";
import Recording from "./recording";
import Head from "./head";
import Page from "./page";
import Home from "./home";
import ReactPlayer from "react-player";
import React from "react";

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
   * handle for ReactPlayer object (right now undefinied)
   */
  const recplayer = React.useRef<ReactPlayer>(null); 

  /**
   * when recording progresses
   *  update played (recording progress) state
   *  update seek sliders if user isnt seeking
   *  if we dont know duration of current recording, save it 
   *  update progress texts (next to play/pause button)
   */
  const handleProgress = (played) => {               
    state.recplayer.played = played;

    if(!state.recplayer.seeking)
      actions.recplayer.updateSeekSliders();

    if(state.recplayer.durations[state.recplayer.openedRec] == undefined)
      state.recplayer.durations[state.recplayer.openedRec] = recplayer.current.getDuration();  

    actions.recplayer.updateProgressText();
  };

  /**
   * when recording ends, 
   *  change play icon to pause
   *  update seek slider to full (without that, there will be a little white bar)
   */
  const recordingEnded = function() {
    actions.recplayer.playerPause();

    const sliders = document.querySelectorAll<HTMLElement>(".rec-seek");
    for(let i = 0; i < sliders.length; i++) {
      sliders[i].style.setProperty(
        "--track-bg",
        "#6aba9c"
      );
    }
  }


  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      {/* @ts-ignore */}
      <Head>
        <meta name="description" content={state.frontity.description} />
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
        playing={state.raplayer.playing}
        url={state.raplayer.srcUrl}
        volume={state.raplayer.volume}
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
        playing={state.recplayer.playing}
        url={state.recplayer.srcUrl}
        volume={1}
        muted={state.recplayer.muted}
        width={0}
        height={0}
        ref={recplayer}
        progressInterval={50}
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
            <Event when={isEvent(data)} data={isEvent(data) && data} />
            <Album when={isAlbum(data)} data={isAlbum(data) && data} />
            <Recording
              when={isRecording(data)}
              data={isRecording(data) && data}
            />
          </Switch>
        </Main>
      </PlayerContext.Provider>
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

  @media (max-width: 900px) {
    padding: 0 0.3rem;
  }

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;
