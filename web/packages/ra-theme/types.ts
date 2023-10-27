import {
  Action,
  Derived,
  Frontity,
  MergePackages,
  Package,
} from "frontity/types";
import { AutoPrefetch } from "@frontity/components/link/types";
import Html2React from "@frontity/html2react/types";
import Router from "@frontity/router/types";
import Source, { ArchiveData } from "@frontity/source/types";
import {
  AlbumArchiveData,
  MemberArchiveData,
  RecordingArchiveData,
  ShowArchiveData,
} from "./src/data";
import { ElementType } from "react";
import WpSource from "@frontity/wp-source/types";

type PageConfiguration = {
  /**
   * Front-facing path of the page.
   */
  path: string;
};

type PostConfiguration = {
  /**
   * Endpoint of the post type in WordPress.
   */
  endpoint: string;

  /**
   * WordPress path of the post type.
   */
  wpPath: string;

  /**
   * WordPress path of the post type archive.
   */
  wpArchivePath: string;

  /**
   * Front-facing path of a single post.
   */
  path: string;

  /**
   * Front-facing path of the archive of the post type.
   */
  archivePath: string;

  /**
   * Number of posts per page.
   */
  perPage?: number;
};

type ArchivePageData<A extends ArchiveData> = {
  /**
   * Highest currently loaded recordings page
   */
  nextPage: A;

  /**
   * List of opened pages
   */
  pages: A[];

  /**
   * Is the current page loaded
   */
  ready: boolean;
};

/**
 * A Frontity starter theme designed to learn Frontity.
 */
interface RaThemeTypeScript extends Package {
  /**
   * The name of this package.
   */
  name: "@radioaktywne/ra-theme";

  /**
   * Root components exposed by this package.
   */
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: ElementType;
  };

  /**
   * The state exposed by this package.
   */
  state: {
    theme: {
      /**
       * The auto prefetch setting. Defined in {@link AutoPrefetch}.
       */
      autoPrefetch: AutoPrefetch;

      /**
       * The menu of the theme. Expressed as an array of arrays that contain the
       * label in the first item and the link in the second.
       */
      menu: Derived<Packages, string[][]>;

      /**
       * Indicates if the mobile menu is opened or closed.
       */
      isMobileMenuOpen: boolean;
    };

    /**
     * Homepage state.
     */
    home: {
      /**
       * Hovered elements.
       */
      hovered: {
        recordings: boolean;
        events: boolean;
      };
    };

    /**
     * Static configuration.
     */
    config: {
      /**
       * Pages configuration.
       */
      pages: {
        home: PageConfiguration;
        about: PageConfiguration;
      };

      /**
       * Posts configuration.
       */
      posts: {
        post: PostConfiguration;
        event: PostConfiguration;
        recording: PostConfiguration;
        album: PostConfiguration;
        show: PostConfiguration;
        member: PostConfiguration;
        info: PostConfiguration;
      };
    };

    /**
     * State related to players.
     */
    players: {
      /**
       * Main player state.
       */
      main: {
        /**
         * Whether the player is playing or not.
         */
        playing: boolean;

        /**
         * Whether the player is muted or not.
         */
        muted: boolean;

        /**
         * The volume of the player.
         */
        volume: number;

        /**
         * Source data.
         */
        source?: {
          /**
           * The URL of the current stream.
           */
          url: string;

          /**
           * The title of the current track.
           */
          title?: string;
        };
      };

      /**
       * Recordings player state.
       */
      recordings: {
        /**
         * Whether the player is playing or not.
         */
        playing: boolean;

        /**
         * Whether the player is muted or not.
         */
        muted: boolean;

        /**
         * The volume of the player.
         */
        volume: number;

        /**
         * Source data.
         */
        source?: {
          /**
           * The URL of the current stream.
           */
          url: string;

          /**
           * The ID of the current recording.
           */
          recording: number;

          /**
           * How much of the recording has been played.
           */
          progress: number;

          /**
           * The duration of the recording in seconds.
           */
          duration: number;
        };
      };
    };

    /**
     * State related to archives loading.
     */
    archives: {
      recordings: ArchivePageData<RecordingArchiveData>;
      albums: ArchivePageData<AlbumArchiveData>;
      posts: ArchivePageData<ArchiveData>;
      members: ArchivePageData<MemberArchiveData>;
      shows: ArchivePageData<ShowArchiveData>;
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

    /**
     * Actions related to players.
     */
    players: {
      /**
       * Main player actions.
       */
      playMain: Action<Packages>;

      /**
       * Pauses the main player.
       */
      pauseMain: Action<Packages>;

      /**
       * Mutes the main player.
       */
      playRecordings: Action<Packages>;

      /**
       * Pauses the recordings player.
       */
      pauseRecordings: Action<Packages>;
    };
  };
}

export default RaThemeTypeScript;

/**
 * Packages required by `RaThemeTypeScript`.
 */
export type Packages = MergePackages<
  Frontity,
  Router,
  Source,
  Html2React,
  RaThemeTypeScript,
  WpSource
>;
