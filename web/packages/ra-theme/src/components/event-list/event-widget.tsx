import { connect, decode, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import Loading from "../loading";
import EventDay from "./event-day";

//we need to check current day in order to show current data in events widget
const englishDays = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  7: "sunday",
};
const day = new Date().getDay();

const EventWidget = () => {
  const { actions, state } = useConnect<Packages>();

  useEffect(() => {
    actions.source.fetch("/events");
  }, []);

  const dataPost = state.source.get("/events");

  return dataPost.isReady ? (
    <EventDay
      data={dataPost}
      day={englishDays[day]}
      className=""
      onHome={true}
    />
  ) : (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  );
};

export default connect(EventWidget);

const LoadingContainer = styled.div`
  @media (max-width: 750px) {
    width: 100%;
    margin-right: 45px;
    padding: 0;
  }

  width: 33.33%;
`;
