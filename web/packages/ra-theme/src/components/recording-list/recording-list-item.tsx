import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { RecordingEntity } from "../../data";
import Arrow from "../../img/icons/arrow.svg";
import FeaturedAudio from "../featured-audio";
import parse from "html-react-parser";

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
 * It renders the preview of a recording.
 *
 * @param props - Defined in {@link ItemProps}.
 * @returns The rendered recording.
 */
function RecordingListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * this happens when user clicks on some recording from list:
   *  stop current recording
   *  open ours by saving its id in state
   */
  const openRecording = function () {
    state.players.recordings.srcUrl = "";
    state.players.recordings.playing = false;
    state.players.recordings.played = 0;

    state.players.recordings.openedRec = item.acf.file;
  };

  /**
   * check if a recording is open.
   * @returns a boolean
   */
  function shouldBeOpened() {
    return state.players.recordings.openedRec == item.acf.file;
  }

  return (
    <Container>
      <Title
        onClick={openRecording}
        className={shouldBeOpened() ? "hidden" : ""}
      >
        {parse(item.title.rendered)}
      </Title>

      <FeaturedAudio id={item.acf.file} />

      <BackButton
        onClick={() => {
          if (item.acf.file !== state.players.recordings.openedRec)
            openRecording();
        }}
      >
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

  &:nth-of-type(2n + 1) > div {
    background-color: rgba(48, 36, 26, 0.8);
  }

  &:nth-of-type(2n) > div {
    background-color: #30241a;
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
    color: #30241a;
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
