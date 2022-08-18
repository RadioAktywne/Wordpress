import { connect, styled, useConnect } from "frontity";
import { useContext } from "react";
import Link from "./link";
import { Packages } from "../../types";

import PlayerBackground from "../img/bg/studio.jpg";
import Play from "../img/icons/play-white.svg";
import Pause from "../img/icons/pause-white.svg";
import Unmute from "../img/icons/speaker-muted-white.svg";
import Mute from "../img/icons/speaker-white.svg";

/**
 * Radio player.
 *
 * @returns The player element.
 */
function Player(props) {
  const { state, actions } = useConnect<Packages>();

  const playerToggle = function () {
    if (state.raplayer.playing) actions.raplayer.playerStop();  //erases src, so that it will stop, not only pause
    else {
      //now we set src back, but with some random number - it wont play from cache B)
      state.raplayer.srcUrl = "https://listen.radioaktywne.pl:8443/raogg?c=" + Math.floor(Math.random() * 10000);
      //and play the stream
      actions.raplayer.playerPlay();
    }
  };

  const setVolume = function (vol) {
    state.raplayer.volume = vol;
    state.raplayer.muted = vol == 0 ? true : false; //if user set volume to 0, mute it
    updateVolumeSlider();
  };

  const muteToggle = function () {
    setVolume(state.raplayer.muted ? 1 : 0);
  };

  const updateVolumeSlider = function () {
    //dont touch it, it might explode. And, btw, it makes volume input cooler
    document
      .getElementById("ra-volume")
      .style.setProperty(
        "--track-bg",
        "linear-gradient(90deg, white 0%, white " +
          state.raplayer.volume * 100 +
          "%, #3c3c4c " +
          state.raplayer.volume * 100 +
          "%, #3c3c4c 100%)"
      );
  };

  //set rds autorefresh
  const XMLHttpRequest = require("xhr2");
  const xhr = new XMLHttpRequest();
  const rds = function () {
    xhr.open(
      "GET",
      "https://listen.radioaktywne.pl:8443/status-json.xsl",
      true
    );
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const title = JSON.parse(this.responseText).icestats.source[1].title;

        if (title != "Unknown" && !title.endsWith("- Unknown")) {
          state.theme.title = title;
        }
      }
    };

    xhr.send();
  };

  rds();
  setInterval(function () {
    rds();
  }, 10000);

  return (
    <>
      <BigContainer>
        <div>
          <Container>
            <div
              className="player-bg"
              style={{ backgroundImage: "url(" + PlayerBackground + ")" }}
            ></div>
            <div className="player-title">
              <h2>Player</h2>
            </div>
            <PlayerContainer onLoad={updateVolumeSlider}>
              <div id="ra-left">
                <div id="ra-play" onClick={playerToggle}>
                  <img src={state.raplayer.playing ? Pause : Play} />
                </div>

                <div id="rds">
                  Teraz gramy:
                  <div>{state.theme.title}</div>
                </div>
              </div>

              <div id="ra-right">
                <div id="ra-mute" onClick={muteToggle}>
                  <img src={state.raplayer.muted ? Unmute : Mute} />
                </div>

                <div id="ra-volume-container">
                  <input
                    id="ra-volume"
                    type="range"
                    min="0"
                    max="1" //cause player has such range
                    step=".05"
                    value={state.raplayer.volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </PlayerContainer>
          </Container>
        </div>
      </BigContainer>
    </>
  );
}

export default connect(Player);

const BigContainer = styled.div`
  width: 66.66%;
  display: block;
  position: relative;

  & > div {
    margin-right: 15px;
  }

  @media (max-width: 750px) {
    width: 100%;

    & > div {
      margin-right: 0;
    }
  }
`;

const Container = styled.div`
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 330px;

  & .player-bg {
    background-size: cover;
    background-position-y: center;
    overflow: hidden;
    transform: scale(1.3);
    filter: blur(3px) hue-rotate(9deg);

    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  & .player-title h2 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }

  @media (max-height: 800px) {
    height: unset !important;
  }

  @media (max-width: 750px) {
    height: 330px;
    margin-right: 0px !important;
    font-size: 12px;
  }
`;

const PlayerContainer = styled.div`
  padding: 15px;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: rgba(60, 60, 76, 0.6);
  max-height: 300px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  #ra-left,
  #ra-right {
    display: flex;
    align-items: center;
  }

  #ra-left {
    justify-content: flex-start;
    width: 100%;
  }

  #ra-right {
    justify-content: flex-end;
  }

  #ra-play {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  #ra-mute {
    cursor: pointer;
    margin-right: 50px;
  }

  .invisible {
    display: none !important;
  }

  #rds {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    max-width: 480px;
    margin-left: 20px;
    margin-right: 20px;
    color: #fff;
    font-size: 1.25rem;
  }

  @media (max-width: 1400px) {
    #rds {
      font-size: 1rem;
    }
  }

  #rds > div {
    font-size: 2rem;
    font-weight: bold;
  }

  @media (max-width: 1400px) {
    #rds > div {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 750px) {
    padding: 15px 0;

    #rds {
      font-size: 0.95rem;
    }

    #rds > div {
      font-size: 1.5rem;
    }

    #ra-play {
      margin-left: 15px;
    }
  }

  //range input styles (aka volume)
  #ra-volume-container {
    transform: rotate(-90deg);
    width: 100px;
    position: absolute;
    right: 0;
  }

  //make it ready
  input[type="range"] {
    -webkit-appearance: none;
    width: 100px;
    height: 11px;

    background: var(
      --track-bg,
      linear-gradient(90deg, white 0%, white 100%, #3c3c4c 100%, #3c3c4c 100%)
    );

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
    #ra-volume-container {
      display: none;
    }
  }
`;
