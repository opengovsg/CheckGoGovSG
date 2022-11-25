import { Box, Heading } from "@chakra-ui/react";

import { BaseLayout } from "~/components/BaseLayout";

export default function Index() {
  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}
