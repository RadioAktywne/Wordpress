import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";
import React from "react";

/**
 * The navigation component. It renders the navigation links.
 *
 * @returns The `<nav>` tag with the menu.
 */
function Nav(): JSX.Element {
  const { state } = useConnect<Packages>();

  let afterOpened = false;

  return (
    <NavContainer>
      {state.theme.menu.map(([name, link], number) => {
        // Check if the link matched the current page url.
        const data = state.source.get(state.router.link);
        let isCurrentPage = data.route === link;
        switch (link) {
          case "/nagrania/":
            if (data.route.includes("/nagranie/")) isCurrentPage = true;
            break;

          case "/plyty-tygodnia/":
            if (data.route.includes("/plyta-tygodnia/")) isCurrentPage = true;
            break;

          case "/blog/":
            if (data.route.includes("/blog/")) isCurrentPage = true;
            break;

          case "/radio/":
            if (
              data.route.includes("/ramowka/") ||
              data.route.includes("/audycje/") ||
              data.route.includes("/o-nas/") ||
              data.route.includes("/audycja/") ||
              data.route.includes("/radiowcy/") ||
              data.route.includes("/radiowiec/")
            )
              isCurrentPage = true;
            break;
        }

        if (isCurrentPage) afterOpened = true;

        return (
          <NavItem
            key={name}
            className={
              isCurrentPage
                ? "noBorder"
                : "border" + ((number - (afterOpened ? 1 : 0)) % 4)
            }
          >
            <Link link={link} aria-current={isCurrentPage ? "page" : undefined}>
              {name}
            </Link>
          </NavItem>
        );
      })}
    </NavContainer>
  );
}

export default connect(Nav);

const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow-x: auto;

  @media (max-width: 940px) {
  {
    align-self: flex-end;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

const NavItem = styled.div`
  margin: 0;
  color: #fff4dc;
  font-size: 1rem;

  @media (max-width: 1400px) {
    font-size: 12px;
  }

  font-family: sans-serif;
  box-sizing: border-box;
  flex-shrink: 0;

  &.border0 {
    border-top: solid 18px #e85a57;
  }

  &.border1 {
    border-top: solid 18px #fff55a;
  }

  &.border2 {
    border-top: solid 18px #6aba9c;
  }

  &.border3 {
    border-top: solid 18px #7190bc;
  }

  &.noBorder {
    border-top: solid 18px #30241a;
  }

  & > a {
    display: inline-block;
    line-height: 45px;
    padding: 0 20px;
    border-bottom-color: transparent;

    &[aria-current="page"] {
      background-color: #fff4dc !important;
      color: #30241a !important;
    }
  }

  &:hover > a {
    background-color: #594d40;
    color: #fff4dc;
  }
`;
