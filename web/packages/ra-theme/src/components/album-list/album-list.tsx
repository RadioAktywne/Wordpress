import { connect, decode, styled, useConnect } from "frontity";
import AlbumListItem from "./album-list-item";
import Pagination from "./pagination";
import { Packages } from "../../../types";
import { isAuthor, isTerm } from "@frontity/source";
import { AlbumArchiveData } from "../../data";

/**
 * Props received by the {@link AlbumList} component.
 */
interface ListProps {
  /**
   * Data object representing an archive link.
   */
  data: AlbumArchiveData;

  /**
   * Flag used by Frontity's {@link Switch} component to decide whether
   * this component should be rendered.
   */
  when?: boolean;
}

/**
 * Component that renders the list of albums,
 * passed as an {@link AlbumArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function AlbumList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  return (
    <Container>
      {/* If the list is a term, we render a title. */}
      {isTerm(data) && (
        <Header>
          {data.taxonomy}:{" "}
          <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
        </Header>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {isAuthor(data) && (
        <Header>
          Author: <b>{decode(state.source.author[data.id].name)}</b>
        </Header>
      )}

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one AlbumListItem component for each one.
        return <AlbumListItem key={item.id} item={item} />;
      })}
      <Pagination data={data} />
    </Container>
  );
}

export default connect(AlbumList);

const Container = styled.section`
  width: 800px;
  margin: 0;
  padding: 24px;
  list-style: none;
`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;
