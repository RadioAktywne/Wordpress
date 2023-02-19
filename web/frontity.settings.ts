import { Settings } from "frontity/types";
import WpSource from "@frontity/wp-source/types";
import Theme from "@radioaktywne/ra-theme/types";

const settings: Settings<Theme | WpSource> = {
  name: "radioaktywne",
  state: {
    frontity: {
      url: process.env.WEB_URL || "https://radioaktywne.pl",
      title: "Radio Aktywne",
      description: "Najstarsza studencka rozgłośnia internetowa w Warszawie!",
    },
  },
  packages: [
    "@radioaktywne/ra-theme",
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          url: process.env.WEB_WORDPRESS_PUBLIC_URL || "http://localhost:80",
          homepage: "home",
        },
      },
    },
    "@frontity/tiny-router",
    "@frontity/html2react",
  ],
};

export default settings;
