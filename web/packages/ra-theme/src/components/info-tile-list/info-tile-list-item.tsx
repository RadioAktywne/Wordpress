import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { InfoTileEntity } from "../../data";
import { replacePath } from "../../lib/utils";
import FeaturedImage from "../featured-image";
import DefaultImage from "../default-image";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";

/**
 * The props of the {@link InfoTileListItem} component.
 */
interface ItemProps {
  /**
   * The post that should be shown.
   */
  item: InfoTileEntity;
}

/**
 * Info Tile List item Component.
 *
 * It renders an info tile.
 *
 * @param props - Defined in {@link ItemProps}.
 *
 * @returns The rendered info tile.
 */
function InfoTileListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const link = item.acf.link.toString();
  const path = new URL(link).pathname;

  const frontPath = replacePath(path, state.configuration);

  return (
    <article>
      <Tile>
        <Link link={frontPath}>
          <Title>{item.acf.title}</Title>
          <ImageContainer>
            {item.acf.image ? (
              <FeaturedImage id={item.acf.image} />
            ) : (
              <DefaultImage img={defaultImageMedia} />
            )}
          </ImageContainer>
        </Link>
      </Tile>
    </article>
  );
}

// Connect the InfoTileListItem to gain access to `state` as a prop
export default connect(InfoTileListItem);

const ImageContainer = styled.div`
  height: 330px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Tile = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h2`
  color: #6aba9c;
  background-color: #3c3c4c;
  border-bottom: solid 2px #6aba9c;
  padding-left: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: lighter;

  &:hover {
    color: #fff;
    background-color: #6aba9c;
    border-bottom: solid 2px #3c3c4c;
  }
`;
