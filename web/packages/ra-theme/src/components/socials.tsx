import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";
import YouTube from "../img/social/yt.svg";
import Instagram from "../img/social/ig.svg";
import Facebook from "../img/social/fb.svg";
import Spotify from "../img/social/sf.svg";

/**
 * Socials icons.
 *
 * @returns The socials element.
 */

function Socials(props) {
  return (
    <>
      <Container>
        <Link
          link="https://www.youtube.com/channel/UCWotunR5aYz-A_tM2fcs9eg"
          target="_blank"
        >
          <img alt="YouTube" src={YouTube} />
        </Link>

        <Link link="https://www.instagram.com/radioaktywnepw/" target="_blank">
          <img alt="Instagram" src={Instagram} />
        </Link>

        <Link link="https://www.facebook.com/RadioaktywnePW/" target="_blank">
          <img alt="Facebook" src={Facebook} />
        </Link>

        <Link
          link="https://open.spotify.com/show/615XOIPs62nU0f5itBUY8V"
          target="_blank"
        >
          <img alt="Spotify" src={Spotify} />
        </Link>
      </Container>
    </>
  );
}

export default connect(Socials);

const Container = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: row;

  & > a > img {
    height: 30px;
    width: auto;
    padding-left: 20px;
  }

  @media (max-width: 560px) {
    & > a > img {
      height: 22px;
    }

    flex-wrap: wrap;
    margin-right: 40px;
  }
`;
