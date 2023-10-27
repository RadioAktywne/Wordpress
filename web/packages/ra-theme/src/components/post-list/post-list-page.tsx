import { ArchiveData } from "@frontity/source/types";
import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import Loading from "../loading";
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
  useEffect(() => {
    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.posts.nextPage = nextPage as ArchiveData;
        state.archives.posts.ready = data.isReady;
      });
    } else {
      state.archives.posts.nextPage = undefined;
    }
  }, [data.isReady, data.next]);

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one PostListItem component for each one.
        return <PostListItem key={item.id} item={item} />;
      })}
    </Container>
  );
}

export default connect(PostListPage);

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
