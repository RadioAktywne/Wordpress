import { connect, useConnect } from "frontity";
import { Packages } from "../../../types";
import { EventArchiveData, EventEntity } from "../../data";
import EventDay from "./event-day";

//we need to check current day in order to show current data in events widget
const englishDays = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

interface ListProps {
  data: EventArchiveData;
}

function EventWidget({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const day = new Date().getDay();

  /**
   * choose just today's events
   */
  const eventsToday = data.items
    .map(({ type, id }) => state.source[type][id] as EventEntity)
    .filter((item) => item.acf.day == englishDays[day]);

  return <EventDay data={eventsToday} day={englishDays[day]} onHome={true} />;
}

export default connect(EventWidget);
