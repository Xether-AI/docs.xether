import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/Callout";
import { Card, Cards } from "@/components/ui/Card";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableHead, 
  TableCaption 
} from "@/components/ui/Table";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components available in all MDX files
    Callout,
    Card,
    Cards,
    CodeBlock,

    // Override default HTML elements for consistent styling
    h1: ({ children, ...props }) => (
      <h1
        className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
        style={{ color: "var(--foreground)" }}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, id, ...props }) => (
      <h2
        id={id}
        className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
        style={{ color: "var(--foreground)", borderColor: "var(--border)" }}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3
        id={id}
        className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
        style={{ color: "var(--foreground)" }}
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="leading-7 not-first:mt-4"
        style={{ color: "var(--foreground)" }}
        {...props}
      >
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="font-medium underline underline-offset-4 transition-colors"
        style={{ color: "var(--primary)" }}
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 list-disc space-y-1.5" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 list-decimal space-y-1.5" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        className="leading-7"
        style={{ color: "var(--foreground)" }}
        {...props}
      >
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mt-4 border-l-4 pl-4 italic"
        style={{
          borderColor: "var(--primary)",
          color: "var(--muted-foreground)",
        }}
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      // Inline code (no className means it's inline)
      if (!className) {
        return (
          <code
            className="relative rounded px-1.5 py-0.5 font-mono text-sm"
            style={{
              background: "rgba(120,252,214,0.08)",
              color: "var(--primary)",
            }}
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="my-4 overflow-x-auto rounded-lg p-4 text-sm leading-relaxed"
        style={{
          background: "rgba(0,0,0,0.35)",
          border: "1px solid var(--border)",
        }}
        {...props}
      >
        {children}
      </pre>
    ),
    table: ({ children, ...props }) => (
      <div className="my-4 w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="border-b border-border bg-muted" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="[&_tr:last-child]:border-0 [&_tr:hover]:bg-muted/50 [&_tr]:transition-colors [&_tr]:border-b" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="border-b border-border transition-colors hover:bg-muted/50" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th className="px-4 py-3 text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 [&:has([role=checkbox])]:pr-0" {...props}>
        {children}
      </td>
    ),
    hr: (props) => (
      <hr
        className="my-8"
        style={{ borderColor: "var(--border)" }}
        {...props}
      />
    ),
    ...components,
  };
}
