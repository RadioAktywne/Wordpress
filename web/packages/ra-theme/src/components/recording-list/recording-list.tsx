import { connect, decode, styled, useConnect } from "frontity";
import RecordingListItem from "./recording-list-item";
import Pagination from "./pagination";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";

/**
 * Props received by the {@link RecordingList} component.
 */
interface ListProps {
  data: RecordingArchiveData;
  when?: boolean;
}

function RecordingList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  return (
    <Container>
      <div>
        <Title>
          <h1>Nagrania</h1>
        </Title>

        {data.items.map(({ type, id }) => {
          const item = state.source[type][id];
          // Render one RecordingListItem component for each one.
          return <RecordingListItem key={item.id} item={item} />;
        })}
      </div>
    </Container>
  );
}

export default connect(RecordingList);

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0 0 0;
  margin-left: auto;
  margin-right: auto;

  & > div {
    padding-right: 30px;
    padding-left: 30px;
    width: 66.66%;
    max-width: 755px;
  }

  @media (max-width: 750px) {
    & > div {
      padding: 0;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  & > h1 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }
`;
