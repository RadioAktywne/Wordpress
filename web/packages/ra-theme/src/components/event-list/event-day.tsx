import { connect, styled, useConnect } from "frontity";
import EventListItem from "./event-list-item";
import Link from "../link";
import { Packages } from "../../../types";
import { EventEntity } from "../../data";
import Loading from "../loading";
import useShows from "../../hooks/useShows";

/**
 * polish names of days
 */
const daysNames = {
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela",
};

/**
 * Does event a start before event b?
 * @param a - event a
 * @param b - event b
 * @returns boolean
 */
const isEarlier = function (a, b) {
  return parseInt(a.acf.start_time.substring(0, 2)) <
    parseInt(b.acf.start_time.substring(0, 2)) ||
    (parseInt(a.acf.start_time.substring(0, 2)) ==
      parseInt(b.acf.start_time.substring(0, 2)) &&
      parseInt(a.acf.start_time.substring(3, 2)) <
        parseInt(b.acf.start_time.substring(3, 2)))
    ? -1
    : 1;
};

interface ListProps {
  data: EventEntity[];
  onHome: boolean;
  day: string;
}

function EventDay({ data, onHome, day }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * fetch shows to have shows links, not only events links
   */
  const shows = useShows(data.map((item) => item.acf.show));

  if (shows.status !== "success")
    return (
      <Day>
        <Loading />
      </Day>
    );

  const sorted = [...data].sort(isEarlier);

  return (
    <Day>
      <div>
        {onHome ? (
          <Link link={state.configuration.posts.event.archivePath}>
            <h2 className="">RAmówka na dziś</h2>
          </Link>
        ) : (
          <h2>{daysNames[day]}</h2>
        )}
        {sorted.map((value, index) => {
          return <EventListItem item={value} key={index} />;
        })}
      </div>
    </Day>
  );
}

export default connect(EventDay);

const Day = styled.div`
  width: 33.33%;

  & > div {
    padding: 0 15px 15px 0;
  }

  &:nth-of-type(3n) > div {
    padding: 0 0 15px 0;
  }

  & > div > h2 {
    color: #3c3c4c;
    border-bottom: solid 2px #3c3c4c;
    font-weight: normal;
    padding-left: 15px;
    margin-top: 0;
  }

  & > div > a > h2 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: lighter;
  }

  & > div > a:hover > h2 {
    color: #fff;
    background-color: #6aba9c;
    border-bottom: solid 2px #3c3c4c;
  }

  @media (max-width: 750px) {
    width: 100%;

    & > div {
      padding: 0 0 20px 0;
    }
`;
