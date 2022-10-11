import { connect, useConnect } from "frontity";
import { Packages } from "../../types";
import { EventArchiveData, EventEntity } from "../data";
import Loading from "./loading";
import Link from "./link";
import { useEffect } from "react";

/**
 * Properties received by the `ShowEvents` component.
 */
interface ShowEventsProps {
  live: boolean;
  showId: number;
}

/**
 * remove seconds from time notation
 */
const cutSec = function (time) {
  return time.substring(0, 5);
};

/**
 * The Show Events component that is used to render show occurrences (events)
 * @returns The {@link ShowEvents} element rendered.
 */
function ShowEvents({ live, showId }: ShowEventsProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();

  /**
   * get list of events
   */
  useEffect(() => {
    actions.source.fetch("/events");
  }, []);
  const eventsData = state.source.get("/events") as EventArchiveData;

  /**
   * check if and what time event happens for each day
   */
  let isDay = {
    monday: undefined,
    tuesday: undefined,
    wednesday: undefined,
    thursday: undefined,
    friday: undefined,
    saturday: undefined,
    sunday: undefined,
  };
  if (eventsData.isReady) {
    eventsData.items.map(({ type, id }) => {
      const item = state.source[type][id] as EventEntity;
      if (
        item.acf.show == showId &&
        (live == true ? item.acf.type == "live" : item.acf.type == "replay")
      )
        isDay[item.acf.day] =
          cutSec(item.acf.start_time) + " do " + cutSec(item.acf.end_time);
    });
  }

  // Load events, but only if the data is ready.
  return eventsData.isReady ? (
    <>
      {isDay.monday != undefined ? (
        <div>
          <span>Poniedziałki, od {isDay.monday}</span>
        </div>
      ) : null}
      {isDay.tuesday != undefined ? (
        <div>
          <span>Wtorki, od {isDay.tuesday}</span>
        </div>
      ) : null}
      {isDay.wednesday != undefined ? (
        <div>
          <span>Środy, od {isDay.wednesday}</span>
        </div>
      ) : null}
      {isDay.thursday != undefined ? (
        <div>
          <span>Czwartki, od {isDay.thursday}</span>
        </div>
      ) : null}
      {isDay.friday != undefined ? (
        <div>
          <span>Piątki, od {isDay.friday}</span>
        </div>
      ) : null}
      {isDay.saturday != undefined ? (
        <div>
          <span>Soboty, od {isDay.saturday}</span>
        </div>
      ) : null}
      {isDay.sunday != undefined ? (
        <div>
          <span>Niedziele, od {isDay.sunday}</span>
        </div>
      ) : null}
    </>
  ) : (
    <Loading />
  );
}

export default connect(ShowEvents);
