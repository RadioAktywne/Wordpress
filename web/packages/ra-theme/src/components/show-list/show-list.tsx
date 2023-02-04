import { connect, styled, useConnect } from "frontity";
import ShowListPage from "./show-list-page";
import { Packages } from "../../../types";
import { ShowArchiveData } from "../../data";
import React, { useEffect } from "react";

/**
 * Props received by the {@link ShowList} component.
 */
interface ListProps {
  data: ShowArchiveData;
  when?: boolean;
}

function ShowList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and shows list

  /**
   * viewing next pages
   */
  const nextPage = function () {
    //if there is a next page and show-list-page is ready and the next page is ready
    if (
      state.archives.shows.ready &&
      state.archives.shows.pages.length <
        state.archives.shows.pages[0].totalPages &&
      state.archives.shows.nextPage.isReady
    ) {
      state.archives.shows.ready = false; //tell state that the shows page starts to load now
      state.archives.shows.pages.push(state.archives.shows.nextPage); //add page to our list in state
    }
  };

  /**
   * when user nearly reaches the end, load next page
   */
  const tryNextPage = () => {
    if (
      contentRef.current != undefined &&
      contentRef.current.getBoundingClientRect().bottom - 20 <=
        window.innerHeight
    )
      nextPage();
  };

  useEffect(() => {
    /**
     * load first page if it wasnt loaded yet
     */
    if (state.archives.shows.pages.length == 0)
      state.archives.shows.pages.push(data);

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
   * load next page if shows dont take all space on screen
   * (and before that, check if the current shows page is loaded already)
   */
  if (
    state.archives.shows.ready &&
    state.archives.shows.nextPage != undefined &&
    state.archives.shows.nextPage.isReady
  ) {
    tryNextPage();
  }

  return (
    <Container>
      <div ref={contentRef}>
        <Title>
          <h1>Audycje</h1>
        </Title>

        {state.archives.shows.pages.map((item, i) => (
          <ShowListPage data={item} key={i} />
        ))}
      </div>
    </Container>
  );
}

export default connect(ShowList);

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
