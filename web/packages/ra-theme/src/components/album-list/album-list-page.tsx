import { connect, decode, styled, useConnect } from "frontity";
import AlbumListItem from "./album-list-item";
import { Packages } from "../../../types";
import { AlbumArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";

/**
 * Props received by the {@link AlbumListPage} component.
 */
interface ListPageProps {
  data: AlbumArchiveData;
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
      state.albums.nextPage = state.source.get(data.next) as AlbumArchiveData;
    } else {
      state.albums.nextPage = undefined;
    }
  }

  return data.isReady ? (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one AlbumListItem component for each one.
        return <AlbumListItem key={item.id} item={item} />;
      })}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(AlbumListPage);

const Container = styled.section`
  display: flex;
  flex-direction: row;
  align-items: space-between;

  column-gap: 15px;

  @media (max-width: 750px) {
    column-gap: 0;
    flex-direction: column;
  }
`;
