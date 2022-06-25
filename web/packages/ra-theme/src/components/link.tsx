import { connect, useConnect } from "frontity";
import Link from "@frontity/components/link";
import { Packages } from "../../types";
import { LinkProps } from "@frontity/components/link/types";

/**
 * The ThemeLink component, which is a wrapper on top of the {@link Link}
 * component.
 *
 * @param children - children components.
 * @param props - It accepts the same props as the {@link Link} component.
 *
 * @example
 * ```js
 * <ThemeLink link="/some-post">
 *   <div>Some Post</div>
 * </ThemeLink>
 * ```
 *
 * @returns A {@link Link} component, which returns an HTML anchor element.
 */
function ThemeLink({ children, ...props }: LinkProps): JSX.Element {
  const { state, actions } = useConnect<Packages>();

  /**
   * A handler that closes the mobile menu when a link is clicked.
   */
  const onClick = () => {
    if (state.theme.isMobileMenuOpen) {
      actions.theme.closeMobileMenu();
    }
  };

  return (
    <Link {...props} onClick={onClick}>
      {children}
    </Link>
  );
}

export default connect(ThemeLink, { injectProps: false });
