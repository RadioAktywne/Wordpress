import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import { AlbumArchiveData } from "../../data";
import Loading from "../loading";
import AlbumListItem from "./album-list-item";

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
    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.albums.nextPage = nextPage as AlbumArchiveData;
        state.archives.albums.ready = data.isReady;
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
        return <AlbumListItem key={item.id} item={item} onHome={false} />;
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
  margin-top: 20px;

  @media (max-width: 750px) {
    gap: 0;
    display: flex;
    flex-direction: column;
  }
`;
