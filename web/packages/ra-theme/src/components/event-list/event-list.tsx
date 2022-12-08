import { connect, styled, useConnect } from "frontity";
import EventDay from "./event-day";
import { Packages } from "../../../types";
import { EventArchiveData, EventEntity } from "../../data";

/**
 * Props received by the {@link EventList} component.
 */
interface ListProps {
  data: EventArchiveData;
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
  const { state } = useConnect<Packages>();

  const eventsPerDay = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };

  data.items.map(({ type, id }) => {
    const item = state.source[type][id] as EventEntity;
    eventsPerDay[item.acf.day].push(item);
  });

  return (
    <Container>
      <Title>
        <h1>Ramówka</h1>
      </Title>

      <Days>
        <EventDay data={eventsPerDay.monday} onHome={false} day={"monday"} />
        <EventDay data={eventsPerDay.tuesday} onHome={false} day={"tuesday"} />
        <EventDay
          data={eventsPerDay.wednesday}
          onHome={false}
          day={"wednesday"}
        />
        <EventDay
          data={eventsPerDay.thursday}
          onHome={false}
          day={"thursday"}
        />
        <EventDay data={eventsPerDay.friday} onHome={false} day={"friday"} />
        <EventDay
          data={eventsPerDay.saturday}
          onHome={false}
          day={"saturday"}
        />
        <EventDay data={eventsPerDay.sunday} onHome={false} day={"sunday"} />
      </Days>
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
