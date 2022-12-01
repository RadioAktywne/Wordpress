import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-image";
import { AlbumData, AlbumEntity } from "../data";
import Loading from "./loading";
import Back from "../img/icons/back.svg";
import Link from "./link";
import parse from "html-react-parser";

/**
 * Properties received by the `Album` component.
 */
interface AlbumProps {
  data: AlbumData;
  when?: boolean;
}

/**
 * The Album component that is used to render albums
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Album} element rendered.
 */
function Album({ data }: AlbumProps): JSX.Element {
  const { state, libraries } = useConnect<Packages>();
  const album: AlbumEntity = state.source[data.type][data.id];

  // const Html2React = libraries.html2react.Component;

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <MainContent>
        <Title>
          <h1>
            {album.acf.title} - {album.acf.artist}
          </h1>

          <BackButton>
            <Link link="/albums">
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <Description>
          {/* <Html2React html={album.acf.description} /> //alternative way - it can be styled then below*/}
          {parse(
            //parse html
            album.acf.description
              .replace('<div class="article-containter">', "") //remove div at the beginning
              .replace("</div>", "") //remove closing div at the end
              .replace(/(?:\r\n|\r|\n)/g, "<br>") //convert new lines to breaks
              .replace(/^(<br>)+|(<br>)+$/g, "") //remove newlines at the beginning and at the end
          )}
        </Description>
      </MainContent>

      {album.acf.image && (
        <Cover>
          <FeaturedMedia id={album.acf.image} />
        </Cover>
      )}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(Album);

const Container = styled.div`
  max-width: 1140px;
  width: 100%;
  margin: 0 30px;
  padding: 24px;
  padding-top: 20px;

  display: flex;
  flex-direction: row;

  @media (max-width: 1400px) {
    margin: 0 10px;
  }

  @media (max-width: 750px) {
    flex-direction: column;
    padding: 24px 0;
    margin: 0;
  }
`;

const Description = styled.div`
  color: #3c3c4c;
  font-size: 1rem;
  line-height: 1.7;
  margin-top: 20px;

  & ul,
  & ol {
    line-height: 1;
    margin: 0;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }
`;

const MainContent = styled.div`
  width: 66.6%;
  padding-right: 20px;

  @media (max-width: 750px) {
    width: 100%;
    padding-right: 0;
  }
`;

const Cover = styled.div`
  width: 33.3%;
  height: auto;
  aspect-ratio: 1/1;

  overflow: hidden;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 750px) {
    width: 100%;

    & img {
      width: 100%;
    }

    aspect-ratio: auto;
    height: auto;
    padding-right: 0;
    border: none;
    margin-top: 30px;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > h1 {
    color: #6aba9c;
    background-color: #3c3c4c;
    border-bottom: solid 2px #6aba9c;
    padding-left: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-weight: lighter;
    font-size: 1.6rem;
    width: 100%;
    display: flex;
    align-items: center;

    @media (max-width: 1400px) {
      font-size: 1.2rem;
    }
  }
`;

const BackButton = styled.div`
  cursor: pointer;
  border-left: 2px solid #6aba9c;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;

  & img {
    height: 30px;
    width: 50px;
    transform: rotateZ(90deg);
  }
`;
