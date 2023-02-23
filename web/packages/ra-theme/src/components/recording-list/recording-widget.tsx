import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import Loading from "../loading";
import Link from "../link";
import RecordingListItem from "./recording-list-item";
import { ArchiveData } from "@frontity/source/types";

export type RecordingWidgetProps = {
  length?: number;
};

interface ContainerProps {
  isHovered: boolean;
}

const RecordingWidget = ({ length = 6 }) => {
  const { actions, state } = useConnect<Packages>();

  /**
   * fetch recordings
   */
  useEffect(() => {
    actions.source.fetch(state.configuration.posts.recording.archivePath);
  }, []);

  const dataPost = state.source.get(
    state.configuration.posts.recording.archivePath
  ) as ArchiveData;

  if (!dataPost.isReady)
    return (
      <Container isHovered={state.home.hovered.recordings}>
        <Loading />
      </Container>
    );

  /**
   * when recordings are fetched
   */
  return (
    <Container isHovered={state.home.hovered.recordings}>
      <div>
        <Title
          onMouseEnter={() => (state.home.hovered.recordings = true)}
          onMouseLeave={() => (state.home.hovered.recordings = false)}
          onClick={() => (state.home.hovered.recordings = false)}
        >
          <Link link={state.configuration.posts.recording.archivePath}>
            <h1>Nagrania</h1>
          </Link>
        </Title>

        <div>
          {dataPost.items.slice(0, length).map(({ type, id }) => {
            const item = state.source[type][id];
            return <RecordingListItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export default connect(RecordingWidget);

const Container = styled.section<ContainerProps>`
  width: 66.66%;
  padding: 0;
  margin: 0;

  & > div {
    margin-right: 15px;
    border: solid 7px #30241a;
    ${({ isHovered }) => isHovered && "border: solid 7px #6aba9c;"}
    box-sizing: border-box;

    box-shadow: 7px -6px 0px 0px #fff55a;
    -webkit-box-shadow: 7px -6px 0px 0px #fff55a;
    -moz-box-shadow: 7px -6px 0px 0px #fff55a;
  }

  @media (max-width: 750px) {
    padding-right: 0px;
    width: 100%;

    & > div {
      padding: 0;
      width: 100%;

      box-shadow: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      margin-top: 6px;
    }
  }
`;

const Title = styled.div`
  & > a > h1 {
    color: #6aba9c;
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
    cursor: pointer;
  }

  & > a:hover > h1 {
    color: #fff;
    background-color: #6aba9c;
  }
`;
