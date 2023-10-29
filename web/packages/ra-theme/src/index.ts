import iframe from "@frontity/html2react/processors/iframe";
import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";
import RaThemeTypeScript from "../types";
import Root from "./components/root";
import pageHandler from "./handlers/page";
import postTypeHandler from "./handlers/postType";
import postTypeArchiveHandler from "./handlers/postTypeArchive";
import { ensurePath } from "./lib/utils";

const raThemeTypeScript: RaThemeTypeScript = {
  name: "@radioaktywne/ra-theme",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Root,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: ({ state }) => [
        ["Radio Aktywne", state.config.pages.home.path],
        ["Nagrania", state.config.posts.recording.archivePath],
        ["Płyta Tygodnia", state.config.posts.album.archivePath],
        ["Publicystyka", state.config.posts.post.archivePath],
        ["Radio", state.config.posts.info.archivePath],
      ],
      isMobileMenuOpen: false,
    },

    home: {
      hovered: {
        recordings: false,
        events: false,
      },
    },

    config: {
      pages: {
        home: {
          path: "/",
        },
        about: {
          path: "/o-nas/",
        },
      },
      posts: {
        post: {
          endpoint: "posts",
          wpPath: "/blog/",
          wpArchivePath: "/blog/",
          path: "/blog/",
          archivePath: "/blog/",
          perPage: 16,
        },
        event: {
          endpoint: "event",
          wpPath: "/event/",
          wpArchivePath: "/events/",
          path: "/ramowka/",
          archivePath: "/ramowka/",
          perPage: 100,
        },
        recording: {
          endpoint: "recording",
          wpPath: "/recording/",
          wpArchivePath: "/recordings/",
          path: "/nagranie/",
          archivePath: "/nagrania/",
          perPage: 22,
        },
        album: {
          endpoint: "album",
          wpPath: "/album/",
          wpArchivePath: "/albums/",
          path: "/plyta-tygodnia/",
          archivePath: "/plyty-tygodnia/",
          perPage: 16,
        },
        show: {
          endpoint: "show",
          wpPath: "/show/",
          wpArchivePath: "/shows/",
          path: "/audycja/",
          archivePath: "/audycje/",
          perPage: 16,
        },
        member: {
          endpoint: "member",
          wpPath: "/member/",
          wpArchivePath: "/members/",
          path: "/radiowiec/",
          archivePath: "/radiowcy/",
          perPage: 16,
        },
        info: {
          endpoint: "info",
          wpPath: "/info/",
          wpArchivePath: "/info/",
          path: "/radio/",
          archivePath: "/radio/",
          perPage: 100,
        },
        survey: {
          endpoint: "survey",
          wpPath: "/survey/",
          wpArchivePath: "/surveys/",
          path: "/ankieta/",
          archivePath: "/ankiety/",
          perPage: 16,
        },
      },
      surveys: {
        url: process.env.WEB_SURVEYS_API_URL || "http://localhost:30000/api",
      },
    },

    players: {
      main: {
        playing: false,
        muted: false,
        volume: 1,
        source: {
          url: "https://listen.radioaktywne.pl:8443/ramp3",
          title: null,
        },
      },
      recordings: {
        playing: false,
        muted: false,
        volume: 1,
        source: null,
      },
    },

    archives: {
      recordings: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },

      albums: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },

      posts: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },

      members: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },

      shows: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },

      surveys: {
        nextPage: undefined,
        pages: [],
        ready: false,
      },
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
      init: ({ state, libraries }) => {
        // Add post handlers
        for (const [key, data] of Object.entries(state.config.posts)) {
          // @ts-ignore
          libraries.source.handlers.push({
            name: `${key} handler`,
            priority: 5,
            pattern: `${ensurePath(data.path)}:slug`,
            func: postTypeHandler({
              type: key,
              endpoint: data.endpoint,
            }),
          });

          // @ts-ignore
          libraries.source.handlers.push({
            name: `${key} archive handler`,
            priority: 5,
            pattern: ensurePath(data.archivePath),
            func: postTypeArchiveHandler({
              type: key,
              endpoint: data.endpoint,
              params: {
                per_page: data.perPage,
              },
            }),
          });
        }

        // Add post handlers
        for (const [key, data] of Object.entries(state.config.pages)) {
          // @ts-ignore
          libraries.source.handlers.push({
            name: `${key} page handler`,
            priority: 5,
            pattern: ensurePath(data.path),
            func: pageHandler({
              slug: key,
            }),
          });
        }
      },
    },

    players: {
      playMain: ({ state }) => {
        state.players.recordings.playing = false; //turn off recording
        state.players.main.playing = true; //turn on radio
      },
      pauseMain: ({ state }) => {
        state.players.main.playing = false; //turn off recording
      },
      playRecordings: ({ state }) => {
        state.players.main.playing = false; //turn off radio
        state.players.recordings.playing = true; //turn on recording
      },
      pauseRecordings: ({ state }) => {
        state.players.recordings.playing = false;
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
