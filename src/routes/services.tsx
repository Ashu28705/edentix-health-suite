import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — eDentix" },
      { name: "description", content: "Every treatment eDentix offers, with transparent price bands." },
      { property: "og:title", content: "Services — eDentix" },
      { property: "og:description", content: "Every treatment eDentix offers, with transparent price bands." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Services" description="Every treatment eDentix offers, with transparent price bands." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
