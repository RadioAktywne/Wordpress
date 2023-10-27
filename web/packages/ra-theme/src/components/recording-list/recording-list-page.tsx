import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import Loading from "../loading";
import RecordingListItem from "./recording-list-item";

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
  useEffect(() => {
    if (data.next) {
      actions.source.fetch(data.next).then(() => {
        const nextPage = state.source.get(data.next);
        state.archives.recordings.nextPage = nextPage as RecordingArchiveData;
        state.archives.recordings.ready = data.isReady;
      });
    } else {
      state.archives.recordings.nextPage = undefined;
    }
  }, [data.isReady, data.next]);

  if (!data.isReady) return <Loading />;

  return (
    <Container>
      {data.items.map(({ type, id }, number) => {
        const item = state.source[type][id];
        // Render one RecordingListItem component for each one.
        return (
          <RecordingListItem key={item.id} item={item} number={number % 4} />
        );
      })}
    </Container>
  );
}

export default connect(RecordingListPage);

const Container = styled.section`
  width: 100%;
`;
