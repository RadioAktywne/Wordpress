import { ErrorData } from "@frontity/source/types";
import { styled } from "frontity";

/**
 * The props of the {@link PageError} component.
 */
interface PageErrorProps {
  /**
   * The data stored in the state for this URL.
   */
  data: ErrorData;

  /**
   * Whether to render this component. Used by the `<Switch>` component.
   */
  when?: boolean;
}

const description404 = (
  <>
    Nie mamy takiej strony{" "}
    <span role="img" aria-label="confused face">
      😕
    </span>
  </>
);

const description = (
  <>
    Jest problem, ale nie&apos;panikuj! Jeśli nie rozwiąże się,
    <a href="https://community.frontity.org"> daj nam znać </a> lub odśwież
    swoją przeglądarkę.
  </>
);

/**
 * The Error page component. It shows either a 404 page if the error is a 404
 * or a generic error if it's a different one.
 *
 * @param props - The props, defined in {@link PageErrorProps}.
 * @returns The error screen.
 */
export default function PageError({ data }: PageErrorProps): JSX.Element {
  const title = "Ojej! Coś poszło nie tak";
  const title404 = "Ojej! 404";

  return (
    <Container>
      <Title>{data.is404 ? title404 : title}</Title>
      <Description>{data.is404 ? description404 : description}</Description>
    </Container>
  );
}

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 24px 0 8px;
  color: rgba(12, 17, 43);
  font-size: 4em;
`;

const Description = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
  margin: 24px 0;
`;
