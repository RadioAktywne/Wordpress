import { PostEntity } from "@frontity/source/types";
import { motion } from "framer-motion";
import { connect, styled } from "frontity";
import parse from "html-react-parser";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";
import DefaultImage from "../default-image";
import FeaturedImage from "../featured-image";
import Link from "../link";

/**
 * The props of the {@link AlbumListItem} component.
 */
interface ItemProps {
  /**
   * The post that should be shown.
   */
  item: PostEntity;
}

function AlbumListItem({ item }: ItemProps): JSX.Element {
  return (
    <Container
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", duration: 0.4, delay: Math.random() / 5 }}
    >
      <article>
        <Link link={item.link}>
          <PostTile>
            {item.featured_media ? (
              <FeaturedImage id={item.featured_media} />
            ) : (
              <DefaultImage img={defaultImageMedia} />
            )}
            <Title>{parse(item.title.rendered)}</Title>
          </PostTile>
        </Link>
      </article>
    </Container>
  );
}

// Connect the AlbumListItem to gain access to `state` as a prop
export default connect(AlbumListItem);

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

  color: #fff;
  margin: 0;
  font-size: 1.3rem;
  padding: 0;

  padding-left: 10px;
  padding-bottom: 10px;
`;

const PostTile = styled.div`
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
