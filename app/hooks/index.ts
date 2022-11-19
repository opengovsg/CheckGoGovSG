import { useMediaQuery } from "@chakra-ui/react";

import { breakpoints } from "~/theme/foundations/breakpoints";

// export const useIsMobile = (): boolean => {
//   const isLargerThanMd = useMediaQuery(`(min-width: ${breakpoints.md})`)[0];
//
//   return !isLargerThanMd;
// };

export const useIsSmallIcon = (): boolean => {
  const isLargerThanSm = useMediaQuery(`(min-width: ${breakpoints.sm})`)[0];

  return !isLargerThanSm;
};
