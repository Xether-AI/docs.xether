import { SiteHeader } from "@/components/layout/SiteHeader";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Xether <span className="text-primary italic">AI</span> Docs
        </h1>
        <p className="max-w-2xl text-xl text-muted-foreground mb-10 leading-relaxed">
          The comprehensive developer documentation for building powerful data
          pipelines and managing AI-ready datasets with Xether AI.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/docs/getting-started/introduction"
            className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-all text-lg"
          >
            Read Documentation
          </Link>
          <Link
            href="/api"
            className="px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-accent/20 transition-all text-lg border border-border"
          >
            API Reference
          </Link>
        </div>
      </main>
      <footer className="py-6 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Xether AI. Built for the future of data.
      </footer>
    </div>
  );
}
