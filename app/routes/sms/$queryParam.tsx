import { Flex, Img, Text } from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import CheckGraphic from "app/assets/home/check.svg";
import NotFoundGraphic from "app/assets/not-found-page/not-found-graphic.svg";
import invariant from "tiny-invariant";

import { timeDifference } from "~/utils/time";

// NB need to sync across codebase
interface DisplayData {
  messageType: string;
  agencyName: string;
  agencySenderId: string;
  recipientId: string;
  timestamp: Date;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.queryParam, "queryParam is required"); // OK because of Remix's convention
  const headers = {
    "Cache-Control": "private, max-age=3600, must-revalidate",
  };
  const { queryParam } = params;
  const [prodPromise, stagingPromise] = await Promise.allSettled([
    fetch(`${process.env.CHECKER_URL_PROD}/sms/${queryParam}`),
    fetch(`${process.env.CHECKER_URL_STAGING}/sms/${queryParam}`),
  ]);
  // Including alternative fetches to test error handling code paths
  // TODO: convert these into tests in the future
  // 1. test prod API is down
  // const [prodPromise, stagingPromise] = await Promise.allSettled([
  //   fetch("fakedomain.gov.sg/sms/123456"),
  //   fetch(`${process.env.CHECKER_URL_STAGING}/sms/${queryParam}`),
  // ]);
  // 2. test staging API is down
  // const [prodPromise, stagingPromise] = await Promise.allSettled([
  //   fetch(`${process.env.CHECKER_URL_PROD}/sms/${queryParam}`),
  //   fetch("fakedomain.gov.sg/sms/123456"),
  // ]);
  // - if found on prod, that will be returned
  // - if not found on prod, staging is down error will be thrown
  // 3. if not found on prod AND staging, 404 will be returned
  // const [prodPromise, stagingPromise] = await Promise.allSettled([
  //   fetch(`${process.env.CHECKER_URL_PROD}/sms/nonexistent-param`),
  //   fetch(`${process.env.CHECKER_URL_STAGING}/sms/nonexistent-param`),
  // ]);

  if (prodPromise.status === "rejected") {
    throw new Error("production API is down");
  }
  const prodResponse = prodPromise.value;
  // happy path if queryParam is found on prod checker db
  if (prodResponse.ok) {
    const displayData: DisplayData = await prodResponse.json();
    verifyMessageType(displayData);
    return json({ ...processDisplayData(displayData) }, { headers });
  }
  // if not found on prod, check staging
  if (stagingPromise.status === "rejected") {
    throw new Error("staging API is down");
  }
  const stagingResponse = stagingPromise.value;
  if (stagingResponse.ok) {
    const displayData: DisplayData = await stagingResponse.json();
    verifyMessageType(displayData);
    return json(
      { ...processDisplayData(displayData), isStaging: true },
      { headers },
    );
  }
  // if not found on both prod and staging returns 404
  throw new Response("Not found", { status: 404 });
};

interface DisplayDataFrontend
  extends Omit<DisplayData, "timestamp" | "recipientId"> {
  relativeTimeAgo: string;
  timestampSgt: string;
  formattedRecipientPhoneNumber: string;
  isStaging?: boolean;
}

const processDisplayData = (displayData: DisplayData): DisplayDataFrontend => {
  const { timestamp, recipientId, agencySenderId, messageType, agencyName } =
    displayData;
  // process timestamp into relative time
  const relativeTimeAgo = timeDifference(new Date(timestamp).getTime());
  // process timestamp into SGT time, don't show seconds
  const timestampSgt = new Date(timestamp).toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // number of the format 8123 4567
  const formattedRecipientPhoneNumber = `${recipientId.slice(
    0,
    4,
  )} ${recipientId.slice(4)}`;
  return {
    messageType,
    agencyName,
    agencySenderId,
    relativeTimeAgo,
    timestampSgt,
    formattedRecipientPhoneNumber,
  };
};

export default function SmsQueryParamDetailsPage() {
  const {
    agencyName,
    agencySenderId,
    messageType,
    formattedRecipientPhoneNumber,
    relativeTimeAgo,
    timestampSgt,
    isStaging,
  } = useLoaderData<DisplayDataFrontend>();
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      px={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
      mb="2rem"
    >
      <Text
        as="h1"
        textStyle={{ base: "display-2-mobile", md: "display-2" }}
        color="textDefault"
      >
        Verify your {messageType}
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        Is this your phone number?{" "}
        <strong>{formattedRecipientPhoneNumber}</strong>
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        Is your SMS from this sender? <strong>{agencySenderId}</strong>
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        Your SMS is from <strong>{agencyName}</strong>
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        Your SMS was sent <strong>{relativeTimeAgo}</strong> ({timestampSgt})
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        If you received this link but the information above does not match,
        please ignore the {messageType} as it may be an attempted scam.
      </Text>
      {isStaging && (
        <Text mt="1.5rem" textStyle="subhead-1" color="red">
          <i>This is a demo verification message.</i>
        </Text>
      )}
      <Img src={CheckGraphic} alt="Checking" mt="2rem" />
    </Flex>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  // possibilities:
  // 1. prod is down
  // 2. prod not found and staging is down
  // 3. messageType is wrong (shouldn't happen)
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      px={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
      mb="2rem"
    >
      <Text
        as="h1"
        textStyle={{ base: "display-2-mobile", md: "display-2" }}
        color="textDefault"
      >
        An unexpected error has occurred
      </Text>
      <Text
        mt="1.5rem"
        textStyle="body-1"
        color="textDefault"
        width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
      >
        Something has gone wrong. Please send an email to{" "}
        <u>
          <a href="mailto:checkwho@open.gov.sg">checkwho@open.gov.sg</a>
        </u>{" "}
        with the following error message: <strong>{error.message}</strong> and
        we will look into it.
      </Text>
      <Img src={CheckGraphic} alt="Checking" mt="2rem" />
    </Flex>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <Flex
        alignItems="center"
        flexDir="column"
        px={{ base: "1.5rem", md: "5.5rem", lg: "9.25rem" }}
        mb="2rem"
      >
        <Text
          as="h1"
          textStyle={{ base: "display-2-mobile", md: "display-2" }}
          color="textDefault"
        >
          Link not found
        </Text>
        <Text
          mt="1.5rem"
          textStyle="body-1"
          color="textDefault"
          width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
        >
          The link you are trying to access is not valid. This could because the
          link has <strong>expired</strong> or has been{" "}
          <strong>entered incorrectly</strong>.
        </Text>
        <Img src={NotFoundGraphic} alt="Not found" mt="2rem" />
      </Flex>
    );
  }
  // not sure what to show here to be honest; can handle later
  throw new Error(`We are at CatchBoundary ${caught.status}`);
}

const verifyMessageType = (displayData: DisplayData) => {
  const { messageType } = displayData;
  if (messageType !== "SMS") {
    throw new Error(`Unsupported message type: ${messageType}`);
  }
};
