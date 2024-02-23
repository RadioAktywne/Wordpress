import Switch from "@frontity/components/switch";
import { isError, isHome, isPage, isPostArchive } from "@frontity/source";
import { Global, connect, css, styled, useConnect } from "frontity";
import React, { useCallback, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { Packages } from "../../types";
import {
  isAlbum,
  isAlbumArchive,
  isArchive,
  isEventArchive,
  isInfoTileArchive,
  isMember,
  isMemberArchive,
  isPostType,
  isRecording,
  isRecordingArchive,
  isShow,
  isShowArchive,
  isSurvey,
  isSurveyArchive,
} from "../data";
import Favicon from "../img/favicon.png";
import Album from "./album";
import AlbumList from "./album-list";
import EventList from "./event-list";
import Footer from "./footer";
import Head from "./head";
import Header from "./header";
import Home from "./home";
import InfoTileList from "./info-tile-list";
import Loading from "./loading";
import Member from "./member";
import MemberList from "./member-list";
import Page from "./page";
import PageError from "./page-error";
import Post from "./post";
import PostList from "./post-list/post-list";
import Recording from "./recording";
import RecordingList from "./recording-list";
import Show from "./show";
import ShowList from "./show-list";
import Survey from "./survey";
import SurveyList from "./survey-list";
import Banner from "../img/logos/ra_banner.png";
import useMedia from "../hooks/useMedia";

/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @returns The top-level react component representing the theme.
 */

function Index() {
  const { state, actions, libraries } = useConnect<Packages>();
  const { route } = libraries.source.parse(state.router.link);
  const [ogImage, setOgImage] = React.useState<string>();
  const data = state.source.get(route);

  // handle for ReactPlayer object (right now undefined)
  const recplayer = useRef<ReactPlayer>(null);

  // when recording is ready to be played, show its duration
  const onPlayerReady = useCallback(() => {
    if (!state.players.recordings.source) return;
    state.players.recordings.source.duration = recplayer.current.getDuration();
  }, [state.players.recordings.source, recplayer.current]);

  // when recording progresses, update played (recording progress) state
  const onPlayerProgress = useCallback(
    (progress: number) => {
      if (!state.players.recordings.source) return;
      state.players.recordings.source.progress = progress;
    },
    [state.players.recordings.source],
  );

  // when recording ends, change play icon to pause
  const onPlayerEnd = useCallback(() => {
    actions.players.pauseRecordings();
  }, []);

  // try to load og image if acf
  // const {
  //   status,
  //   value: [media],
  // } = useMedia([state?.source[data?.type][data?.id]?.acf?.image]);

  // useEffect(() => {
  //   if(status == "success" && media)
  //     setOgImage(media.source_url);
  //   else if(status != "idle" && status != "pending")
  //     setOgImage(Banner);
  // }, [status])

  console.log(state?.source[data?.type][data?.id]?.acf?.image);

  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      {/* @ts-ignore */}
      <Head>
        <meta name="description" content={state.frontity.description} />
        <meta property="og:description" content={state.frontity.description} />
        <meta property="og:locale" content="pl_PL" />
        <link rel="icon" type="image/x-icon" href={Favicon}></link>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <html lang="pl" />

        {ogImage && 
            <meta name="twitter:image" property="og:image" content={ogImage} />
        }

        {ogImage && 
            <link property="image" href={ogImage} />
        }
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
        url={state.players.main.source?.url}
        volume={state.players.main.volume}
        muted={state.players.main.muted}
        width={0}
        height={0}
        config={{ file: { forceAudio: true } }}
      />

      {/* same with recording player */}
      <ReactPlayer
        playing={state.players.recordings.playing}
        url={state.players.recordings.source?.url}
        volume={1}
        muted={state.players.recordings.muted}
        width={0}
        height={0}
        ref={recplayer}
        progressInterval={50}
        onReady={onPlayerReady}
        onProgress={(e) => onPlayerProgress(e.played)}
        onEnded={onPlayerEnd}
        config={{ file: { forceAudio: true } }}
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
            <SurveyList
              when={isSurveyArchive(data)}
              data={isSurveyArchive(data) && data}
            />
            <Member when={isMember(data)} data={isMember(data) && data} />
            <Show when={isShow(data)} data={isShow(data) && data} />
            <Album when={isAlbum(data)} data={isAlbum(data) && data} />
            <Recording
              when={isRecording(data)}
              data={isRecording(data) && data}
            />
            <Survey when={isSurvey(data)} data={isSurvey(data) && data} />
            <Post when={isPostType(data)} data={isPostType(data) && data} />
          </Switch>
        </Main>
      </PlayerContext.Provider>

      <Footer />
    </>
  );
}

export default connect(Index);
export const PlayerContext = React.createContext(undefined);

const globalStyles = css`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

    background-color: #fff4dc;
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
  background-color: #30241a;

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
