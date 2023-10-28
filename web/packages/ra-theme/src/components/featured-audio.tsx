import { motion } from "framer-motion";
import { connect, css, Global, styled, useConnect } from "frontity";
import { useCallback } from "react";
import { Packages } from "../../types";
import Pause from "../img/icons/pause-white.svg";
import Play from "../img/icons/play-white.svg";
import Unmute from "../img/icons/speaker-muted-white.svg";
import Mute from "../img/icons/speaker-white.svg";
import SeekSlider from "./seek-slider";

/**
 * Formats time
 * @param total - integer: total seconds
 * @returns string: "minutes:seconds"
 */
const secsToTime = (total: number) => {
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
  loading?: boolean;
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
function FeaturedAudio({ id, loading }: FeaturedAudioProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();

  const getProgressString = () => {
    if (!state.players.recordings.source)
      return secsToTime(0) + " / " + secsToTime(0);

    const progress = state.players.recordings.source.progress;
    const duration = state.players.recordings.source.duration;
    const progressSeconds = Math.floor(duration * progress);
    const durationSeconds = Math.floor(duration);

    return secsToTime(progressSeconds) + " / " + secsToTime(durationSeconds);
  };

  /**
   * play/pause recording
   */
  const onPlay = useCallback(() => {
    state.players.recordings.playing
      ? actions.players.pauseRecordings()
      : actions.players.playRecordings();
  }, [state.players.recordings.playing]);

  /**
   * mute/unmute recording
   */
  const onMute = useCallback(() => {
    state.players.recordings.muted = !state.players.recordings.muted;
  }, [state.players.recordings.muted]);

  const isOpen = state.players.recordings.source?.recording === id;

  if (loading) return <LoadingContainer />;

  return (
    <Container
      isAmp={state.frontity.mode === "amp"}
      className={isOpen ? "" : "hidden"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Global
        styles={css`
          .hidden {
            display: none !important;
          }
        `}
      />

      <div className="rec-play" onClick={onPlay}>
        <img src={state.players.recordings.playing ? Pause : Play} />
      </div>

      <div className="progress-text">{getProgressString()}</div>

      <SeekSlider />

      <div className="rec-mute" onClick={onMute}>
        <img src={state.players.recordings.muted ? Unmute : Mute} />
      </div>
    </Container>
  );
}

export default connect(FeaturedAudio);

const Container = styled(motion.div)<ContainerProps>`
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
