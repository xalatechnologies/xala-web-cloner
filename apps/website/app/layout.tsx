import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Xala Technologies",
  description: "Xala — modern applications and AI services",
  metadataBase: new URL("https://www.xala.no"),
  openGraph: {
    title: "Xala Technologies",
    description: "Modern applications and AI services",
    url: "https://www.xala.no",
    siteName: "Xala",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
} 