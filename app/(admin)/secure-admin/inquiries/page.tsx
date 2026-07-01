import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminInquiriesPage() {
  return (
    <AdminSectionPage
      title="Inquiries Management"
      description="Review and manage parent inquiries submitted through the contact form."
      instructions={[
        { step: "Inquiries submitted via website", detail: "Parents fill the contact form on the website, which sends inquiries to the database automatically." },
        { step: "View inquiries", detail: "Inquiries are stored in the database with name, phone, email, and message fields you can query via Prisma." },
        { step: "Track read status", detail: "Each inquiry has a 'read' boolean field you can update to track which ones you've reviewed." },
        { step: "Respond to parents", detail: "Use the phone or email from the inquiry to contact the parent directly." }
      ]}
    />
  );
}
