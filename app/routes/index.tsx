import { Box, Flex, Heading } from "@chakra-ui/react";
import { GovtMasthead, RestrictedFooter } from "@opengovsg/design-system-react";

import { Button } from "~/components/Button";

export default function Index() {
  return (
    <Flex direction="column" minH="100vh">
      <GovtMasthead />
      <Button width="fit-content" colorScheme="secondary" variant="reverse">
        Contribute
      </Button>
      <Heading>Welcome to Remix</Heading>
      <Box flex="1">
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
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
}
