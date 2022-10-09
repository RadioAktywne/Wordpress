import { connect, decode, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import { EventArchiveData, EventEntity } from "../../data";
import Loading from "../loading";
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
const day = new Date().getDay();

interface ListProps {
  data: EventArchiveData;
}

function EventWidget({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  let eventsToday = [];

  /**
   * choose just today's events
   */
   data.items.map(({ type, id }) => {
    const item = state.source[type][id] as EventEntity;
    if(item.acf.day == englishDays[day])
      eventsToday.push(item);
  });

  return (
    <EventDay
      data={eventsToday}
      day={englishDays[day]}
      onHome={true}
    />
  );
};

export default connect(EventWidget);