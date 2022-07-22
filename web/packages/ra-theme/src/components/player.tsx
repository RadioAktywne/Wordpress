import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";

/**
 * Radio player.
 *
 * @returns The player element.
 */

function Player(props) {
  const { state } = useConnect<Packages>();
  return (
    <>
    <BigContainer>
      <div>
        <Container>
          <div className="player-bg" style={{backgroundImage: 'url(' + props.bgUrl + ')'}}></div>
          <div className="player-title">
            <h2>Player</h2>
          </div>
          <PlayerContainer>
            <div id="jp-live-play">
              <img src="https://radioaktywne.pl/user/themes/raktywne/images/play-white.svg"/>
            </div>

            <div id="jp-live-pause">
              <img src="https://radioaktywne.pl/user/themes/raktywne/images/pause-white.svg"/>
            </div>

            <div id="rds">
              Teraz gramy:
              <div>{state.theme.title}</div>
            </div>

            <div id="jp-live-mute">
              <img src="https://radioaktywne.pl/user/themes/raktywne/images/guosnik-white.svg"/>
            </div>

            <div id="jp-live-unmute">
              <img src="https://radioaktywne.pl/user/themes/raktywne/images/guosnik-mute-white.svg"/>
            </div>

            <div style={{width: '1%'}}></div>
						<div id="volume-slider">
                t o d o
            </div>
            <div style={{width: '3%'}}></div>
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

  @media (max-width: 900px)
  {
    width: 100%;

    & > div {
      margin-right: 0;
    }
  }
`

const Container = styled.div`
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 330px;

  & .player-bg
  {
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

  & .player-title h2
  {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }

  @media (max-height: 800px)
  {
    height: unset !important;
  }

  @media (max-width: 900px)
  {
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

  & > #jp-live-play
  {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > #jp-live-pause
  {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    display: none;
  }

  & > #rds
  {
    flex: auto;
    max-width: 480px;
    margin-left: 20px;
    margin-right: 20px;
    color: #fff;
    font-size: 1.25rem;
  }

  & > #rds > div
  {
    font-size: 2rem;
    font-weight: bold;
  }

  & > #jp-live-unmute
  {
    display: none;
  }

  @media (max-width: 750px)
  {
    padding: 15px 0;

    & > #rds
    {
      font-size: .95rem;
    }
  
    & > #rds > div
    {
      font-size: 1.5rem;
    }

    & > #jp-live-play
    {
      margin-left: 15px;
    }
  }
`