import { extendTheme } from "@chakra-ui/react";
import { theme as ogpDesignSystemDefaultTheme } from "@opengovsg/design-system-react";
import { mergeDeepRight } from "ramda";

import { Button } from "./components/Button";

import { breakpoints } from "~/theme/foundations/breakpoints";
import { colors } from "~/theme/foundations/colors";
import { fonts } from "~/theme/foundations/fonts";

export const theme = extendTheme(
  mergeDeepRight(ogpDesignSystemDefaultTheme, {
    fonts,
    semanticTokens: {
      colors,
    },
    components: {
      Button,
    },
    breakpoints,
  }),
);
