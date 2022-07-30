import { Action, Frontity, MergePackages, Package } from "frontity/types";
import { AutoPrefetch } from "@frontity/components/link/types";
import Html2React from "@frontity/html2react/types";
import Router from "@frontity/router/types";
import Source from "@frontity/source/types";

/**
 * A Frontity starter theme designed to learn Frontity.
 */
interface RaThemeTypeScript extends Package {
  /**
   * The name of this package.
   */
  name: "@frontity/ra-theme";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: React.ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Theme namespace.
     */
    theme: {
      /**
       * The auto prefetch setting. Defined in {@link AutoPrefetch}.
       */
      autoPrefetch: AutoPrefetch;

      title: string,

      volume: number,

      playing: boolean,

      muted: boolean,

      /**
       * The menu of the theme. Expresed as an array of arrays that contain the
       * label in the first item and the link in the second.
       */
      menu: [string, string][];

      /**
       * Indicates if the mobile menu is opened or closed.
       */
      isMobileMenuOpen: boolean;
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: {
    /**
     * The theme namespace.
     */
    theme: {
      /**
       * Toggles the mobile menu between opened and closed states.
       */
      toggleMobileMenu: Action<Packages>;

      /**
       * Closes the mobile menu, not matter the previous state.
       */
      closeMobileMenu: Action<Packages>;

      /**
       * Initial action.
       */
      init: Action<Packages>;
    };
  };
}

export default RaThemeTypeScript;

/**
 * Packages required by `RaThemeTypeScript`.
 */
export type Packages = MergePackages<Frontity,
  Router,
  Source,
  Html2React,
  RaThemeTypeScript>;
