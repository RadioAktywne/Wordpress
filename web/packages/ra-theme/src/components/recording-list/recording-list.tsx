import { connect, decode, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import RecordingListPage from "./recording-list-page"
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
  let page = data;
  const [pages, setPages] = useState([page.link]); 
  function nextPage() {   //this function is triggered when users nearly reaches the end
    if(page.next) //if there is a next page
    {
      setPages([...pages, page.next]);  //add it to our list in state
      page = state.source.get(page.next) as RecordingArchiveData; //and set current page to it
    }
  } 

  /**
   * listening to scroll events (to load next page when users scrolls to the end)
   */
  const contentRef = React.useRef<HTMLDivElement>(null);  //reference to the div containing title and recordings list
  const handleScroll = () => {
    if(contentRef.current.getBoundingClientRect().bottom - 40 <= window.innerHeight)
      nextPage();
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    const pagesOnStart = Math.floor((window.innerHeight - contentRef.current.getBoundingClientRect().top) / contentRef.current.clientHeight);
    for(let i = 0; i < pagesOnStart; i++)
      handleScroll(); //do it at the beginning - the list might be shorter than the screen length

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  return (
    <Container>
      <div ref={contentRef}>
        <Title>
          <h1>Nagrania</h1>
        </Title>

        {pages.map((item, i) => ( <RecordingListPage link={item} key={i}/> ))} 
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
