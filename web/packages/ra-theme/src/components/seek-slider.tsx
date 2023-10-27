import { connect, css, styled, useConnect } from "frontity";
import { useCallback, useContext } from "react";
import { Packages } from "../../types";
import { PlayerContext } from "./index";

/**
 * The Component that renders seek slider.
 * @returns A react component.
 */
function SeekSlider(): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * ReactPlayer handle from context - lets us to access ReactPlayer object
   */
  const playerHandle = useContext(PlayerContext);

  /**
   * when user uses seek slider
   */
  const onChange = useCallback(
    (progress: number) => {
      playerHandle.current.seekTo(progress); //seek

      if (state.players.recordings.source)
        state.players.recordings.source.progress = progress;
    },
    [playerHandle.current, state.players.recordings.source],
  );

  return (
    <Container>
      <input
        className="rec-seek"
        type="range"
        min={0}
        max={1}
        step="any"
        css={css`
          background: linear-gradient(
            90deg,
            #6aba9c 0%,
            #6aba9c ${(state.players.recordings.source?.progress || 0) * 100}%,
            white ${(state.players.recordings.source?.progress || 0) * 100}%,
            white 100%
          );
        `}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        value={state.players.recordings.source?.progress || 0}
      />
    </Container>
  );
}

export default connect(SeekSlider);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  //make it ready
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
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
