import { Settings } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import Theme from "@frontity/ra-theme/types";

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
    {
      name: "@frontity/ra-theme",
      state: {
        theme: {
          menu: [["Home", "/"]],
          featured: {
            showOnList: false,
            showOnPost: false,
          },
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: process.env.WEB_WORDPRESS_URL || "http://wordpress:80",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
