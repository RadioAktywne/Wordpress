import { connect, decode, styled, useConnect } from "frontity";
import AlbumListPage from "./album-list-page";
import { Packages } from "../../../types";
import { AlbumArchiveData } from "../../data";
import React, { useEffect } from "react";

/**
 * Props received by the {@link AlbumList} component.
 */
interface ListProps {
  data: AlbumArchiveData;
  when?: boolean;
}

function AlbumList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and albums list

  /**
   * viewing next pages
   */
  const nextPage = function () {
    //if there is a next page and album-list-page is ready and the next page is ready
    if (
      state.albums.ready &&
      state.albums.nextPage != undefined &&
      state.albums.nextPage.isReady
    ) {
      state.albums.ready = false; //tell state that the albums page starts to load now
      state.albums.pages.push(state.albums.nextPage); //add page to our list in state
    }
  };

  /**
   * when user nearly reaches the end, load next page
   */
  const tryNextPage = () => {
    if (
      contentRef.current.getBoundingClientRect().bottom - 20 <=
      window.innerHeight
    )
      nextPage();
  };

  useEffect(() => {
    /**
     * load first page if it wasnt loaded yet
     */
    if (state.albums.pages.length == 0) state.albums.pages.push(data);

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
   * load next page if albums dont take all space on screen
   * (and before that, check if the current albums page is loaded already)
   */
  if (
    state.albums.ready &&
    state.albums.nextPage != undefined &&
    state.albums.nextPage.isReady
  ) {
    tryNextPage();
  }

  return (
    <Container>
      <div ref={contentRef}>
        <Title>
          <h1>Płyta Tygodnia</h1>
        </Title>

        {state.albums.pages.map((item, i) => (
          <AlbumListPage data={item} key={i} />
        ))}
      </div>
    </Container>
  );
}

export default connect(AlbumList);

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
