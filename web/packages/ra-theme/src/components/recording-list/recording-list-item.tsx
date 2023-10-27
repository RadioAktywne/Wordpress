import { motion } from "framer-motion";
import { connect, styled, useConnect } from "frontity";
import parse from "html-react-parser";
import { useCallback } from "react";
import { Packages } from "../../../types";
import { RecordingEntity } from "../../data";
import useMedia from "../../hooks/useMedia";
import Arrow from "../../img/icons/arrow.svg";
import FeaturedAudio from "../featured-audio";
import Link from "../link";

/**
 * The props of the {@link RecordingListItem} component.
 */
interface ItemProps {
  /**
   * The recording that should be shown.
   */
  item: RecordingEntity;
  number: Number;
}

/**
 * Recording List item Component.
 * It renders the preview of a recording.
 *
 * @param props - Defined in {@link ItemProps}.
 * @returns The rendered recording.
 */
function RecordingListItem({ item, number }: ItemProps): JSX.Element {
  const { state } = useConnect<Packages>();
  const {
    status,
    value: [media],
  } = useMedia([item.acf.file]);

  const onOpen = useCallback(() => {
    if (!media?.source_url) return;

    if (state.players.recordings.source?.recording === item.id) return;

    state.players.recordings.source = {
      url: media.source_url,
      recording: item.id,
      progress: 0,
      duration: 0,
    };
  }, [item.id, media?.source_url]);

  const isOpen = state.players.recordings.source?.recording === item.id;

  return (
    <Container
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.2, delay: Math.random() / 5 }}
    >
      <Title
        onClick={onOpen}
        className={(isOpen ? "hidden " : "") + ("hoverColor" + number)}
      >
        {parse(item.title.rendered)}
      </Title>

      <FeaturedAudio loading={status === "pending"} id={item.id} />

      <BackButton>
        <Link link={item.link}>
          <span className="showMore">Więcej...</span>
          <img src={Arrow} alt="pokaż więcej" />
        </Link>
      </BackButton>
    </Container>
  );
}

// Connect the RecordingListItem to gain access to `state` as a prop
export default connect(RecordingListItem);

const Container = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  min-height: 40px;
  color: white;

  & > div {
    width: 100%;
  }

  &:nth-of-type(2n + 1) > div {
    background-color: rgba(48, 36, 26, 0.8);
  }

  &:nth-of-type(2n) > div {
    background-color: #30241a;
  }
`;

const Title = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding-left: 15px;

  &:hover {
    cursor: pointer;
  }

  &.hoverColor0:hover {
    background-color: #e85a57 !important;
  }

  &.hoverColor1:hover {
    background-color: #fff55a !important;
    color: #30241a;
  }

  &.hoverColor2:hover {
    background-color: #6aba9c !important;
  }

  &.hoverColor3:hover {
    background-color: #7190bc !important;
  }
`;

const BackButton = styled.div`
  width: auto !important;

  & > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    height: 100%;
    border-left: solid #6aba9c 2px;
    color: white;
  }

  & > a > .showMore {
    width: 0px;
    opacity: 0;
    letter-spacing: -7px;
    transition: all ease-in-out 0.1s;
  }

  & > a:hover > .showMore {
    width: 70px;
    opacity: 1;
    letter-spacing: normal;
    transition: all ease-in-out 0.1s;
  }

  & > a > img {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }

  @media (max-width: 750px) {
    & > a:hover > .showMore {
      width: 50px;
    }
  }
`;
