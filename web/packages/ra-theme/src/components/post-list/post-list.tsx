import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import React, { useEffect } from "react";
import { ArchiveData } from "@frontity/source/types";
import PostListPage from "./post-list-page";

/**
 * Props received by the {@link PostList} component.
 */
interface ListProps {
  data: ArchiveData;
  when?: boolean;
}

function PostList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and posts list

  /**
   * viewing next pages
   */
  const nextPage = function () {
    //if there is a next page and album-list-page is ready and the next page is ready
    if (
      state.archives.posts.ready &&
      state.archives.posts.pages.length <
        state.archives.posts.pages[0].totalPages &&
      state.archives.posts.nextPage.isReady
    ) {
      state.archives.posts.ready = false; //tell state that the posts page starts to load now
      state.archives.posts.pages.push(state.archives.posts.nextPage); //add page to our list in state
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
    if (state.archives.posts.pages.length == 0)
      state.archives.posts.pages.push(data);

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
   * load next page if posts dont take all space on screen
   * (and before that, check if the current posts page is loaded already)
   */
  if (
    state.archives.posts.ready &&
    state.archives.posts.nextPage != undefined &&
    state.archives.posts.nextPage.isReady
  ) {
    tryNextPage();
  }

  return (
    <Container>
      <div ref={contentRef}>
        <Title>
          <h1>Publicystyka</h1>
        </Title>

        {state.archives.posts.pages.map((item, i) => (
          <PostListPage data={item} key={i} />
        ))}
      </div>
    </Container>
  );
}

export default connect(PostList);

const Container = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;

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
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }

  margin-top: 20px;
`;
