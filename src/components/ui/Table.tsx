"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  isHeader?: boolean;
  isFirst?: boolean;
}

export function Table({ className, children, ...props }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table
        className={cn(
          "w-full border-collapse bg-background",
          "text-sm",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "border-b border-border bg-muted",
        "[&_tr]:border-b",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody
      className={cn(
        "[&_tr:last-child]:border-0",
        "[&_tr:hover]:bg-muted/50",
        "[&_tr]:transition-colors",
        "[&_tr]:border-b",
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableCell({ 
  className, 
  children, 
  isHeader = false, 
  isFirst = false, 
  ...props 
}: TableCellProps) {
  const Component = isHeader ? "th" : "td";
  
  return (
    <Component
      className={cn(
        "px-4 py-3 align-middle",
        isFirst && "font-medium text-primary bg-muted/50",
        "[&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function TableHead({ className, children, ...props }: TableCellProps) {
  return (
    <TableCell
      isHeader={true}
      className={cn(
        "font-semibold text-foreground bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </TableCell>
  );
}

export function TableCaption({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement>) {
  return (
    <caption
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}
