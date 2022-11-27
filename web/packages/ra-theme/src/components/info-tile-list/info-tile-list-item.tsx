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
  if(link)
  {
    noReloadLinkParts = link.split("/");
    noReloadLink = "/" + noReloadLinkParts[noReloadLinkParts.length-2];
  }

  //if link is an id of page, it must be the about-us page
  if(/^-?\d+$/.test(link))
  {
    noReloadLink = "/o-nas";
  }

  return (
    <article>
      <Link link={noReloadLink}>
        {item.acf.image && <FeaturedMedia id={item.acf.image} />}
      </Link>
    </article>
  );
}

// Connect the InfoTileListItem to gain access to `state` as a prop
export default connect(InfoTileListItem);

const Title = styled.h1`
  font-size: 2rem;
  color: rgba(12, 17, 43);
  margin: 0;
  padding-top: 24px;
  padding-bottom: 8px;
  box-sizing: border-box;
`;
