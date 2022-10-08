import { connect, decode, styled, useConnect } from "frontity";
import AlbumListItem from "./album-list-item";
import { Packages } from "../../../types";
import { AlbumArchiveData } from "../../data";
import React from "react";

/**
 * Props received by the {@link AlbumList} component.
 */
interface ListProps {
  data: AlbumArchiveData;
  when?: boolean;
}

function AlbumList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and recordings list

  return (
    <Container>
      <div ref={contentRef}>
        <Title>
          <h1>Płyta Tygodnia</h1>
        </Title>

        <Czteropak>
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            return <AlbumListItem key={item.id} item={item} />;
          })}
        </Czteropak>
        
      </div>
    </Container>
  );
}

export default connect(AlbumList);

const Czteropak = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;

  column-gap: 15px;

  @media (max-width: 750px) {
    column-gap: 0;
    flex-direction: column;
  }
  `

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0 0 0;
  margin-left: auto;
  margin-right: auto;

  & > div {
    padding-right: 30px;
    padding-left: 30px;
  }

  @media (max-width: 750px) {
    & > div {
      padding: 0;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  & > h1 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }
`;