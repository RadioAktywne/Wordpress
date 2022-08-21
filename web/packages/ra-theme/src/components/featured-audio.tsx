import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import useMedia from "../hooks/useMedia";
import Loading from "./loading";
import Play from "../img/icons/play-white.svg";
import Pause from "../img/icons/pause-white.svg";
import Unmute from "../img/icons/speaker-muted-white.svg";
import Mute from "../img/icons/speaker-white.svg";
import React from 'react';
import {PlayerContext} from "./index"

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

  if (status === "pending") return <Loading />;
  if (!media) return null;

  /**
   * ReactPlayer handle from context - lets us to access ReactPlayer object
   */
  const playerHandle = React.useContext(PlayerContext);  

  /**
   * play/pause recording
   *  
   */
  const recToggle = function () {
    if(state.recplayer.srcUrl != media.source_url) {
      state.recplayer.srcUrl = media.source_url;
    }

    state.recplayer.playing ? actions.recplayer.playerPause() : actions.recplayer.playerPlay();
  };

  /**
   * when user uses seek slider
   */
  const handleChange = function(newProgress) {
    playerHandle.current.seekTo(newProgress); //seek
    
    const sliders = document.querySelectorAll<HTMLElement>(".rec-seek"); //update the seek slider
    for(let i = 0; i < sliders.length; i++) {
      sliders[i].style.setProperty(
        "--track-bg",
        "linear-gradient(90deg, #6aba9c 0%, #6aba9c " +
          newProgress * 100 +
          "%, white " +
          newProgress * 100 +
          "%, white 100%)"
      );
    }

    state.recplayer.played = newProgress;
    actions.recplayer.updateProgressText();                        //update the progress text
  }

  /**
   * mute/unmute recording
   */
  const recMuteToggle = function() {
    state.recplayer.muted = !state.recplayer.muted;
  }

  return (
    <Container isAmp={state.frontity.mode === "amp"}>
      <div className="rec-play" onClick={recToggle}>
        <img src={state.recplayer.playing ? Pause : Play} />
      </div>

      <div className="progress-text" id={"prog-text-" + (id - 1)}>00:00 / ??:??</div>

      <div id="rec-seek-container">
        <input
          className="rec-seek"
          type="range"
          min={0}
          max={1}
          step='any'
          onChange={(e) => handleChange(parseFloat(e.target.value))}
          onMouseDown={actions.recplayer.startSeeking}
          onMouseUp={actions.recplayer.stopSeeking}
          value={state.recplayer.played}
        />
      </div>

      <div className="rec-mute" onClick={recMuteToggle}>
        <img src={state.recplayer.muted ? Unmute : Mute} />
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

  .progress-text
  {
    white-space: nowrap;
    margin-right: 10px;
  }


  //range input styles (aka seek slider)
  #rec-seek-container
  {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  //make it ready
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;

    background: var(
      --track-bg,
      linear-gradient(90deg, #6aba9c 0%, #6aba9c 0%, white 0%, white 100%)
    );

    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-ms-track {
    width: 100%;
    cursor: pointer;

    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  //factual styles
  //thumb
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0px;
    width: 0px;
    border: 0px;
  }
  input[type="range"]::-moz-range-thumb {
    height: 0px;
    width: 0px;
    border: 0px;
  }
  input[type="range"]::-ms-thumb {
    height: 0px;
    width: 0px;
    border: 0px;
  }
`;
