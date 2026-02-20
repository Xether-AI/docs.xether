import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { defaultMetadata } from "@/lib/metadata";
import { WebsiteStructuredData } from "@/components/StructuredData";
import { SkipToContent } from "@/components/SkipToContent";

const snPro = localFont({
  src: [
    {
      path: "../../public/fonts/sn-pro/SNPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/sn-pro/SNPro-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sn-pro",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <WebsiteStructuredData />
      </head>
      <body
        className={`${snPro.variable} antialiased`}
        style={{
          fontFamily:
            "var(--font-sn-pro), ui-sans-serif, system-ui, -apple-system, sans-serif",
        }}
      >
        <SkipToContent />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
