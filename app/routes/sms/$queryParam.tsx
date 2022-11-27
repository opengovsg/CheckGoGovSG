import { Box, Text } from "@chakra-ui/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { LandingSection } from "~/components/Landing/LandingSection";

// TODO refactor into proper DTOs?
interface DisplayData {
  agencyName: string;
  agencyShortName: string;
  messageType: string;
  recipientId: string;
  senderName: string;
  senderPosition: string;
  timestamp: Date;
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.queryParam, "queryParam is required"); // OK because of Remix's convention
  const headers = {
    "Cache-Control": "private, max-age=3600, must-revalidate",
  };
  const { queryParam } = params;
  // 1. if prodResponse is successful, use that
  // else, use stagingResponse if that is successful
  // finally, if both returns 404, return not found
  // if staging or prod is down, throw an error
  const [prodPromise, stagingPromise] = await Promise.allSettled([
    // fetch(`${process.env.CHECKER_URL_PROD}/sms/${queryParam}`),
    fetch(`${process.env.CHECKER_URL_LOCAL}/sms/${queryParam}`), // WARNING: TODO replace with prodUrl before merging
    fetch(`${process.env.CHECKER_URL_STAGING}/sms/${queryParam}`),
  ]);
  // Including alternative fetches to test error handling code paths TODO: convert these into tests in the future
  // 1. test prod API is down
  // const [prodResponse, stagingResponse] = await Promise.allSettled([
  //   fetch("fakedomain.gov.sg/sms/123456"),
  //   fetch(`${process.env.CHECKER_URL_STAGING}/sms/${queryParam}`),
  // ]);
  // 2. test staging API is down
  // const [prodResponse, stagingResponse] = await Promise.allSettled([
  //   fetch(`${process.env.CHECKER_URL_PROD}/sms/${queryParam}`),
  //   fetch("fakedomain.gov.sg/sms/123456"),
  // ]);
  // - if found on prod, that will be returned
  // - if not found on prod, staging is down error will be thrown
  // 3. if not found on prod AND staging is down, 404 will be returned
  // const [prodResponse, stagingResponse] = await Promise.allSettled([
  //   fetch(`${process.env.CHECKER_URL_PROD}/sms/nonexistent-param`),
  //   fetch(`${process.env.CHECKER_URL_STAGING}/sms/nonexistent-param`),
  // ]);
  if (prodPromise.status === "rejected") {
    throw new Error(" prod API is down");
  }
  const prodResponse = await prodPromise.value;
  // happy path if queryParam is found on prod checker db
  if (prodResponse.ok) {
    const displayData: DisplayData = await prodResponse.json();
    verifyMessageType(displayData);
    return json({ ...displayData }, { headers });
  }
  if (stagingPromise.status === "rejected") {
    throw new Error("staging API is down");
  }
  const stagingResponse = await stagingPromise.value;
  if (stagingResponse.ok) {
    const displayData: DisplayData = await stagingResponse.json();
    verifyMessageType(displayData);
    return json({ ...displayData, isStaging: true }, { headers });
  }
  // if both prod and staging returns 404
  throw new Response("Not found", { status: 404 });
};

interface DisplayDataFrontend extends DisplayData {
  isStaging?: boolean;
}

export default function SmsQueryParamDetailsPage() {
  const {
    agencyName,
    agencyShortName,
    recipientId,
    senderName,
    senderPosition,
    timestamp,
    isStaging,
  } = useLoaderData<DisplayDataFrontend>();
  return (
    <LandingSection>
      <div>
        <h1>SmsQueryParamDetailsPage</h1>
      </div>
      <Box>
        <Text>Agency Name: {agencyName}</Text>
        <Text>Agency Short Name: {agencyShortName}</Text>
        <Text>Recipient ID: {recipientId}</Text>
        <Text>Sender Name: {senderName}</Text>
        <Text>Sender Position: {senderPosition}</Text>
        <Text>Timestamp: {timestamp} </Text>
        {isStaging && <Text>this is a demo</Text>}
      </Box>
    </LandingSection>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  // possibilities:
  // 1. prod is down
  // 2. prod not found and staging is down
  // 3. messageType is wrong (shouldn't happen)
  // make UI to display this here
  console.error("error", error);
  return <div>We are at ErrorBoundary {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    // TODO in this PR: handle UI for if queryParam is not found
    return <div>Query param not found</div>;
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
