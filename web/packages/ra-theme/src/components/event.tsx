import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import { EventData, EventEntity } from "../data";

/**
 * Properties received by the `Event` component.
 */
interface EventProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: EventData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Event component that is used to render events
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Event when={data.isEvent} />
 * </Switch>
 * ```
 *
 * @returns The {@link Event} element rendered.
 */
function Event({ data }: EventProps): JSX.Element {
  const { state } = useConnect<Packages>();
  // Get the data of the event.
  const event: EventEntity = state.source[data.type][data.id];

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <div>
        <Title>{event.acf.show} {event.acf.type}</Title>
        {event.acf.day}, {event.acf.start_time} - {event.acf.end_time}
      </div>
    </Container>
  ) : null;
}

export default connect(Event);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 24px 0 8px;
  color: rgba(12, 17, 43);
`;
