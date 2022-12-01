import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-image";
import { Packages } from "../../../types";
import { InfoTileEntity } from "../../data";

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
  let link = item.acf.link.toString();
  let noReloadLinkParts, noReloadLink;
  if (link) {
    noReloadLinkParts = link.split("/");
    noReloadLink = "/" + noReloadLinkParts[noReloadLinkParts.length - 2];
  }

  //if link is an id of page, it must be the about-us page
  if (/^-?\d+$/.test(link)) {
    noReloadLink = "/about";
  }

  return (
    <article>
      <Tile>
        <Link link={noReloadLink}>
          <Title>{item.acf.title}</Title>
          {item.acf.image && <FeaturedMedia id={item.acf.image} />}
        </Link>
      </Tile>
    </article>
  );
}

// Connect the InfoTileListItem to gain access to `state` as a prop
export default connect(InfoTileListItem);

const Tile = styled.div`
  width: 100%;
  height: 350px;
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
