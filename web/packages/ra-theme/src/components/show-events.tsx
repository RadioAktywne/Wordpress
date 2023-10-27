import { connect, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../types";
import { EventArchiveData, EventEntity } from "../data";
import Loading from "./loading";

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
const cutSec = (time: string) => {
  return time.substring(0, 5);
};

/**
 * The Show Events component that is used to render show occurrences (events)
 * @returns The {@link ShowEvents} element rendered.
 */
function ShowEvents({ live, showId }: ShowEventsProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();

  const eventsData = state.source.get(
    state.config.posts.event.archivePath,
  ) as EventArchiveData;

  /**
   * get list of events
   */
  useEffect(() => {
    actions.source.fetch(state.config.posts.event.archivePath);
  }, []);

  const isDay = eventsData.items.reduce(
    (acc, { type, id }) => {
      const item = state.source[type][id] as EventEntity;
      if (
        item.acf.show == showId &&
        (live == true ? item.acf.type == "live" : item.acf.type == "replay")
      )
        acc[item.acf.day] =
          cutSec(item.acf.start_time) + " do " + cutSec(item.acf.end_time);
      return acc;
    },
    {} as Record<string, string>,
  );

  // Load events, but only if the data is ready.
  return eventsData.isReady ? (
    <>
      {isDay.monday && (
        <div>
          <span>Poniedziałki, od {isDay.monday}</span>
        </div>
      )}
      {isDay.tuesday && (
        <div>
          <span>Wtorki, od {isDay.tuesday}</span>
        </div>
      )}
      {isDay.wednesday && (
        <div>
          <span>Środy, od {isDay.wednesday}</span>
        </div>
      )}
      {isDay.thursday && (
        <div>
          <span>Czwartki, od {isDay.thursday}</span>
        </div>
      )}
      {isDay.friday && (
        <div>
          <span>Piątki, od {isDay.friday}</span>
        </div>
      )}
      {isDay.saturday && (
        <div>
          <span>Soboty, od {isDay.saturday}</span>
        </div>
      )}
      {isDay.sunday && (
        <div>
          <span>Niedziele, od {isDay.sunday}</span>
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
}

export default connect(ShowEvents);
