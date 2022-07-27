import RaThemeTypeScript from "../types";
import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { postTypeHandler } from "@frontity/wp-source/src/libraries/handlers";

const raThemeTypeScript: RaThemeTypeScript = {
  name: "@frontity/ra-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      title: "Trwa ładowanie...",
      volume: 1,
      playing: false,
      menu: [],
      isMobileMenuOpen: false,
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      init: ({ libraries }) => {
        // fix for handling pages
        // @ts-ignore
        libraries.source.handlers.push({
          name: "page handler",
          priority: 20,
          pattern: "/(.*)?",
          func: postTypeHandler({
            endpoints: ["pages"],
          }),
        });
      },
    },
  },
  libraries: {
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [image, iframe, link],
    },
  },
};

export default raThemeTypeScript;
