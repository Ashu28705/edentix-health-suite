import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — eDentix" },
      { name: "description", content: "Live calendars, instant confirmation, no double-booking." },
      { property: "og:title", content: "Book an Appointment — eDentix" },
      { property: "og:description", content: "Live calendars, instant confirmation, no double-booking." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Book an Appointment" description="Live calendars, instant confirmation, no double-booking." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
