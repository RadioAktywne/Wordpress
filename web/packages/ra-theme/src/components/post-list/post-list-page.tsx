import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { useEffect } from "react";
import Loading from "../loading";
import { ArchiveData } from "@frontity/source/types";
import PostListItem from "./post-list-item";

/**
 * Props received by the {@link AlbumListPage} component.
 */
interface ListPageProps {
  data: ArchiveData;
  key: number;
}

function PostListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  if (data.isReady) {
    state.posts.ready = true;

    if (data.next) {
      useEffect(() => {
        actions.source.fetch(data.next);
      }, []);
      state.posts.nextPage = state.source.get(data.next) as ArchiveData;
    } else {
      state.posts.nextPage = undefined;
    }
  }

  return data.isReady ? (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one PostListItem component for each one.
        return <PostListItem key={item.id} item={item} />;
      })}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(PostListPage);

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
