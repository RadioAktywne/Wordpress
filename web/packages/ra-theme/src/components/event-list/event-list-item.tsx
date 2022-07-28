import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { EventEntity } from "../../data";

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
 *
 * It renders the preview of an event.
 *
 * @param props - Defined in {@link ItemProps}.
 *
 * @returns The rendered event.
 */
function EventListItem({ item }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();
  console.log(item);
  const name = item.title.rendered + ((item.acf.type.toString() === "live") ? "" : " - powtórka");
  const startTime = item.acf.start_time.substring(0, 5);
  const endTime = item.acf.end_time.substring(0, 5);

  return (
    <Container>
      <Link link={item.link}>
        <Title>{startTime} - {endTime} {name}</Title>
      </Link>
    </Container>
  );
}

// Connect the EventListItem to gain access to `state` as a prop
export default connect(EventListItem);

const Container = styled.div`
  &:nth-of-type(2n+1) {
    background-color: rgba(60, 60, 76, 0.1);
  }
`

const Title = styled.div`
  margin: 0;
  padding: 0;
  padding-left: 15px;
  color: #3c3c4c;

  &:hover
  {
    color: #6ABA9C;
  }
`;