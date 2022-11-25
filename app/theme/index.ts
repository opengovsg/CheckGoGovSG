import { extendTheme } from "@chakra-ui/react";
import { theme as ogpDesignSystemDefaultTheme } from "@opengovsg/design-system-react";
import { mergeDeepRight } from "ramda";

import { Button } from "./components/Button";

export const theme = extendTheme(
  mergeDeepRight(ogpDesignSystemDefaultTheme, {
    fonts: {
      heading: `'IBM Plex Sans', sans-serif`,
      body: `'IBM Plex Sans', sans-serif`,
    },
    semanticTokens: {
      colors: {
        text: {
          default: "#384a51",
          emphasis: "#456682",
        },
        // primaryButtonBg: "#456682",
        // primaryButtonHoverBg: "#384a51",
        // primaryButtonColor: "#ffffff",
        reverseButtonColor: "#466682",
        reverseButtonHoverBg: "#f5f5f5",
      },
    },
    components: {
      Button,
    },
  }),
);
