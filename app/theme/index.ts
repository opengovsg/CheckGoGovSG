import { extendTheme } from "@chakra-ui/react";
import { theme as ogpDesignSystemDefaultTheme } from "@opengovsg/design-system-react";
import { mergeDeepRight } from "ramda";

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
        // TODO later
      },
    },
  }),
);
