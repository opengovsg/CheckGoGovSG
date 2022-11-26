import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  // 302 because this redirect is temporary and might change in the future
  return redirect("https://go.gov.sg", { status: 302 });
};

export default function SmsIndex() {
  return useLoaderData(); // redirect to home page
}
