import { connect, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import Loading from "../loading";
import Link from "../link";
import { AlbumArchiveData } from "../../data";
import AlbumListItem from "./album-list-item";

const RecordingWidget = () => {
  const { actions, state } = useConnect<Packages>();

  /**
   * fetch recordings
   */
  useEffect(() => {
    actions.source.fetch(state.configuration.posts.album.archivePath);
  }, []);

  const dataPost = state.source.get(
    state.configuration.posts.album.archivePath
  ) as AlbumArchiveData;

  if (!dataPost.isReady) {
    return <Loading />;
  }

  if (dataPost.items.length === 0) {
    return null;
  }

  /**
   * when albums are fetched
   */
  return (
    <Container>
      <div>
        <Title>
          <Link link={state.configuration.posts.album.archivePath}>
            <h1>Płyta Tygodnia</h1>
          </Link>
        </Title>
        <AlbumListItem
          item={state.source[dataPost.items[0].type][dataPost.items[0].id]}
        />
      </div>
    </Container>
  );
};

export default connect(RecordingWidget);

const Container = styled.section`
  width: 33.33%;
  padding: 0;
  margin: 0;

  & > div {
    margin-right: 15px;
  }

  & > div > h1 {
    margin: 0;
  }

  @media (max-width: 750px) {
    padding-right: 0px;
    width: 100%;
    padding-top: 20px !important;

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
