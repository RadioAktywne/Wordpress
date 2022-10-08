import RaThemeTypeScript from "../types";
import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { postTypeHandler } from "@frontity/wp-source/src/libraries/handlers";
import postTypeArchiveHandler from "./handlers/postTypeArchive";

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
      menu: [],
      isMobileMenuOpen: false,
    },

    raplayer: {
      playing: false,
      srcUrl: "",
      muted: false,
      volume: 1,
    },

    recplayer: {
      playing: false,
      srcUrl: "",
      openedRec: -100,
      muted: false,
      played: 0.0,
      durations: [],
      isOpened: [],
    },

    recordings: {
      currentPage: undefined,
      pages: [undefined],
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

        // @ts-ignore
        libraries.source.handlers.push({
          name: "event handler",
          priority: 15,
          pattern: "/event/(.*)?",
          func: postTypeHandler({
            endpoints: ["event"],
          }),
        });
        // @ts-ignore
        libraries.source.handlers.push({
          name: "events handler",
          priority: 15,
          pattern: "/events/",
          func: postTypeArchiveHandler({
            type: "event",
            endpoint: "event",
            params: {
              per_page: 100,
            },
          }),
        });

        // @ts-ignore
        libraries.source.handlers.push({
          name: "recording handler",
          priority: 15,
          pattern: "/recording/(.*)?",
          func: postTypeHandler({
            endpoints: ["recording"],
          }),
        });
        // @ts-ignore
        libraries.source.handlers.push({
          name: "recordings handler",
          priority: 15,
          pattern: "/recordings/",
          func: postTypeArchiveHandler({
            type: "recording",
            endpoint: "recording",
            params: {
              per_page: 4,
            },
          }),
        });
      },
    },

    raplayer: {
      playerPlay: ({ state }) => {
        state.recplayer.playing = false; //turn off recording
        state.recplayer.openedRec = -1;

        state.raplayer.playing = true; //turn on radio
      },
      playerStop: ({ state }) => {
        state.raplayer.playing = false; //turn off recording
        state.raplayer.srcUrl = "";
      },
    },

    recplayer: {
      playerPlay: ({ state }) => {
        state.raplayer.playing = false; //turn off radio
        state.raplayer.srcUrl = "";

        state.recplayer.playing = true; //turn on recording
      },
      playerPause: ({ state }) => {
        state.recplayer.playing = false;
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
