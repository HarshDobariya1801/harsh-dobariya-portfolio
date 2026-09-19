import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harshdobariya.com"),
  title: "Harsh Dobariya | Full-Stack Software Engineer",
  description:
    "Portfolio of Harsh Dobariya, a full-stack software engineer building reliable products, real-time applications, and distributed systems.",
  keywords: [
    "Harsh Dobariya",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Distributed Systems",
  ],
  authors: [{ name: "Harsh Dobariya" }],
  openGraph: {
    title: "Harsh Dobariya | Full-Stack Software Engineer",
    description:
      "Reliable products, real-time applications, and distributed systems.",
    type: "website",
    url: "https://harshdobariya.com",
  },
  twitter: {
    card: "summary",
    title: "Harsh Dobariya | Full-Stack Software Engineer",
    description:
      "Reliable products, real-time applications, and distributed systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
