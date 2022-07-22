import { connect, styled, useConnect } from "frontity";
import Link from "./link";
import { Packages } from "../../types";

/**
 * The modal containing the mobile menu items.
 *
 * @param props - The props passed to the component from parent.
 * @returns A React component.
 */
function MenuModal({ ...props }) {
  const { state } = useConnect<Packages>();
  const { menu } = state.theme;
  const isThereLinks = menu?.length > 0;

  return (
    <div {...props}>
      <MenuContent as="nav">
        {isThereLinks &&
          menu.map(([name, link]) => {
            const data = state.source.get(state.router.link);
            const isCurrentPage = (data.route === link || data.route.slice(0, data.route.length - 1) === link);
    
            return (
              <MenuLink 
                key={name}
                link={link}
                aria-current={isCurrentPage ? "page" : undefined}
              >
                  {name}
              </MenuLink>
            );
          }
        )}
      </MenuContent>
    </div>
  );
}

const MenuContent = styled.div`
  background-color: #3C3C4C;
  width: 200px;
  height: 100vh;
  overflow: hidden auto;
  position: fixed;
  top: 81.7px;
  left: 0;
  z-index: 3;
  line-height: 1.7;
  font-family: sans-serif;

  @media (min-width: 560px) {
    display: none;
  }
`;

const MenuLink = styled(Link)`
  width: 100%;
  display: inline-block;
  outline: 0;
  font-size: 1rem;
  font-weight: normal;
  padding-left: 15px;

  &:hover,
  &:focus {
    background-color: #6aba9c;
    color: #F7F5F6;
  }

  // /* styles for active link */

  // &[aria-current="page"] {
  //   background-color: #F7F5F6;
  //   color: #3c3c4c;
  // }
`;

export default connect(MenuModal, { injectProps: false });
