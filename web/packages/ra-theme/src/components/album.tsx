import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import FeaturedMedia from "./featured-image";
import { AlbumData, AlbumEntity } from "../data";

/**
 * Properties received by the `Album` component.
 */
interface AlbumProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: AlbumData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Album component that is used to render albums
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Album when={data.isAlbum} />
 * </Switch>
 * ```
 *
 * @returns The {@link Album} element rendered.
 */
function Album({ data }: AlbumProps): JSX.Element {
  const { state, libraries } = useConnect<Packages>();
  // Get the data of the album.
  const album: AlbumEntity = state.source[data.type][data.id];

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <div>
        <Title>{album.acf.title}</Title>
        {album.acf.artist}
      </div>

      {album.acf.image && <FeaturedMedia id={album.acf.image} />}

      {album.acf.description && ( // Render the content using the Html2React component so the HTML is
        // processed by the processors we included in the
        // libraries.html2react.processors array.
        <Content>
          <Html2React html={album.acf.description} />
        </Content>
      )}
    </Container>
  ) : null;
}

export default connect(Album);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 24px 0 8px;
  color: rgba(12, 17, 43);
`;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */

const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    width: 100%;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* Input fields styles */

  input[type="text"],
  input[type="email"],
  input[type="url"],
  input[type="tel"],
  input[type="number"],
  input[type="date"],
  textarea,
  select {
    display: block;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 4px;
    outline-color: transparent;
    transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin: 8px 0 4px 0;

    &:focus {
      outline-color: #1f38c5;
    }
  }

  input[type="submit"] {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid #1f38c5;
    padding: 12px 36px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
    color: #fff;
    background-color: #1f38c5;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
`;
