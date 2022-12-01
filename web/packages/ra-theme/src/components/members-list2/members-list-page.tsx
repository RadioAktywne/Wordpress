import { connect, decode, styled, useConnect } from "frontity";
import AlbumListItem from "./members-list-item";
import { Packages } from "../../../types";
import { AlbumArchiveData, MemberArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";
import MemberListItem from "../member-list/member-list-item";

/**
 * Props received by the {@link AlbumListPage} component.
 */
interface ListPageProps {
  data: MemberArchiveData;
  key: number;
}

function AlbumListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  if (data.isReady) {
    state.albums.ready = true;

    if (data.next) {
      useEffect(() => {
        actions.source.fetch(data.next);
      }, []);
      state.members.nextPage = state.source.get(data.next) as MemberArchiveData;
    } else {
      state.members.nextPage = undefined;
    }
  }

  return data.isReady ? (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one AlbumListItem component for each one.
        return <MemberListItem key={item.id} item={item} />;
      })}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(AlbumListPage);

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fill, 275px);
  grid-row-gap: 15px;
  grid-column-gap: 15px;

  @media (max-width: 750px) {
    gap: 0;
    display: flex;
    flex-direction: column;
  }
`;
