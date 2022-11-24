import { Heading } from "@chakra-ui/react";
import { GovtMasthead, RestrictedFooter } from "@opengovsg/design-system-react";

export default function Index() {
  return (
    <>
      <GovtMasthead />
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <Heading>Welcome to Remix</Heading>
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
        <RestrictedFooter
          appLink="https://check.go.gov.sg"
          appName="Check.go.gov.sg"
          containerProps={{
            bg: "#000",
          }}
          textColorScheme="white"
        />
      </div>
    </>
  );
}
