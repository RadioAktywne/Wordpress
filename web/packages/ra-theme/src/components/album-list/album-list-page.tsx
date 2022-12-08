import { connect, styled, useConnect } from "frontity";
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
  useEffect(() => {
    state.archives.albums.ready = data.isReady;

    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.albums.nextPage = nextPage as AlbumArchiveData;
      });
    } else {
      state.archives.albums.nextPage = undefined;
    }
  }, [data.isReady, data.next]);

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one AlbumListItem component for each one.
        return <AlbumListItem key={item.id} item={item} />;
      })}
    </Container>
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
