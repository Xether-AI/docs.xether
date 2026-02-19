import { DocsLayout } from "@/components/layout/DocsLayout";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function VersionedDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <DocsLayout>{children}</DocsLayout>
    </div>
  );
}
