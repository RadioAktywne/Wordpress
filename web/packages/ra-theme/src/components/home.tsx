import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";
import React from "react";
import Player from "./player";
import { HomeData, PageData, PageEntity } from "@frontity/source/types";

/**
 * Properties received by the `Home` component.
 */
interface HomeProps {
  /**
   * Data element representing a URL in your frontity site.
   */
  data: HomeData & PageData;

  /**
   * Whether to render this component.
   */
  when?: boolean;
}

/**
 * The Home component that is used to render homepage
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Home when={data.isHome} />
 * </Switch>
 * ```
 *
 * @returns The {@link Home} element rendered.
 */
function Home({ data }: HomeProps): JSX.Element {
  const { state, libraries } = useConnect<Packages>();
  // Get the data of the homepage.
  const home: PageEntity = state.source[data.type][data.id];
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  //set rds autorefresh
  let XMLHttpRequest = require('xhr2');
  let xhr = new XMLHttpRequest();
  function rds()
  {
    xhr.open("GET", "https://listen.radioaktywne.pl:8443/status-json.xsl", true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let title = JSON.parse(this.responseText).icestats.source[1].title;
  
            if(title != 'Unknown' && !title.endsWith("- Unknown")) {	
              state.theme.title = title;
            }
        }
    }
  
    xhr.send();
  }
  rds();
  setInterval(function() {rds();}, 10000);


  // Load the page, but only if the data is ready.
  return data.isReady ? (
    <BigContainer>
      <Container>
        <Player
          bgUrl="https://radioaktywne.pl/user/themes/raktywne/images/studio.jpg"
        />

        {home.content?.rendered && ( // Render the content using the Html2React component so the HTML is
          // processed by the processors we included in the
          // libraries.html2react.processors array.
          <Content>
            <Html2React html={home.content.rendered} />
          </Content>
        )}
      </Container>
    </BigContainer>
  ) : null;
}

export default connect(Home);

const BigContainer = styled.div`
  padding-bottom: 50px;
  width: 100%;
  max-width: 1200px;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 15px;

  @media (max-width: 900px)
  {
    padding: 0 0;
  }
`

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
