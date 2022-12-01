import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-image";
import { Packages } from "../../../types";
import { ShowEntity } from "../../data";

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
            {item.acf.image && <FeaturedMedia id={item.acf.image} />}
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
  margin-bottom: 0px;
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
