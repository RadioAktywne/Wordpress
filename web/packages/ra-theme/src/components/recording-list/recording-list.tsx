import { connect, decode, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import RecordingListPage from "./recording-list-page";
import { useEffect, useState } from "react";
import React from "react";

/**
 * Props received by the {@link RecordingList} component.
 */
interface ListProps {
  data: RecordingArchiveData;
  when?: boolean;
}

function RecordingList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();

  /**
   * viewing next pages, starting from the current one (which is in data)
   */
  //this function is triggered when users nearly reaches the end
  function nextPage() {
    //if there is a next page
    if (state.recordings.currentPage.next) {
      state.recordings.currentPage = state.source.get(state.recordings.currentPage.next) as RecordingArchiveData; //and set current page to it
      state.recordings.pages.push(state.recordings.currentPage.link); //add it to our list in state
    }
  }

  /**
   * listening to scroll events (to load next page when users scrolls to the end)
   */
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and recordings list
  const tryNextPage = () => {
    if (contentRef.current.getBoundingClientRect().bottom - 20 <= window.innerHeight)
      nextPage();
  };
  
  useEffect(() => {
    window.addEventListener("scroll", tryNextPage, { passive: true });
    window.addEventListener("resize", tryNextPage, { passive: true });
    
    //load some pages at the beginning - the list might be shorter than the screen length
    // const pagesOnStart = Math.floor(
    //   (window.innerHeight - contentRef.current.getBoundingClientRect().top) /
    //     contentRef.current.clientHeight
    // );
    // for (let i = 0; i < pagesOnStart; i++) tryNextPage(); 

    return () => {
      window.removeEventListener("scroll", tryNextPage);
      window.removeEventListener("resize", tryNextPage);
  };
  }, []);

  return (
    <Container>
      <div ref={contentRef} onClick={nextPage}>
        <Title>
          <h1>Nagrania</h1>
        </Title>

        <RecordingListPage link={data.link} key={0} />

        {state.recordings.pages.map((item, i) => (
          <RecordingListPage link={item} key={i+1} />
        ))}
      </div>
    </Container>
  );
}

export default connect(RecordingList);

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 20px 0 0 0;
  margin-left: auto;
  margin-right: auto;

  & > div {
    padding-right: 30px;
    padding-left: 30px;
    width: 66.66%;
    max-width: 755px;
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
