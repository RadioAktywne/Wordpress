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
       * The title of current song
       */
      title: string;

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

    home: {
      hovered: {
        recordings: boolean;
        events: boolean;
      };
    };

    configuration: {
      pages: {
        home: PageConfiguration;
        about: PageConfiguration;
      };
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

    players: {
      main: {
        playing: boolean; //is radio player playing
        srcUrl: string; //src of current radio stream
        muted: boolean; //is radio player muted
        volume: number; //volume of radio player
      };
      recordings: {
        playing: boolean; //is recording player playing
        srcUrl: string; //src of current recording
        openedRec: number; //id of current recording
        muted: boolean; //is recording player muted
        played: number; //current progress
        durations: object; //durations of recordings
        isOpened: object; //boolean telling if a recording is opened
      };
    };

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

    players: {
      main: {
        playerPlay: Action<Packages>;
        playerStop: Action<Packages>;
      };
      recordings: {
        playerPlay: Action<Packages>;
        playerPause: Action<Packages>;
      };
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
