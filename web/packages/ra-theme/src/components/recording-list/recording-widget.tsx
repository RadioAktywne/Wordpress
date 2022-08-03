import { connect, decode, styled, useConnect } from "frontity";
import { useEffect } from "react";
import { Packages } from "../../../types";
import Loading from "../loading";
import Link from "../link";
import RecordingListItem from "./recording-list-item";

const RecordingWidget = () => {
  const { actions, state } = useConnect<Packages>();

  useEffect(() => {
    actions.source.fetch("/recordings");
  }, []);

  const dataPost = state.source.get("/recordings");

  return dataPost.isReady ? (
    <Container>
      <div>
        <Title>
          <Link link="/recordings">
            <h1>Nagrania</h1>
          </Link>
        </Title>

        {dataPost.items.map(({ type, id }) => {
          const item = state.source[type][id];
          // Render one RecordingListItem component for each one.
          return <RecordingListItem key={item.id} item={item} />;
        })}
      </div>
    </Container>
  ) : (
    <Container>
      <Loading />
    </Container>
  );
};

export default connect(RecordingWidget);

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-right: 20px;

  & > div {
    width: 66.66%;
  }

  @media (max-width: 750px) {
    padding-right: 0px;

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
