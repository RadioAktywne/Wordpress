import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import VolumeSlider from "./volume-slider";

import { useCallback, useEffect } from "react";
import PlayerBackground from "../img/bg/studio.jpg";
import Pause from "../img/icons/pause-white.svg";
import Play from "../img/icons/play-white.svg";
import Unmute from "../img/icons/speaker-muted-white.svg";
import Mute from "../img/icons/speaker-white.svg";
import Loading from "./loading";

import XMLHttpRequest from "xhr2";

/**
 * Radio player.
 *
 * @returns The player element.
 */
function Player() {
  const { state, actions } = useConnect<Packages>();

  const onPlay = useCallback(() => {
    if (state.players.main.playing) {
      actions.players.pauseMain();
      return;
    }

    // we set url with some random number - it wont play from cache B)
    const url = "https://listen.radioaktywne.pl/ramp3?c=" + Date.now();

    if (state.players.main.source) {
      state.players.main.source.url = url;
    } else {
      state.players.main.source = {
        url: url,
        title: null,
      };
    }

    //and play the stream
    actions.players.playMain();
  }, [state.players.main.playing]);

  const onMute = useCallback(() => {
    state.players.main.muted = !state.players.main.muted;
  }, [state.players.main.muted]);

  const rds = () => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://listen.radioaktywne.pl/status-json.xsl", true);

    xhr.onreadystatechange = () => {
      if (!state.players.main.source) return;

      if (xhr.readyState === 4 && xhr.status === 200) {
        const title = JSON.parse(xhr.responseText).icestats.source[1].title;

        if (title.endsWith(" - Unknown"))
          state.players.main.source.title = title.replace(" - Unknown", "");
        else if (title != "Unknown") {
          state.players.main.source.title = title;
        }
      }
    };

    xhr.send();
  };

  useEffect(() => {
    rds();
    const interval = setInterval(rds, 1000);

    return () => clearInterval(interval);
  }, []);

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
            <PlayerContainer>
              <div id="ra-left">
                <div id="ra-play" onClick={onPlay}>
                  <img src={state.players.main.playing ? Pause : Play} />
                </div>

                <div id="rds">
                  {state.players.main.source?.title ? (
                    <>
                      Teraz gramy:
                      <div>{state.players.main.source.title}</div>
                    </>
                  ) : (
                    <Loading />
                  )}
                </div>
              </div>

              <div id="ra-right">
                <div id="ra-mute" onClick={onMute}>
                  <img src={state.players.main.muted ? Unmute : Mute} />
                </div>

                <VolumeSlider />
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
  border: solid 7px #30241a;
  box-sizing: border-box;

  box-shadow: 7px -6px 0px 0px #e85a57;
  -webkit-box-shadow: 7px -6px 0px 0px #e85a57;
  -moz-box-shadow: 7px -6px 0px 0px #e85a57;

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
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
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

    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    margin-top: 6px;
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

    @media (max-width: 360px) {
      display: none;
    }
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
`;
