import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { EventEntity, ShowArchiveData, ShowData } from "../../data";
import { Packages } from "@frontity/wp-source/types";
import Loading from "../loading";
import { useEffect, useState } from "react";

const cutSec = function (time) {
  return time.substring(0, 5);
};

/**
 * The props of the {@link EventListItem} component.
 */
interface ItemProps {
  /**
   * The event that should be shown.
   */
  item: EventEntity;
}

/**
 * Event List item Component.
 * It renders the preview of an event.
 * @param props - Defined in {@link ItemProps}.
 * @returns The rendered event.
 */
function EventListItem({ item }: ItemProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();
  const [ready, setReady] = useState(false);  //tells if events are ready to be displayed

  /**
   * name of the event. We need to remove "(Live)/(Replay)" and add " - powtórka" if neccesary
   */
  const name =
    item.title.rendered.replace(" (Live)", "").replace(" (Replay)", "") +
    (item.acf.type.toString() === "live" ? "" : " - powtórka");

  /**
   * start and end time of the event without secs
   */
  const startTime = cutSec(item.acf.start_time);
  const endTime = cutSec(item.acf.end_time);

  /**
   * we need to load the show in order to link the event to the show page, not the event page
   */
  useEffect(() => {
    actions.source.fetch("/shows");
  }, []);
  const showsData = state.source.get("/shows") as ShowArchiveData;
  let showData;
  if(!ready && showsData.isReady)
  {
    showData = state.source["show"][item.acf.show] as ShowData;
    setReady(true);
  }

  return ready ? (
    <Container>
      <Link link={item.link}>
        <Title>
          {startTime} - {endTime} {name}
        </Title>
      </Link>
    </Container>
  ) : (
    <Container>
      <Link>
        <Title>
          {startTime} - {endTime} {name}
        </Title>
      </Link>
    </Container>
  );
}

// Connect the EventListItem to gain access to `state` as a prop
export default connect(EventListItem);

const Container = styled.div`
  &:nth-of-type(2n + 1) {
    background-color: rgba(60, 60, 76, 0.1);
  }
`;

const Title = styled.div`
  margin: 0;
  padding: 0;
  padding-left: 15px;
  color: #3c3c4c;

  &:hover {
    color: #6aba9c;
  }
`;
