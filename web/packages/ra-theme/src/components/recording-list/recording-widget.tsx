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
      <Container>
        <Loading />
      </Container>
    );

  /**
   * when recordings are fetched
   */
  return (
    <Container>
      <div>
        <Title>
          <Link link={state.configuration.posts.recording.archivePath}>
            <h1>Nagrania</h1>
          </Link>
        </Title>

        {dataPost.items.slice(0, length).map(({ type, id }) => {
          const item = state.source[type][id];
          return <RecordingListItem key={item.id} item={item} />;
        })}
      </div>
    </Container>
  );
};

export default connect(RecordingWidget);

const Container = styled.section`
  width: 66.66%;
  padding: 0;
  margin: 0;

  & > div {
    padding-right: 15px;
  }

  @media (max-width: 750px) {
    padding-right: 0px;
    width: 100%;

    & > div {
      padding: 0;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  & > a > h1 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
    cursor: pointer;
  }

  & > a:hover > h1 {
    color: #fff;
    background-color: #6aba9c;
    border-bottom: solid 2px #3c3c4c;
  }
`;
