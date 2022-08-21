import RaThemeTypeScript from "../types";
import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { postTypeHandler } from "@frontity/wp-source/src/libraries/handlers";
import ReactPlayer from "react-player";

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
      seeking: false,
      played: 0.0,
      durations: [],
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

    raplayer: {
      playerPlay: ({ state }) => {
        state.recplayer.playing = false;    //turn off recording
        state.recplayer.openedRec = -1

        state.raplayer.playing = true;      //turn on radio
      },
      playerStop: ({ state }) => {
        state.raplayer.playing = false;     //turn off recording
        state.raplayer.srcUrl = "";
      },
    },

    recplayer: {
      playerPlay: ({ state }) => {
        state.raplayer.playing = false;     //turn off radio
        state.raplayer.srcUrl = "";

        state.recplayer.playing = true;     //turn on recording
      },
      playerPause: ({ state }) => {
        state.recplayer.playing = false;
      },
      startSeeking: ({state}) => {
        state.recplayer.seeking = true;
      },
      stopSeeking: ({state}) => {
        state.recplayer.seeking = false;
      },
      updateSeekSliders: ({state}) => {
        const sliders = document.querySelectorAll<HTMLElement>(".rec-seek");

        if(state.recplayer.playing)
          for(let i = 0; i < sliders.length; i++) {   //sets gradient which looks like range input
            sliders[i].style.setProperty(
              "--track-bg",
              "linear-gradient(90deg, #6aba9c 0%, #6aba9c " +
                state.recplayer.played * 100 +
                "%, white " +
                state.recplayer.played * 100 +
                "%, white 100%)"
            );
          }
      },
      updateProgressText: ({state}) => {
        const secsToTime = function(total)            //for example 80 -> 01:20
        {
          const minutes = Math.floor(total/60) >= 10 ? Math.floor(total/60) : ('0' + Math.floor(total/60));
          const seconds = Math.floor(total)%60 >= 10 ? Math.floor(total)%60 : ('0' + Math.floor(total)%60);
          return minutes + ":" + seconds;
        }
      
        document.getElementById("prog-text-" + state.recplayer.openedRec).innerText = 
          secsToTime(state.recplayer.played * state.recplayer.durations[state.recplayer.openedRec]) 
          + " / " 
          + secsToTime(state.recplayer.durations[state.recplayer.openedRec]);
      }
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
