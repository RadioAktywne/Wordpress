import { connect, styled, useConnect } from "frontity";
import MemberListPage from "./member-list-page";
import { Packages } from "../../../types";
import { MemberArchiveData } from "../../data";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Props received by the {@link MemberList} component.
 */
interface ListProps {
  data: MemberArchiveData;
  when?: boolean;
}

function MemberList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and members list

  /**
   * viewing next pages
   */
  const nextPage = function () {
    //if there is a next page and member-list-page is ready and the next page is ready
    if (
      state.archives.members.ready &&
      state.archives.members.pages.length <
        state.archives.members.pages[0].totalPages &&
      state.archives.members.nextPage.isReady
    ) {
      state.archives.members.ready = false; //tell state that the members page starts to load now
      state.archives.members.pages.push(state.archives.members.nextPage); //add page to our list in state
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
    if (state.archives.members.pages.length == 0)
      state.archives.members.pages.push(data);

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
   * load next page if members dont take all space on screen
   * (and before that, check if the current members page is loaded already)
   */
  if (
    state.archives.members.ready &&
    state.archives.members.nextPage != undefined &&
    state.archives.members.nextPage.isReady
  ) {
    tryNextPage();
  }

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div ref={contentRef}>
        <Title>
          <h1>Radiowcy</h1>
        </Title>

        {state.archives.members.pages.map((item, i) => (
          <MemberListPage data={item} key={i} />
        ))}
      </div>
    </Container>
  );
}

export default connect(MemberList);

const Container = styled(motion.section)`
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
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }
`;
