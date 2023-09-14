import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import { SurveyData, SurveyEntity } from "../data";
import defaultImageMedia from "../img/defaultMedias/defaultMedia.png";
import Back from "../img/icons/back.svg";
import DefaultImage from "./default-image";
import FeaturedImage from "./featured-image";
import Link from "./link";
import Loading from "./loading";

/**
 * Properties received by the `Survey` component.
 */
interface SurveyProps {
  data: SurveyData;
  when?: boolean;
}

/**
 * The Survey component that is used to render surveys
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Survey} element rendered.
 */
function Survey({ data }: SurveyProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const survey: SurveyEntity = state.source[data.type][data.id];

  if (!data.isReady) return <Loading />;

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MainContent>
        <Title>
          <h1>{survey.acf.title}</h1>

          <BackButton>
            <Link link={state.config.posts.survey.archivePath}>
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <Description>{survey.acf.id}</Description>
      </MainContent>

      <Cover>
        {survey.acf.image ? (
          <FeaturedImage id={survey.acf.image} />
        ) : (
          <DefaultImage img={defaultImageMedia} />
        )}
      </Cover>
    </Container>
  );
}

export default connect(Survey);

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

const Cover = styled.div`
  width: 33.3%;
  height: auto;
  aspect-ratio: 1/1;

  overflow: hidden;

  display: flex;
  align-items: flex-start;
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
  background-color: #30241a;
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
