import { connect, decode, styled, useConnect } from "frontity";
import RecordingListItem from "./recording-list-item";
import Pagination from "./pagination";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import { useEffect } from "react";
import Loading from "../loading";

/**
 * Props received by the {@link RecordingListPage} component.
 */
interface ListPageProps {
  link: string;
  key: number;
}

function RecordingListPage({ link }: ListPageProps): JSX.Element {
  const { actions, state } = useConnect<Packages>();

  useEffect(() => {
    actions.source.fetch(link);
  }, []);

  const data = state.source.get(link);

  return data.isReady ? (
    <Container>
      {(data as RecordingArchiveData).items.map(({ type, id }) => {
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
