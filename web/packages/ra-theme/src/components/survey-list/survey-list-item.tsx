import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { SurveyEntity } from "../../data";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";
import DefaultImage from "../default-image";
import FeaturedImage from "../featured-image";
import Link from "../link";

/**
 * The props of the {@link SurveyListItem} component.
 */
interface ItemProps {
  /**
   * The survey that should be shown.
   */
  item: SurveyEntity;
}

function SurveyListItem({ item }: ItemProps): JSX.Element {
  const {} = useConnect<Packages>();

  return (
    <Container
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.4, delay: Math.random() / 5 }}
    >
      <article>
        <Link link={item.link}>
          <Cover>
            {item.acf.image ? (
              <FeaturedImage id={item.acf.image} />
            ) : (
              <DefaultImage img={defaultImageMedia} />
            )}
            <Title>
              <SurveyName>{item.acf.title}</SurveyName>
            </Title>
          </Cover>
        </Link>
      </article>
    </Container>
  );
}

// Connect the SurveyListItem to gain access to `state` as a prop
export default connect(SurveyListItem);

const SurveyName = styled.h5`
  color: #fff;
  margin: 0;
  font-size: 1.3rem;
  padding: 0;

  padding-left: 10px;
  padding-bottom: 10px;
`;

const Container = styled(motion.h1)`
  width: 100%;
  height: 275px;
  margin: 0;

  @media (max-width: 750px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  background-color: rgba(60, 60, 76, 0.6);

  position: absolute;

  width: 100%;
  bottom: 0;
`;

const Cover = styled.div`
  height: 275px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`;
