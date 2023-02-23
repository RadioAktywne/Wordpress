import { connect, styled, useConnect } from "frontity";
import Link from "./link";

import FocusLogo from "../img/logos/focus.png";
import SSPWLogo from "../img/logos/sspw.png";
import TVPWsLogo from "../img/logos/tvpw.png";
import Arrow from "../img/icons/arrow.svg";
import { Packages } from "../../types";

/**
 * The footer of the site, logo, socials and the nav bar.
 *
 * @returns The header element.
 */

function Footer() {
  const { state } = useConnect<Packages>();

  return (
    <>
      <Container>
        <Link
          link={state.configuration.posts.info.archivePath}
          id="contactLink"
        >
          kontakt
          <img src={Arrow} alt="kontakt" />
        </Link>

        <PartnersLinks>
          <Link link="https://tvpw.pl" target="_blank">
            <img src={TVPWsLogo} alt="TVPW" />
          </Link>
          <Link link="https://www.facebook.com/KlubFocus/" target="_blank">
            <img src={FocusLogo} alt="Klub Focus" />
          </Link>
          <Link link="https://sspw.pl" target="_blank">
            <img src={SSPWLogo} alt="SSPW" />
          </Link>
        </PartnersLinks>
      </Container>
    </>
  );
}

export default connect(Footer);

const PartnersLinks = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & a {
    display: flex;
    align-items: center;
  }

  & img {
    height: 30px;
    width: auto;
    padding-right: 20px;
  }

  @media (max-width: 750px) {
    & img {
      height: 20px;
    }
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: #30241a;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  #contactLink {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #6aba9c;
    padding-left: 50px;

    & > img {
      height: 25px;
      width: auto;
    }
  }

  @media (max-width: 500px) {
    #contactLink {
      visibility: hidden;
    }
  }
`;
