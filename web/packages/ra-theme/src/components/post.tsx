import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-image";
import Loading from "./loading";
import Back from "../img/icons/back.svg";
import Link from "./link";
import parse from "html-react-parser";
import { PostTypeData, PostTypeEntity } from "@frontity/source/types";
import { isPageEntity, isPostEntity } from "@frontity/source";

/**
 * Properties received by the `Post` component.
 */
interface PostProps {
  data: PostTypeData;
  when?: boolean;
}

/**
 * The Post component that is used to render posts
 *
 * @param props - The Frontity store (state, actions, and libraries).
 * @returns The {@link Album} element rendered.
 */
function Post({ data }: PostProps): JSX.Element {
  const { state, libraries } = useConnect<Packages>();
  const post: PostTypeEntity = state.source[data.type][data.id];

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <MainContent>
        <Title>
          <h1>{post.title.rendered}</h1>

          <BackButton>
            <Link link="/blog">
              <img src={Back} alt="cofnij" />
            </Link>
          </BackButton>
        </Title>

        <Description>
          {(isPostEntity(post) || isPageEntity(post)) &&
            parse(post.content?.rendered)}
        </Description>
      </MainContent>

      {post.featured_media && (isPostEntity(post) || isPageEntity(post)) && (
        <Cover>
          <FeaturedMedia id={post.featured_media} />
        </Cover>
      )}
    </Container>
  ) : (
    <Loading />
  );
}

export default connect(Post);

const Container = styled.div`
  max-width: 1140px;
  width: 100%;
  margin: 0 30px;
  padding: 24px;

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
  & img
  {
    max-width: 760px !important;
    height: auto;
    object-fit: cover;
    object-position: center;
    margin-left: auto;
    margin-right: auto;
  }

  & figure
  {
    margin: 0;
  }

  & ul,
  & ol {
    line-height: 1.5;
    margin: 0;
  }

  @media (max-width: 1400px) {
    font-size: 0.8rem;
  }

  & .aligncenter,
  & .alignleft,
  & .alignright {
    width: fit-content;
  }

  & .aligncenter {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  & .alignright {
    float: right;
    margin-left: 24px;
  }

  & .alignleft {
    float: left;
    margin-right: 24px;
  }

  & iframe {
    display: block;
  }

  & blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  & .has-light-green-cyan-color
  {
    color: #7BDCB5;
  }

  & .has-cyan-bluish-gray-color
  {
    color: #abb8c3;
  }

  & .has-white-color
  {
    color: #ffffff;
  }
  
  & .has-pale-pink-color
  {
    color: #f78da7;
  }
  
  & .has-vivid-red-color
  {
    color: #cf2e2e;
  }
  
  & .has-luminous-vivid-orange-color
  {
    color: #ff6900;
  }
  
  & .has-luminous-vivid-amber-color
  {
    color: #fcb900;
  }
  
  & .has-vivid-green-cyan-color
  {
    color: #00d084;
  }
  
  & .has-pale-cyan-blue-color
  {
    color: #8ed1fc;
  }
  
  & .has-vivid-cyan-blue-color
  {
    color: #0693e3;
  }
  
  & .has-vivid-purple-color
  {
    color: #9b51e0;
  }

  & .wp-block-table table
  {
    border-collapse: collapse;
    width: 100%;
    overflow-wrap: break-word;
  }

  & thead
  {
    border-bottom: 3px solid;
  }

  & .wp-block-table table
  {
    border-collapse: collapse;
  }

  & .wp-block-table td, .wp-block-table th
  {
    border: 1px solid;
    padding: .5em;
  }

  & figcaption
  {
    white-space: pre-wrap;
    min-width: 1px;
    color: #555;
    font-size: 13px;
    text-align: center;
  }

  & .wp-block-code {
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: Menlo,Consolas,monaco,monospace;
    padding: .8em 1em;
  }
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
