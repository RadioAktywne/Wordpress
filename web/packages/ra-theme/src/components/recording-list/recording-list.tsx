import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../../types";
import { RecordingArchiveData } from "../../data";
import RecordingListPage from "./recording-list-page";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Props received by the {@link RecordingList} component.
 */
interface ListProps {
  data: RecordingArchiveData;
  when?: boolean;
}

function RecordingList({ data }: ListProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const contentRef = React.useRef<HTMLDivElement>(); //reference to the div containing title and recordings list

  /**
   * viewing next pages
   */
  const nextPage = function () {
    //if there is a next page and recording-list-page is ready and the next page is ready
    if (
      state.archives.recordings.ready &&
      state.archives.recordings.pages.length <
        state.archives.recordings.pages[0].totalPages &&
      state.archives.recordings.nextPage.isReady
    ) {
      state.archives.recordings.ready = false; //tell state that the recordings page starts to load now
      state.archives.recordings.pages.push(state.archives.recordings.nextPage); //add page to our list in state
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
    if (state.archives.recordings.pages.length == 0)
      state.archives.recordings.pages.push(data);

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
  if (
    state.archives.recordings.ready &&
    state.archives.recordings.nextPage != undefined &&
    state.archives.recordings.nextPage.isReady
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
          <h1>Nagrania</h1>
        </Title>

        {state.archives.recordings.pages.map((item, i) => (
          <RecordingListPage data={item} key={i} />
        ))}
      </div>
    </Container>
  );
}

export default connect(RecordingList);

const Container = styled(motion.section)`
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
    background-color: #30241a;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
  }
`;
