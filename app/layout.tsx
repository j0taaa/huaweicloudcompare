import type { Metadata, Viewport } from "next";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cloud Service Mapper",
  description: "Compare cloud services across AWS, Azure, Google Cloud, and Huawei Cloud",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Cloud Mapper",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#111827"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
