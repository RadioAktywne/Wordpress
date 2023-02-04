import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { ShowEntity } from "../../data";
import FeaturedImage from "../featured-image";
import DefaultImage from "../default-image";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";

/**
 * The props of the {@link ShowListItem} component.
 */
interface ItemProps {
  /**
   * The show that should be shown.
   */
  item: ShowEntity;
}

function ShowListItem({ item }: ItemProps): JSX.Element {
  const {} = useConnect<Packages>();

  return (
    <Container>
      <article>
        <Link link={item.link}>
          <Cover>
            {item.acf.image ? (
              <FeaturedImage id={item.acf.image} />
            ) : (
              <DefaultImage img={defaultImageMedia} />
            )}
            <Title>
              <ShowName>{item.acf.title}</ShowName>
            </Title>
          </Cover>
        </Link>
      </article>
    </Container>
  );
}

// Connect the ShowListItem to gain access to `state` as a prop
export default connect(ShowListItem);

const ShowName = styled.h3`
  color: #fff;
  margin: 0;
  padding: 5px;
  font-size: 1.3rem;

  padding-left: 10px;
`;

const Container = styled.h1`
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

  @media (max-width: 750px) {
  }
`;
