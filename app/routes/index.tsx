import { Flex, Img, Stack, Text } from "@chakra-ui/react";
import LandingPicture from "app/assets/home/landing.svg";

import { LandingSection } from "~/components/Landing/LandingSection";

export default function Index() {
  return (
    <>
      <LandingSection pt={{ base: "2rem", md: 0 }} px="0">
        <Stack
          direction={{ base: "column", lg: "row" }}
          align="center"
          spacing={{ base: "1.5rem", md: "3.125rem", lg: "7.5rem" }}
          pl={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
        >
          <Flex
            flexDir="column"
            flex={3}
            pr={{ base: "1.5rem", md: "5.5rem", lg: "0" }}
          >
            <Text
              as="h1"
              textStyle={{ base: "display-1-mobile", md: "display-1" }}
              color="textDefault"
            >
              Verify messages from{" "}
              <strong>
                <i>public officers</i>
              </strong>
              .
            </Text>
            <Text mt="1.5rem" textStyle="body-1" color="textDefault">
              <strong>Check.go.gov.sg</strong> long links can only be created by
              public officers and are unique to the particular message, so you
              can be sure that it's from a trustworthy source and{" "}
              <i>is meant for you</i>.
            </Text>
            <Text mt="1.5rem" textStyle="subhead-1" color="textEmphasis">
              Make sure your link starts with{" "}
              <code>
                <mark>check.go.gov.sg/</mark>
              </code>
            </Text>
          </Flex>
          <Flex flex={2} aria-hidden justify="right">
            <Img src={LandingPicture} alt="Landing Picture" width="100%" />
          </Flex>
        </Stack>
      </LandingSection>
    </>
  );
}
