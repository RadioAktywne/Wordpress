import { connect, decode, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import RecordingListPage from "./recording-list-page";
import { useEffect } from "react";
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
   * viewing next pages
   */
  const nextPage = function() {
    //if there is a next page and recording-list-page is ready and the next page is ready
    if (state.recordings.ready && state.recordings.nextPage != undefined && state.recordings.nextPage.isReady) {
      state.recordings.ready = false; //tell state that the recordings page starts to load now
      state.recordings.pages.push(state.recordings.nextPage.link); //add page to our list in state
    } 
  }

  /**
   * when user nearly reaches the end, load next page
   */
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and recordings list
  const tryNextPage = () => {
    if (contentRef.current.getBoundingClientRect().bottom - 20 <= window.innerHeight)
      nextPage();
  };

  useEffect(() => {
    /**
     * load first page if it wasnt loaded yet
     */
    if(state.recordings.pages.length == 0)
      state.recordings.pages.push(data.link);

    /**
     * listening to scroll events (to load next page when users scrolls to the end)
     */
    window.addEventListener("scroll", tryNextPage, { passive: true });
    window.addEventListener("resize", tryNextPage, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", tryNextPage);
      window.removeEventListener("resize", tryNextPage);
  };
  }, []);

  /**
   * load next page if recordings dont take all space on screen
   * (and before that, check if the current recordings page is loaded already)
   */
  if(state.recordings.ready && state.recordings.nextPage != undefined && state.recordings.nextPage.isReady) 
  {
    tryNextPage();
  }

  return (
    <Container>
      <div ref={contentRef} onClick={tryNextPage}>
        <Title>
          <h1>Nagrania</h1>
        </Title>

        {state.recordings.pages.map((item, i) => (
          <RecordingListPage link={item} key={i} />
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
