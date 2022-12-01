import { Action, Frontity, MergePackages, Package } from "frontity/types";
import { AutoPrefetch } from "@frontity/components/link/types";
import Html2React from "@frontity/html2react/types";
import Router from "@frontity/router/types";
import Source, { ArchiveData } from "@frontity/source/types";
import ReactPlayer from "react-player";
import { ReactDOM } from "react";
import { AlbumArchiveData, MemberArchiveData, RecordingArchiveData } from "./src/data";

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

      /**
       * The title of current song
       */
      title: string;

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

    /**
     * Radio Player namespace.
     */
    raplayer: {
      playing: boolean; //is radio player playing
      srcUrl: string; //src of current radio stream
      muted: boolean; //is radio player muted
      volume: number; //volume of radio player
    };

    /**
     * Recording Player namespace.
     */
    recplayer: {
      playing: boolean; //is recording player playing
      srcUrl: string; //src of current recording
      openedRec: number; //id of current recording
      muted: boolean; //is recording player muted
      played: number; //current progress
      durations: object; //durations of recordings
      isOpened: object; //boolans telling if a recording is opened
    };

    /**
     * Recordings list namespace.
     */
    recordings: {
      nextPage: RecordingArchiveData; //highest currently loaded recordings page
      pages: RecordingArchiveData[]; //list of opened pages
      ready: boolean; //is the current page loaded
    };

    /**
     * Albums list namespace.
     */
    albums: {
      nextPage: AlbumArchiveData; //highest currently loaded albums page
      pages: AlbumArchiveData[]; //list of opened pages
      ready: boolean; //is the current page loaded
    };

    /**
     * Posts list namespace.
     */
    posts: {
      nextPage: ArchiveData; //highest currently loaded posts page
      pages: ArchiveData[]; //list of opened posts
      ready: boolean; //is the current page loaded
    };

    /**
     * Members list namespace.
     */
    members: {
      nextPage: MemberArchiveData; //highest currently loaded members archive page
      pages: MemberArchiveData[]; //list of opened pages of members
      ready: boolean; //is the current page loaded
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

    raplayer: {
      playerPlay: Action<Packages>;
      playerStop: Action<Packages>;
    };

    recplayer: {
      playerPlay: Action<Packages>;
      playerPause: Action<Packages>;
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
  RaThemeTypeScript
>;
