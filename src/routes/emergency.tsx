import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Dental Care — eDentix" },
      { name: "description", content: "Reserved same-day slots, seven days a week." },
      { property: "og:title", content: "Emergency Dental Care — eDentix" },
      { property: "og:description", content: "Reserved same-day slots, seven days a week." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Emergency Dental Care" description="Reserved same-day slots, seven days a week." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
