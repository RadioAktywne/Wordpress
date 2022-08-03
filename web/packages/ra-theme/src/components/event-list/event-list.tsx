import { connect, decode, styled, useConnect } from "frontity";
import EventDay from "./event-day";
import { Packages } from "../../../types";
import { EventArchiveData } from "../../data";

/**
 * Props received by the {@link EventList} component.
 */
interface ListProps {
  /**
   * Data object representing an archive link.
   */
  data: EventArchiveData;

  /**
   * Flag used by Frontity's {@link Switch} component to decide whether
   * this component should be rendered.
   */
  when?: boolean;
}

/**
 * Component that renders the list of events,
 * passed as an {@link EventArchiveData} object.
 *
 * @param props - Object of type {@link ListProps}.
 * @returns React component.
 */
function EventList({ data }: ListProps): JSX.Element {
  return (
    <Container>
      <div>
        <Title>
          <h1>Ramówka</h1>
        </Title>

        <Days>
          <EventDay data={data} day="monday" className="" onHome={false} />
          <EventDay data={data} day="tuesday" className="" onHome={false} />
          <EventDay
            data={data}
            day="wednesday"
            className="right"
            onHome={false}
          />
          <EventDay data={data} day="thursday" className="" onHome={false} />
          <EventDay data={data} day="friday" className="" onHome={false} />
          <EventDay
            data={data}
            day="saturday"
            className="right"
            onHome={false}
          />
          <EventDay data={data} day="sunday" className="" onHome={false} />
        </Days>
      </div>
    </Container>
  );
}

export default connect(EventList);

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0 0 0;
  margin-left: auto;
  margin-right: auto;

  & > div {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media (max-width: 750px) {
    & > div {
      padding: 0;
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
    margin-bottom: 15px;
    font-weight: lighter;
  }
`;

const Days = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
