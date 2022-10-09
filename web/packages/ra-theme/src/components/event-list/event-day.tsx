import { connect, decode, styled, useConnect } from "frontity";
import EventListItem from "./event-list-item";
import Link from "../link";
import { Packages } from "../../../types";
import { useEffect } from "react";
import { EventArchiveData, EventData, EventEntity, ShowArchiveData } from "../../data";
import Loading from "../loading";

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
  const { state, actions } = useConnect<Packages>();

  /**
   * fetch shows to have shows links, not only events links
   */
  useEffect(() => {
    actions.source.fetch("/shows");
  }, []);
  const showsData = state.source.get("/shows") as ShowArchiveData;

  /**
   * sort events if there are more than 2
   */
  if (data.length > 1) data.sort(isEarlier);

  return showsData.isReady ? (
    <Day>
      <div>
        {onHome ? (
          <Link link="/events">
            <h2 className="">RAmówka na dziś</h2>
          </Link>
        ) : (
          <h2>{daysNames[day]}</h2>
        )}
        {data.map((value, index) => {
          return <EventListItem item={value} key={index} showsData={showsData}/>
        })}
      </div>
    </Day>
  ) : <Day><Loading/></Day>;
}

export default connect(EventDay);

const Day = styled.div`
  width: 33.33%;

  & > div
  {
    padding: 0 15px 15px 0;
  }

  &:nth-of-type(3n) > div {
    padding: 0 0 15px 0; 
  }

  & > div > h2
  {
    color: #3c3c4c;
    border-bottom: solid 2px #3c3c4c;
    font-weight: normal;
    padding-left: 15px;
    margin-top: 0;
  }

  & > div > a > h2
  {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: lighter;
  }

  & > div > a:hover > h2
  {
    color: #fff;
    background-color: #6aba9c;
    border-bottom: solid 2px #3c3c4c;
  }

  @media (max-width: 750px)
  {
    width: 100%;

    & > div
    {
      padding: 0 0 20px 0;
    }
`;
