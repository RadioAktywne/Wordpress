import { Settings } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import Theme from "@frontity/ra-theme/types";

// @ts-ignore
const settings: Settings<Theme | WpSource> = {
  name: "radioaktywne",
  state: {
    frontity: {
      url: process.env.WEB_URL || "https://radioaktywne.pl",
      title: "Radio Aktywne",
      description: "Radio Aktywne",
    },
  },
  packages: [
    // @ts-ignore
    {
      name: "@frontity/ra-theme",
      state: {
        theme: {
          menu: [
            ["Radio Aktywne", "/"],
            ["Nagrania", "/recordings"],
            ["Płyta Tygodnia", "/albums"],
            ["Radio", "/info"],
          ],
        },
      },
    },
    // @ts-ignore
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: process.env.WEB_WORDPRESS_URL || "http://localhost:80",
          postTypes: [
            {
              type: "member",
              endpoint: "member",
              archive: "/members",
            },
            {
              type: "show",
              endpoint: "show",
              archive: "/shows",
            },
            // {
            //   type: "album",
            //   endpoint: "album",
            //   archive: "/albums",
            // },
            {
              type: "info",
              endpoint: "info",
              archive: "/info",
            },
            // {
            //   type: "recording",
            //   endpoint: "recording",
            //   archive: "/recordings",
            // },
          ],
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
