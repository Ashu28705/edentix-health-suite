import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/fx/primitives";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — eDentix" },
      { name: "description", content: "Clinics, staff, roles, billing and analytics." },
      { property: "og:title", content: "Admin Panel — eDentix" },
      { property: "og:description", content: "Clinics, staff, roles, billing and analytics." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-36 sm:px-6">
      <SectionHeading eyebrow="eDentix" title="Admin Panel" description="Clinics, staff, roles, billing and analytics." align="left" />
      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        This section is being built out next in the eDentix platform.
      </p>
    </div>
  );
}
