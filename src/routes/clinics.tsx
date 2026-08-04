import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "Clinic Locations — eDentix" },
      { name: "description", content: "Four flagship clinics across Gujarat, with same-day emergency capacity." },
      { property: "og:title", content: "Clinic Locations — eDentix" },
      { property: "og:description", content: "Four flagship clinics across Gujarat, with same-day emergency capacity." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Clinic Locations" description="Four flagship clinics across Gujarat, with same-day emergency capacity." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
