import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";

/**
 * The navigation component. It renders the navigation links.
 *
 * @returns The `<nav>` tag with the menu.
 */
function Nav(): JSX.Element {
  const { state } = useConnect<Packages>();

  return (
    <NavContainer>
      {state.theme.menu.map(([name, link]) => {
        // Check if the link matched the current page url.
        const data = state.source.get(state.router.link);
        const isCurrentPage =
          data.route === link ||
          data.route.slice(0, data.route.length - 1) === link;

        return (
          <NavItem key={name}>
            {/* If link url is the current page, add `aria-current` for a11y */}
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

  & > a {
    display: inline-block;
    line-height: 45px;
    padding: 0 20px;
    border-bottom-color: transparent;
    /* Use for semantic approach to style the current link */

    &[aria-current="page"] {
      background-color: #fff4dc;
      color: #30241a;
    }
  }

  &:hover > a {
    background-color: #6aba9c;
    color: #fff4dc;
  }
`;
