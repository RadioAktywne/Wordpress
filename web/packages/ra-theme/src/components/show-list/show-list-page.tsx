import { connect, decode, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { useEffect } from "react";
import Loading from "../loading";
import { ShowArchiveData } from "../../data";
import ShowListItem from "./show-list-item";

/**
 * Props received by the {@link ShowListPage} component.
 */
interface ListPageProps {
  data: ShowArchiveData;
  key: number;
}

function ShowListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  if (data.isReady) {
    state.shows.ready = true;

    if (data.next) {
      useEffect(() => {
        actions.source.fetch(data.next);
      }, []);
      state.shows.nextPage = state.source.get(data.next) as ShowArchiveData;
    } else {
      state.shows.nextPage = undefined;
    }
  }

  return data.isReady ? (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one ShowListItem component for each one.
        return <ShowListItem key={item.id} item={item} />;
      })}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(ShowListPage);

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
