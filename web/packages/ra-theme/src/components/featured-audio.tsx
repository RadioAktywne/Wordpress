import { connect, css, Global, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import useMedia from "../hooks/useMedia";
import Play from "../img/icons/play-white.svg";
import Pause from "../img/icons/pause-white.svg";
import Unmute from "../img/icons/speaker-muted-white.svg";
import Mute from "../img/icons/speaker-white.svg";
import SeekSlider from "./seek-slider";

/**
 * Formats time
 * @param total - integer: total seconds
 * @returns string: "minutes:seconds"
 */
const secsToTime = function (total) {
  const minutes =
    Math.floor(total / 60) >= 10
      ? Math.floor(total / 60)
      : "0" + Math.floor(total / 60);
  const seconds =
    Math.floor(total) % 60 >= 10
      ? Math.floor(total) % 60
      : "0" + (Math.floor(total) % 60);
  return minutes + ":" + seconds;
};

/**
 * Props of the {@link FeaturedAudio} component.
 */
interface FeaturedAudioProps {
  id: number;
}

/**
 * Props of the {@link Container} component.
 */
interface ContainerProps {
  isAmp: boolean;
}

/**
 * The Component that renders a featured audio.
 * @param props - The state injected by {@link connect } and the ID of the
 * featured audio.
 * @returns A react component.
 */
function FeaturedAudio({ id }: FeaturedAudioProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();
  const {
    status,
    value: [media],
  } = useMedia([id]);

  /**
   * ReactPlayer handle from context - lets us to access ReactPlayer object
   */

  /**
   * wait until media is loaded
   * if it doesnt exist, return null
   */
  if (status === "pending")
    return <LoadingContainer>{/* <Loading /> */}</LoadingContainer>;
  if (!media) return null;

  /**
   * those functions help us to listen events of opening and closing recordings.
   * @returns .hidden class name if a recording is being closed
   */
  function openRecording() {
    if (state.players.recordings.isOpened[id] !== true) {
      state.players.recordings.isOpened[id] = true;
      state.players.recordings.srcUrl = media.source_url;
    }

    return "";
  }

  function closeRecording() {
    if (state.players.recordings.isOpened[id] == true) {
      state.players.recordings.isOpened[id] = false;
    }

    return "hidden";
  }

  /**
   * check if a recording should be opened.
   * @returns a boolean
   */
  function shouldBeOpened() {
    return state.players.recordings.openedRec == id;
  }

  /**
   * play/pause recording
   */
  const recToggle = function () {
    state.players.recordings.playing
      ? actions.players.recordings.playerPause()
      : actions.players.recordings.playerPlay();
  };

  /**
   * mute/unmute recording
   */
  const recMuteToggle = function () {
    state.players.recordings.muted = !state.players.recordings.muted;
  };

  return (
    <Container
      isAmp={state.frontity.mode === "amp"}
      className={shouldBeOpened() ? openRecording() : closeRecording()}
    >
      <Global
        styles={css`
          .hidden {
            display: none !important;
          }
        `}
      />

      <div className="rec-play" onClick={recToggle}>
        <img src={state.players.recordings.playing ? Pause : Play} />
      </div>

      <div className="progress-text">
        {state.players.recordings.durations[id] !== undefined
          ? secsToTime(
              Math.floor(
                state.players.recordings.durations[id] *
                  state.players.recordings.played
              )
            ) +
            " / " +
            secsToTime(Math.floor(state.players.recordings.durations[id]))
          : "00:00 / 00:00"}
      </div>

      <SeekSlider />

      <div className="rec-mute" onClick={recMuteToggle}>
        <img src={state.players.recordings.muted ? Unmute : Mute} />
      </div>
    </Container>
  );
}

export default connect(FeaturedAudio);

const Container = styled.div<ContainerProps>`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;

  ${({ isAmp }) => isAmp && "position: relative;"}
  .rec-play, .rec-mute {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .rec-play img {
    width: 30px;
    height: 30px;
    margin-right: 15px;
  }

  .rec-mute img {
    width: 35px;
    height: 35px;
    margin-right: 25px;
    margin-left: 15px;
  }

  .progress-text {
    white-space: nowrap;
    margin-right: 10px;
  }
`;

const LoadingContainer = styled.div`
  & > div {
    padding: 0 !important;
    margin-top: -10px !important;
    opacity: 0.2 !important;
  }

  position: absolute !important;
  background: transparent !important;
  opacity: 0.5 !important;
`;
