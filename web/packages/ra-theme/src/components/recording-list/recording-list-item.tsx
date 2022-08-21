import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { RecordingEntity } from "../../data";
import Arrow from "../../img/icons/arrow.svg";
import FeaturedAudio from "../featured-audio";

/**
 * The props of the {@link RecordingListItem} component.
 */
interface ItemProps {
  /**
   * The recording that should be shown.
   */
  item: RecordingEntity;
}

/**
 * Recording List item Component.
 *
 * It renders the preview of a recording.
 *
 * @param props - Defined in {@link ItemProps}.
 *
 * @returns The rendered recording.
 */
function RecordingListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * lists of sliders - will be accessed when a recording is opened
   */
  const sliders = document.querySelectorAll<HTMLElement>(".rec-seek");

  /**
   * this happens when user clicks on some recording from list:
   *  pause current recording
   *  open ours by saving its id in state
   *  set progress text to 0
   *  set sliders to white
   */
  const openRecording = function () {
    state.recplayer.playing = false;
    state.recplayer.openedRec = item.id;

    if(state.recplayer.durations[item.id] != undefined)
      document.getElementById("prog-text-" + item.id).innerText = "00:00 / " + secsToTime(state.recplayer.durations[item.id]);
    
    for(let i = 0; i < sliders.length; i++)
      sliders[i].style.setProperty("--track-bg", "white");
  };

  /**
   * check if a recording is open.
   * @returns a boolean
   */
  function isOpen() {
    return state.recplayer.openedRec == item.id;
  }

  /**
   * convert seconds (number, eg. 80) to minutes and seconds (string, eg. 01:20)
   */
  const secsToTime = function(total)
  {
    const minutes = Math.floor(total/60) >= 10 ? Math.floor(total/60) : ('0' + Math.floor(total/60));
    const seconds = Math.floor(total)%60 >= 10 ? Math.floor(total)%60 : ('0' + Math.floor(total)%60);
    return minutes + ":" + seconds;
  }

  return (
    <Container>
      <Title onClick={openRecording} className={isOpen() ? "hidden" : ""}>
        {item.title.rendered}
      </Title>

      <div className={isOpen() ? "" : "hidden"}>
        <FeaturedAudio id={item.acf.file}/>
      </div>

      <BackButton>
        <Link link={item.link}>
          <span className="showMore">Więcej...</span>
          <img src={Arrow} alt="pokaż więcej" />
        </Link>
      </BackButton>
    </Container>
  );
}

// Connect the RecordingListItem to gain access to `state` as a prop
export default connect(RecordingListItem);

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  color: white;

  & > div {
    width: 100%;
  }

  &:nth-of-type(2n) > div {
    background-color: rgba(60, 60, 76, 0.8);
  }

  &:nth-of-type(2n + 1) > div {
    background-color: #3c3c4c;
  }

  & > .hidden {
    display: none;
  }
`;

const Title = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;

  &:hover {
    background-color: #6aba9c !important;
    cursor: pointer;
  }
`;

const BackButton = styled.div`
  width: auto !important;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    height: 40px;
    background-color: white !important;
    border-left: solid #6aba9c 2px;
    color: #3c3c4c;
  }

  & > a > .showMore {
    width: 0px;
    opacity: 0;
    letter-spacing: -7px;
    transition: all ease-in-out 0.1s;
  }

  & > a:hover > .showMore {
    width: 70px;
    opacity: 1;
    letter-spacing: normal;
    transition: all ease-in-out 0.1s;
  }

  & > a > img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }

  @media (max-width: 750px) {
    & > a:hover > .showMore {
      width: 50px;
    }
  }
`;
