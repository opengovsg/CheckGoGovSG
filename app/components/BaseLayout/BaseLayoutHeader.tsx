import React from "react";
import { Flex, Img, Link } from "@chakra-ui/react";
import type { RouteMatch } from "@remix-run/react";
import { useMatches } from "@remix-run/react";
import GoLogo from "app/assets/base-layout/go-main-logo.svg";
import GoLogoMini from "app/assets/base-layout/go-main-logo-mini.svg";

import { useIsSmallIcon } from "~/hooks";

export const BaseLayoutHeader: React.FC = () => {
  const matches = useMatches();
  const { id: currentRoute } = matches.at(-1) as RouteMatch;
  const CheckGoGovSGLogoHref =
    currentRoute === "routes/index" ? "https://go.gov.sg" : "/";
  const isSmallIcon = useIsSmallIcon();
  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      px={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
      py={{ base: "0.25rem", md: "2.5rem" }}
    >
      <Link title="CheckGoGovSG logo" p="4" href={CheckGoGovSGLogoHref}>
        <Img
          src={isSmallIcon ? GoLogoMini : GoLogo}
          alt="Go Logo"
          width={isSmallIcon ? "2.5rem" : "7.5rem"}
        />
      </Link>
    </Flex>
  );
};
