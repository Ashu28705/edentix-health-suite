import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — eDentix" },
      { name: "description", content: "Clinical notes, technology deep-dives and clinic announcements." },
      { property: "og:title", content: "Journal — eDentix" },
      { property: "og:description", content: "Clinical notes, technology deep-dives and clinic announcements." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Journal" description="Clinical notes, technology deep-dives and clinic announcements." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
