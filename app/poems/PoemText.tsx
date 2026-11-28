import type { ReactNode } from "react";
import type { Poem } from "./poems-data";

function renderInline(line: string): ReactNode[] {
  return line.split(/(\*\*.*?\*\*)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export function getPoemParagraphs(poem: Poem) {
  const paragraphs = poem.body.trim().split(/\n{2,}/);
  return poem.firstParagraphIsSubtitle ? paragraphs.slice(1) : paragraphs;
}

export function getPoemSubtitle(poem: Poem) {
  if (!poem.firstParagraphIsSubtitle) return null;
  return poem.body.trim().split(/\n{2,}/)[0]?.replace(/^\*\*|\*\*$/g, "") ?? null;
}

export default function PoemText({ poem }: { poem: Poem }) {
  return (
    <div className="poem-text" lang={poem.language}>
      {getPoemParagraphs(poem).map((paragraph, paragraphIndex) => (
        <p className="poem-stanza" key={`${poem.slug}-${paragraphIndex}`}>
          {paragraph.split("\n").map((line, lineIndex) => (
            <span className="poem-line" key={`${line}-${lineIndex}`}>{renderInline(line)}</span>
          ))}
        </p>
      ))}
    </div>
  );
}
