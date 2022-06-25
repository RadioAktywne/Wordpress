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
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <article>
      <Link link={item.acf.link}>
        <Title dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
      </Link>

      {item.acf.image && <FeaturedMedia id={item.acf.image} />}
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

const AuthorName = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const PublishDate = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;
