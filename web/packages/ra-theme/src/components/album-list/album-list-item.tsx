import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { AlbumEntity } from "../../data";
import FeaturedImage from "../featured-image";
import DefaultImage from "../default-image";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";
import parse from "html-react-parser";

/**
 * The props of the {@link AlbumListItem} component.
 */
interface ItemProps {
  /**
   * The album that should be shown.
   */
  item: AlbumEntity;
}

function AlbumListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();

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
              <ArtistName>
                {parse(item.title.rendered.split(" &#8211; ")[0])}
              </ArtistName>

              <SongTitle>
                {parse(item.title.rendered.split(" &#8211; ")[1])}
              </SongTitle>
            </Title>
          </Cover>
        </Link>
      </article>
    </Container>
  );
}

// Connect the AlbumListItem to gain access to `state` as a prop
export default connect(AlbumListItem);

const ArtistName = styled.h5`
  color: #fff;
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 1rem;

  padding-left: 10px;
  padding-top: 10px;
`;

const SongTitle = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 1.3rem;
  padding: 0;

  padding-left: 10px;
  padding-bottom: 10px;
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
