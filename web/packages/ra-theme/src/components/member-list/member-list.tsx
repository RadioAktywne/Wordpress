import { connect, decode, styled, useConnect } from "frontity";
import MemberListItem from "./member-list-item";
import Pagination from "./pagination";
import { Packages } from "../../../types";
import { isAuthor, isTerm } from "@frontity/source";
import { MemberArchiveData } from "../../data";

/**
 * Props received by the {@link MemberList} component.
 */
interface ListProps {
  /**
   * Data object representing an archive link.
   */
  data: MemberArchiveData;

  /**
   * Flag used by Frontity's {@link Switch} component to decide whether
   * this component should be rendered.
   */
  when?: boolean;
}

/**
 * Component that renders the list of members,
 * passed as an {@link MemberArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function MemberList({ data }: ListProps): JSX.Element {
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
        // Render one MemberListItem component for each one.
        return <MemberListItem key={item.id} item={item} />;
      })}
      <Pagination data={data} />
    </Container>
  );
}

export default connect(MemberList);

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
