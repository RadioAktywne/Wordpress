import { connect, decode, styled, useConnect } from "frontity";
import EventListItem from "./event-list-item";
import Link from "../link";
import { Packages } from "../../../types";

let daysNames = {
    "monday": "Poniedziałek",
    "tuesday": "Wtorek",
    "wednesday": "Środa",
    "thursday": "Czwartek",
    "friday": "Piątek",
    "saturday": "Sobota",
    "sunday": "Niedziela",
}


function EventDay(props) {
  const { state } = useConnect<Packages>();

  let eventList = [];

  props.data.items.map(({ type, id }) => {
    const item = state.source[type][id];
    eventList.push(item);
  });

  eventList.sort(
    function(a, b) {
      return (
        parseInt(a.acf.start_time.substring(0, 2)) < parseInt(b.acf.start_time.substring(0, 2)) 
        || (
               parseInt(a.acf.start_time.substring(0, 2)) == parseInt(b.acf.start_time.substring(0, 2))
            && parseInt(a.acf.start_time.substring(3, 2)) < parseInt(b.acf.start_time.substring(3, 2))
           )
        ) ? -1 : 1;
    }
  );

  return (
    <Day>
        <div className={props.className}>
            {props.onHome ? <Link link="/events"><h2 className="">RAmówka na dziś</h2></Link> : <h2>{daysNames[props.day]}</h2>}
            {eventList.map(({ type, id }) => {
            const item = state.source[type][id];
            if(item.acf.day == props.day)
                return (
                    <EventListItem key={item.id} item={item} />
                );
            })}
        </div>
    </Day>
  );
}

export default connect(EventDay);

const Day = styled.div`
  width: 33.33%;

  & > div
  {
    padding: 0 15px 15px 0;
  }

  .right
  {
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
`