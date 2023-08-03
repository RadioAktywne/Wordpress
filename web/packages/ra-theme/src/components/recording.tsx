import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import { RecordingData, RecordingEntity } from "../data";
import FeaturedAudio from "./featured-audio";
import Back from "../img/icons/back.svg";
import Link from "./link";
import parse from "html-react-parser";
import FeaturedImage from "./featured-image";
import DefaultImage from "./default-image";
import defaultImageMedia from "../img/defaultMedias/defaultMedia.png";
import { motion } from "framer-motion";

/**
 * Properties received by the `Recording` component.
 */
interface RecordingProps {
  data: RecordingData;
  when?: boolean; // Whether to render this component.
}

/**
 * The Recording component that is used to render recordings
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Recording} element rendered.
 */
function Recording({ data }: RecordingProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const recording: RecordingEntity = state.source[data.type][data.id];

  /**
   * Open the recording if data is ready:
   *  stop current recording
   *  open ours by saving its id in state
   */
  if (
    data.isReady &&
    state.players.recordings.openedRec != recording.acf.file
  ) {
    state.players.recordings.srcUrl = "";
    state.players.recordings.playing = false;
    state.players.recordings.played = 0;

    state.players.recordings.openedRec = recording.acf.file;
  }

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainContent>
        <Title>
          <h1>{recording.acf.title}</h1>

          <BackButton>
            <Link link={state.configuration.posts.recording.archivePath}>
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <AudioContainer>
          {recording.acf.file && <FeaturedAudio id={recording.acf.file} />}
        </AudioContainer>

        <Description>{parse(recording.acf.description)}</Description>
      </MainContent>

      <Cover>
        {recording.acf.image ? (
          <FeaturedImage id={recording.acf.image} />
        ) : (
          <DefaultImage img={defaultImageMedia} />
        )}
      </Cover>
    </Container>
  ) : null;
}

export default connect(Recording);

const Container = styled(motion.section)`
  max-width: 1140px;
  width: 100%;
  margin: 0 30px;
  padding: 24px;
  padding-top: 20px;

  display: flex;
  flex-direction: row;

  @media (max-width: 1400px) {
    margin: 0 10px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    padding: 20px 0;
    margin: 0;
  }
`;

const Description = styled.div`
  color: #30241a;
  font-size: 1rem;
  line-height: 1.7;
  margin-top: 20px;
  white-space: pre-line;

  & ul,
  & ol {
    line-height: 1;
    margin: 0;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }

  @media (max-width: 750px) {
    margin: 0 20px;
  }
`;

const MainContent = styled.div`
  width: 66.6%;
  padding-right: 20px;

  @media (max-width: 750px) {
    width: 100%;
    padding-right: 0;
  }
`;

const AudioContainer = styled.div`
  background-color: #30241a;
  color: white;
`;

const Cover = styled.div`
  width: 33.3%;
  aspect-ratio: 1/1;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 750px) {
    width: 100%;

    & img {
      width: 100%;
    }

    aspect-ratio: auto;
    height: auto;
    padding-right: 0;
    border: none;
    margin-top: 30px;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > h1 {
    color: #6aba9c;
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
    font-size: 1.6rem;
    width: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 1400px) {
      font-size: 1.2rem;
    }
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  border-left: 2px solid #6aba9c;
  background-color: #30241A;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;

  & img {
    height: 30px;
    width: 50px;
    transform: rotateZ(90deg);
  }
`;
