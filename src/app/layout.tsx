import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

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
});

export const metadata: Metadata = {
  title: "Xether AI - Developer Documentation",
  description:
    "Comprehensive guides and API references for Xether AI platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${snPro.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
