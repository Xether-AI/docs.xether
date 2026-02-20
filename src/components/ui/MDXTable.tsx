import React from "react";
import { cn } from "@/lib/utils";

interface MDXTableProps {
  children: React.ReactNode;
  className?: string;
}

interface MDXTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MDXTableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface MDXTableRowProps {
  children: React.ReactNode;
  className?: string;
  isFirst?: boolean;
}

interface MDXTableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  isFirst?: boolean;
}

export function MDXTable({ children, className }: MDXTableProps) {
  return (
    <div className={`relative w-full overflow-auto rounded-lg border bg-background text-sm shadow-sm ${className || ''}`}>
      <table className={`w-full caption-bottom text-sm ${className || ''}`}>
        {children}
      </table>
    </div>
  );
}

export function MDXTableHeader({ children, className }: MDXTableHeaderProps) {
  return (
    <thead className={`[&_tr]:border-b ${className || ''}`}>
      {children}
    </thead>
  );
}

export function MDXTableBody({ children, className }: MDXTableBodyProps) {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className || ''}`}>
      {children}
    </tbody>
  );
}

export function MDXTableRow({ children, className, isFirst }: MDXTableRowProps) {
  return (
    <tr 
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${isFirst ? 'font-medium' : ''} ${className || ''}`}
      data-state={isFirst ? "selected" : undefined}
    >
      {children}
    </tr>
  );
}

export function MDXTableCell({ children, className, isHeader, isFirst }: MDXTableCellProps) {
  const Component = isHeader ? "th" : "td";
  
  return (
    <Component 
      className={`h-12 px-4 align-middle [&:has([role=checkbox])]:pr-0 ${isFirst ? 'font-medium text-foreground' : ''} ${className || ''}`}
      style={{
        borderBottomWidth: isHeader ? '2px' : '1px',
        borderColor: 'var(--border)',
      }}
    >
      {children}
    </Component>
  );
}

export function MDXTableHead({ children, className }: MDXTableCellProps) {
  return (
    <th 
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&[align=center]:text-center [&[align=right]:text-right] ${className || ''}`}
      style={{
        borderBottomWidth: '2px',
        borderColor: 'var(--border)',
      }}
    >
      {children}
    </th>
  );
}

export function MDXTableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={`mt-4 text-sm text-muted-foreground ${className || ''}`}
      {...props}
    />
  );
}
