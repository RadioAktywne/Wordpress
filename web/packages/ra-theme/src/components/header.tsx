import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import Nav from "./nav";
import MobileMenu from "./menu";
import Socials from "./socials";
import { Packages } from "../../types";

import Logo from "../img/ra-logo.svg";

/**
 * The header of the site, logo, socials and the nav bar.
 *
 * @returns The header element.
 */

function Header(props) {
  return (
    <>
      <Container>
        <Link link="/">
          <img alt="Radio Aktywne" src={Logo} />
        </Link>
        <Socials style="padding-left: 20px;" />
        <MobileMenu />
      </Container>
      <Nav />
    </>
  );
}

export default connect(Header);

const Container = styled.div`
  max-width: 100%;
  box-sizing: border-box;
  padding: 1rem 0 0.35rem 0;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & > a > img {
    height: 50px;
    width: auto;
  }

  @media (max-width: 900px) {
    padding: 0.8rem 0 0.05rem 0;

    & > a > img {
      margin-bottom: 10px;
    }
  }
`;
