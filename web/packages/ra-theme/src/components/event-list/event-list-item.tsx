import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { EventEntity } from "../../data";
import { replacePath } from "../../lib/utils";
import { Packages } from "../../../types";
import parse from "html-react-parser";

const cutSec = function (time) {
  return time.substring(0, 5);
};

/**
 * The props of the {@link EventListItem} component.
 */
interface ItemProps {
  item: EventEntity;
}

/**
 * Event List item Component.
 * It renders the preview of an event.
 * @param props - Defined in {@link ItemProps}.
 * @returns The rendered event.
 */
function EventListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * name of the event. We need to remove "(Live)/(Replay)" and add " - powtórka" if neccesary
   */
  const name =
    parse(item.title.rendered.replace(" (Live)", "").replace(" (Replay)", "") +
    (item.acf.type === "live" ? "" : " - powtórka"));

  /**
   * remove secs from start and end time of the event
   */
  const startTime = cutSec(item.acf.start_time);
  const endTime = cutSec(item.acf.end_time);

  const show = state.source["show"][item.acf.show];

  const showLink = replacePath(show.link, state.configuration);

  return (
    <Container>
      <Link link={showLink}>
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
