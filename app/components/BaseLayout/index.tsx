import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { GovtMasthead, RestrictedFooter } from "@opengovsg/design-system-react";

import { BaseLayoutHeader } from "~/components/BaseLayout/BaseLayoutHeader";

interface BaseLayoutProps {
  children: React.ReactNode;
}
export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Flex flexDir="column" width="100%" minH="100vh">
      <GovtMasthead />
      <Box
        flex={1}
        maxW="1100px"
        width="100%"
        height="auto"
        marginX="auto"
        py={10}
      >
        <BaseLayoutHeader />
        {children}
      </Box>
      <RestrictedFooter
        appLink="https://check.go.gov.sg"
        appName="Check.go.gov.sg"
        containerProps={{
          bg: "#000",
        }}
        textColorScheme="white"
      />
    </Flex>
  );
};
