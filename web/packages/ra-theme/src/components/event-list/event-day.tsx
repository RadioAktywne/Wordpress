import { connect, styled, useConnect } from "frontity";
import EventListItem from "./event-list-item";
import Link from "../link";
import { Packages } from "../../../types";
import { EventEntity } from "../../data";
import Loading from "../loading";
import useShows from "../../hooks/useShows";
import { motion } from "framer-motion";

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

interface DayProps {
  isHome: boolean;
  isHovered: boolean;
}

function EventDay({ data, onHome, day }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * fetch shows to have shows links, not only events links
   */
  const shows = useShows(data.map((item) => item.acf.show));

  if (shows.status !== "success")
    return (
      <Day isHome={onHome} isHovered={state.home.hovered.events}>
        <Loading />
      </Day>
    );

  const sorted = [...data].sort(isEarlier);

  return (
    <Day isHome={onHome} isHovered={state.home.hovered.events}>
      <motion.div
        initial={onHome ? { x: 200, opacity: 0 } : { y: 20, opacity: 0 }}
        animate={onHome ? { x: 0, opacity: 1 } : { y: 0, opacity: 1 }}
        exit={onHome ? { x: 200, opacity: 0 } : {}}
        transition={{ ease: "easeOut", duration: 0.4 }}
      >
        {onHome ? (
          <div
            onMouseEnter={() => (state.home.hovered.events = true)}
            onMouseLeave={() => (state.home.hovered.events = false)}
            onClick={() => (state.home.hovered.events = false)}
          >
            <Link link={state.configuration.posts.event.archivePath}>
              <h2 className="">RAmówka na dziś</h2>
            </Link>
          </div>
        ) : (
          <h2>{daysNames[day]}</h2>
        )}
        {sorted.map((value, index) => {
          return <EventListItem item={value} key={index} />;
        })}
      </motion.div>
    </Day>
  );
}

export default connect(EventDay);

const Day = styled.div<DayProps>`
  width: 33.33%;
  ${({ isHome }) => isHome && "margin-bottom: 10px;"};
  
  & > div {
    margin: 0 15px 15px 0;
    ${({ isHome }) =>
      isHome &&
      "box-sizing: border-box;\
      opacity: 0;\
      border: solid 7px #30241A;\
      height: 100%;\
      box-shadow: 7px -6px 0px 0px #7190BC;\
      -webkit-box-shadow: 7px -6px 0px 0px #7190BC;\
      -moz-box-shadow: 7px -6px 0px 0px #7190BC;"};
    ${({ isHovered, isHome }) =>
      isHovered && isHome && "border: solid 7px #6aba9c;"};
  }

  @media (max-width: 900px) {
    & > div {
      ${({ isHome }) => isHome && "margin-right: 6px;"};
    }
  }

  @media (max-width: 750px) {
    & > div {
      ${({ isHome }) =>
        isHome &&
        "box-shadow: none;\
        -webkit-box-shadow: none;\
        -moz-box-shadow: none;"};
    }
  }

  &:nth-of-type(3n) > div {
    padding: 0 0 15px 0;
  }

  & > div > h2 {
    color: #30241A;
    font-weight: normal;
    padding-left: 15px;
    margin-top: 0;
    border-bottom: 2px solid rgba(48, 36, 26, 0.8);
  }

  & > div > div > a > h2 {
    color: #6aba9c;
    background-color: #30241A;
padding-top: 6px;
padding-bottom: 6px;
padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: lighter;
  }

  & > div > div > a:hover > h2 {
    color: #fff;
    background-color: #6aba9c;
  }

  @media (max-width: 750px) {
    width: 100%;

    & > div {
      margin: 0 0 20px 0;
    }
`;
