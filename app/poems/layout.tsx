import type { Metadata } from "next";
import "./poems.css";

export const metadata: Metadata = {
  title: "Poems | Harsh Dobariya",
  description: "A bilingual collection of poems on love, distance, and looking within.",
  alternates: { canonical: "/poems" },
};

export default function PoemsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
