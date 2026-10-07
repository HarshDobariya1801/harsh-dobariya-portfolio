import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harshdobariya.com"),
  title: "Harsh Dobariya | Software Engineer",
  description:
    "Software engineer building backend systems, distributed infrastructure, full-stack products, and AI tools.",
  keywords: [
    "Harsh Dobariya",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Distributed Systems",
  ],
  authors: [{ name: "Harsh Dobariya" }],
  creator: "Harsh Dobariya",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Harsh Dobariya | Software Engineer",
    description:
      "Backend systems, distributed infrastructure, full-stack products, and AI tools.",
    type: "website",
    url: "https://harshdobariya.com",
    siteName: "Harsh Dobariya",
    images: [
      {
        url: "https://harshdobariya.com/og.png",
        width: 1200,
        height: 630,
        alt: "Harsh Dobariya, Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Dobariya | Software Engineer",
    description:
      "Backend systems, distributed infrastructure, full-stack products, and AI tools.",
    images: ["https://harshdobariya.com/og.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Dobariya",
  url: "https://harshdobariya.com",
  jobTitle: "Software Engineer",
  email: "mailto:dobariyaharsh10@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tempe",
    addressRegion: "Arizona",
    addressCountry: "US",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Arizona State University" },
    { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
  ],
  sameAs: [
    "https://github.com/HarshDobariya1801",
    "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
