export const dynamic = "force-dynamic";

export default function AdminRootPlaceholderPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm shadow-black/5">
        <h1 className="text-3xl font-medium tracking-tight">Admin access granted</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The protected admin route foundation is active. The dashboard shell and module
          navigation will be layered on top in the next commit.
        </p>
      </div>
    </main>
  );
}
