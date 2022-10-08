import { connect, decode, styled, useConnect } from "frontity";
import RecordingListItem from "./recording-list-item";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";

/**
 * Props received by the {@link RecordingListPage} component.
 */
interface ListPageProps {
  data: RecordingArchiveData;
  key: number;
}

function RecordingListPage({ data }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  /**
   * wait till its fetched
   *  tell state if current page is ready
   *  preload next page
   *  render items from current page
   */
  if(data.isReady)
  {
    state.recordings.ready = true;

    if(data.next)
    {
      useEffect(() => {
        actions.source.fetch(data.next);
      }, []);
      state.recordings.nextPage = state.source.get(data.next) as RecordingArchiveData;
    } else {
      state.recordings.nextPage = undefined;
    }
  }

  return data.isReady ? (
    <Container>
      {data.items.map(({ type, id }) => {
        const item = state.source[type][id];
        // Render one RecordingListItem component for each one.
        return <RecordingListItem key={item.id} item={item} />;
      })}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(RecordingListPage);

const Container = styled.section`
  width: 100%;
`;
