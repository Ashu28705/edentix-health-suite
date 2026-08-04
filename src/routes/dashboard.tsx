import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Patient Dashboard — eDentix" },
      { name: "description", content: "Appointments, records, prescriptions and invoices in one place." },
      { property: "og:title", content: "Patient Dashboard — eDentix" },
      { property: "og:description", content: "Appointments, records, prescriptions and invoices in one place." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Patient Dashboard" description="Appointments, records, prescriptions and invoices in one place." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
