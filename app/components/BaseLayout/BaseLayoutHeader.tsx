import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import GoLogo from "app/assets/base-layout/go-main-logo.svg";
import GoLogoMini from "app/assets/base-layout/go-main-logo-mini.svg";

import { Button } from "~/components/Button";
import { useIsMobile } from "~/hooks/useIsMobile";

export const BaseLayoutHeader: React.FC = () => {
  const isMobile = useIsMobile();

  const getGoLogo = () => {
    if (isMobile) {
      return GoLogoMini;
    }
    return GoLogo;
  };
  return (
    <Flex width="100%" justifyContent="space-between" alignItems="center">
      <Image
        p="4"
        src={getGoLogo()}
        alt="Go Logo"
        width={{ base: "60px", md: "140px" }}
      />
      <Button
        p="4"
        width="fit-content"
        colorScheme="secondary"
        variant="reverse"
      >
        Contribute
      </Button>
    </Flex>
  );
};
