import React from "react";
import { Flex, Img, Link } from "@chakra-ui/react";
import GitHubLogo from "app/assets/base-layout/github-icon.svg";
import GoLogo from "app/assets/base-layout/go-main-logo.svg";
import GoLogoMini from "app/assets/base-layout/go-main-logo-mini.svg";

import { Button } from "~/components/Button";
import { useIsSmallIcon } from "~/hooks";

export const BaseLayoutHeader: React.FC = () => {
  const isSmallIcon = useIsSmallIcon();
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
      py={{ base: "0.625rem", md: "1rem" }}
    >
      <Link title="CheckGoGovSG logo" p="4" href="https://check.go.gov.sg">
        <Img
          src={isSmallIcon ? GoLogoMini : GoLogo}
          alt="Go Logo"
          width={isSmallIcon ? "2.5rem" : "7.5rem"}
        />
      </Link>
      <a href="https://github.com/opengovsg/CheckGoGovSG">
        {isSmallIcon ? (
          <Img p="4" src={GitHubLogo} alt="GitHub Icon" width="60px" />
        ) : (
          <Button
            p="4"
            width="fit-content"
            colorScheme="secondary"
            variant="reverse"
          >
            Contribute
          </Button>
        )}
      </a>
    </Flex>
  );
};
