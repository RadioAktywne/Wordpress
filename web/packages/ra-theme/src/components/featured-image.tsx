import Image from "@frontity/components/image";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import React from "react";
import useMedia from "../hooks/useMedia";
import Loading from "./loading";

/**
 * Props of the {@link FeaturedImage} component.
 */
interface FeaturedImageProps {
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
 * The Component that renders a featured image.
 *
 * @param props - The state injected by {@link connect } and the ID of the
 * featured image.
 *
 * @returns A react component.
 */
function FeaturedImage({ id }: FeaturedImageProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const {
    status,
    value: [media],
  } = useMedia([id]);

  if (status === "pending") return <Loading />;
  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item) => [item.source_url, item.width])
      // Reduce them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container isAmp={state.frontity.mode === "amp"}>
      <StyledImage
        alt={media.title.rendered}
        src={media.source_url}
        srcSet={srcset}
        width={media?.media_details?.width}
        height={media?.media_details?.height}
      />
    </Container>
  );
}

export default connect(FeaturedImage);

const Container = styled.div<ContainerProps>`
  ${({ isAmp }) => isAmp && "position: relative;"};
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  display: block;
  object-fit: cover;
  max-height: 100%;
  max-width: 100%;
`;
