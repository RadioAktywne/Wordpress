import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-image";
import { RecordingData, RecordingEntity } from "../data";
import FeaturedAudio from "./featured-audio";

/**
 * Properties received by the `Recording` component.
 */
interface RecordingProps {
  data: RecordingData;
  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Recording component that is used to render recordings
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Recording} element rendered.
 */
function Recording({ data }: RecordingProps): JSX.Element {
  const { state, libraries } = useConnect<Packages>();
  const recording: RecordingEntity = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <Title>{recording.acf.title}</Title>

      {recording.acf.file && <FeaturedAudio id={recording.acf.file} />}

      {recording.acf.image && <FeaturedMedia id={recording.acf.image} />}

      {recording.acf.description}
    </Container>
  ) : null;
}

export default connect(Recording);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 24px 0 8px;
  color: rgba(12, 17, 43);
`;
