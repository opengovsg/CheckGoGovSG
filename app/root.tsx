import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "android-chrome-192x192",
      sizes: "192x192",
      href: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "android-chrome-512x512",
      sizes: "512x512",
      href: "/favicon/android-chrome-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "check.go.gov.sg",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
      </body>
    </html>
  );
}
