import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { GovtMasthead, RestrictedFooter } from "@opengovsg/design-system-react";

import { BaseLayoutHeader } from "~/components/BaseLayout/BaseLayoutHeader";

interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Flex flexDir="column" width="100%" minH="100vh" pos="relative">
      <GovtMasthead />
      <BaseLayoutHeader />
      <Box flex={1}>{children}</Box>
      <RestrictedFooter
        appLink="https://check.go.gov.sg"
        appName="check.go.gov.sg"
        containerProps={{
          bg: "#000",
        }}
        textColorScheme="white"
      />
    </Flex>
  );
};
