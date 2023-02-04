import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { MemberArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";
import MemberListItem from "./member-list-item";

/**
 * Props received by the {@link MemberListPage} component.
 */
interface ListPageProps {
  data: MemberArchiveData;
  key: number;
}

function MemberListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  useEffect(() => {
    state.archives.members.ready = data.isReady;

    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.members.nextPage = nextPage as MemberArchiveData;
      });
    } else {
      state.archives.members.nextPage = undefined;
    }
  }, [data.isReady, data.next]);

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one MemberListItem component for each one.
        return <MemberListItem key={item.id} item={item} />;
      })}
    </Container>
  );
}

export default connect(MemberListPage);

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, 275px);
  grid-row-gap: 15px;
  grid-column-gap: 15px;
  margin-top: 20px;

  @media (max-width: 750px) {
    gap: 0;
    display: flex;
    flex-direction: column;
  }
`;
