import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Doctor Directory — eDentix" },
      { name: "description", content: "Filter verified specialists by expertise, clinic, language and availability." },
      { property: "og:title", content: "Doctor Directory — eDentix" },
      { property: "og:description", content: "Filter verified specialists by expertise, clinic, language and availability." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Doctor Directory" description="Filter verified specialists by expertise, clinic, language and availability." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
