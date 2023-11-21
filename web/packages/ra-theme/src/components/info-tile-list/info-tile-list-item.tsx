import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { InfoTileEntity } from "../../data";
import defaultImageMedia from "../../img/defaultMedias/defaultMedia.png";
import { replacePath } from "../../lib/utils";
import DefaultImage from "../default-image";
import FeaturedImage from "../featured-image";
import Link from "../link";

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

  const frontPath = replacePath(path, state.config);

  return (
    <article>
      <Tile>
        <Link link={frontPath}>
          <Title>{item.acf.title}</Title>
          <ImageContainer>
            {item.acf.image ? (
              <FeaturedImage id={item.acf.image} size="large"/>
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
  height: 280px;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1030px) {
    height: 200px;
  }
`;

const Tile = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h2`
  color: rgb(106, 186, 156);
  background-color: rgb(48, 36, 26);
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
  font-weight: lighter;

  &:hover {
    color: #fff;
    background-color: #6aba9c;
  }
`;
