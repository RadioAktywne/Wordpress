import { connect, css, styled, useConnect } from "frontity";
import { Packages } from "../../types";

/**
 * Volume slider.
 *
 * @returns The slider element.
 */
function VolumeSlider() {
  const { state } = useConnect<Packages>();

  const setVolume = function (vol) {
    state.raplayer.volume = vol;
    state.raplayer.muted = vol == 0 ? true : false; //if user set volume to 0, mute it
  };

  return (
    <Container>
        <input
            id="ra-volume"
            css={css`
            background: linear-gradient(90deg, 
                white 0%, 
                white ${state.raplayer.volume * 100}%, 
                #3c3c4c ${state.raplayer.volume * 100}%, 
                #3c3c4c 100%);
            `}
            type="range"
            min="0"
            max="1" //cause player has such range
            step=".05"
            value={state.raplayer.volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
    </Container>
  );
}

export default connect(VolumeSlider);

const Container = styled.div`
    transform: rotate(-90deg);
    width: 100px;
    position: absolute;
    right: 0;

  //make it ready
  input[type="range"] {
    -webkit-appearance: none;
    width: 100px;
    height: 11px;

    cursor: pointer;
    border: 1px solid white;
    border-radius: 3px;
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
    border: 1px solid rbga(69, 69, 69);
    height: 17px;
    width: 18px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
    margin-top: -14px;
  }
  input[type="range"]::-moz-range-thumb {
    border: 1px solid rbga(69, 69, 69);
    height: 17px;
    width: 18px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-thumb {
    border: 1px solid rbga(69, 69, 69);
    height: 17px;
    width: 18px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb:active {
    background: #6aba9c;
    border: 1px solid #003eff;
  }
  input[type="range"]::-ms-thumb:active {
    background: #6aba9c;
    border: 1px solid #003eff;
  }
  input[type="range"]::-webkit-slider-thumb:active {
    background: #6aba9c;
    border: 1px solid #003eff;
  }

  @media (max-width: 450px) {
    display: none;
  }
`;
