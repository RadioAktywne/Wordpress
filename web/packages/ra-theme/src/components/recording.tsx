import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-image";
import { RecordingData, RecordingEntity } from "../data";
import FeaturedAudio from "./featured-audio";
import Back from "../img/icons/back.svg";
import Link from "./link";
import parse from "html-react-parser";

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

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <MainContent>
        <Title>
          <h1>{recording.acf.title}</h1>

          <BackButton>
            <Link link="/recordings">
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <AudioContainer>
          {recording.acf.file && <FeaturedAudio id={recording.acf.file} />}
        </AudioContainer>

        <Description>
          {parse(
            //parse html
            recording.acf.description
              .replace('<div class="article-containter">', "") //remove div at the beginning
              .replace("</div>", "") //remove closing div at the end
              .replace(/(?:\r\n|\r|\n)/g, "<br>") //convert new lines to breaks
              .replace(/^(<br>)+|(<br>)+$/g, "") //remove newlines at the beginning and at the end
          )}
        </Description>
      </MainContent>

      {recording.acf.image && (
        <Cover>
          <FeaturedMedia id={recording.acf.image} />
        </Cover>
      )}
    </Container>
  ) : null;
}

export default connect(Recording);

const Container = styled.div`
  max-width: 1140px;
  width: 100%;
  margin: 0 30px;
  padding: 24px;

  display: flex;
  flex-direction: row;

  @media (max-width: 1400px) {
    margin: 0 10px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    padding: 24px 0;
    margin: 0;
  }
`;

const Description = styled.div`
  color: #3c3c4c;
  font-size: 1rem;
  line-height: 1.7;
  margin-top: 20px;

  @media (max-width: 1400px) {
    font-size: 0.8rem;
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
  background-color: #3c3c4c;
  color: white;
`;

const Cover = styled.div`
  width: 33.3%;
  aspect-ratio: 1/1;

  overflow: hidden;

  border: solid 1px black;

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
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
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
  background-color: #fff;
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
