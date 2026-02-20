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
    <div className="my-4 w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn("w-full text-sm border-collapse", className)}>
        {children}
      </table>
    </div>
  );
}

export function MDXTableHeader({ children, className }: MDXTableHeaderProps) {
  return (
    <thead className={cn("border-b border-border bg-muted", className)}>
      {children}
    </thead>
  );
}

export function MDXTableBody({ children, className }: MDXTableBodyProps) {
  return (
    <tbody className={cn("[&_tr:last-child]:border-0 [&_tr:hover]:bg-muted/50 [&_tr]:transition-colors [&_tr]:border-b", className)}>
      {children}
    </tbody>
  );
}

export function MDXTableRow({ children, className, isFirst }: MDXTableRowProps) {
  return (
    <tr className={cn(
      "border-b border-border transition-colors hover:bg-muted/50",
      isFirst && "font-medium text-primary bg-muted/50",
      className
    )}>
      {children}
    </tr>
  );
}

export function MDXTableCell({ children, className, isHeader, isFirst }: MDXTableCellProps) {
  const Component = isHeader ? "th" : "td";
  
  return (
    <Component 
      className={cn(
        "px-4 py-3 align-middle",
        isFirst && "font-medium text-primary bg-muted/50",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function MDXTableHead({ children, className }: MDXTableCellProps) {
  return (
    <th className={cn(
      "px-4 py-3 text-left font-semibold bg-muted",
      className
    )}>
      {children}
    </th>
  );
}
