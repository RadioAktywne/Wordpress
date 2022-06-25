import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import React from "react";
import useMedia from "../hooks/useMedia";
import Loading from "./loading";

/**
 * Props of the {@link FeaturedAudio} component.
 */
interface FeaturedAudioProps {
  /**
   * ID of the attachment entity.
   */
  id: number;
}

/**
 * Props of the {@link Container} component.
 */
interface ContainerProps {
  /**
   * Flag indicating if the component is rendered in AMP mode.
   */
  isAmp: boolean;
}

/**
 * The Component that renders a featured audio.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured audio.
 *
 * @returns A react component.
 */
function FeaturedAudio({ id }: FeaturedAudioProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const {
    status,
    value: [media],
  } = useMedia([id]);

  if (status === "pending") return <Loading />;
  if (!media) return null;

  return (
    <Container isAmp={state.frontity.mode === "amp"}>
      {`${media.title.rendered} (${media.source_url})`}
    </Container>
  );
}

export default connect(FeaturedAudio);

const Container = styled.div<ContainerProps>`
  margin-top: 16px;
  height: 50px;
  ${({ isAmp }) => isAmp && "position: relative;"};
`;
