import { AdminSectionPage } from "@/components/admin/admin-section-page";

export default function AdminMediaPage() {
  return (
    <AdminSectionPage
      title="Media Management"
      description="Upload and organize images for the website."
      instructions={[
        { step: "Upload an image", detail: "Send a POST request to /api/admin/media with form data: file (image), title, alt, and category. Accepts JPEG, PNG, and WebP up to 5MB." },
        { step: "Image requirements", detail: "Maximum file size: 5MB. Supported formats: JPEG, PNG, WebP. Images are validated for dimensions and type." },
        { step: "View uploaded media", detail: "All uploaded images are stored in /public/uploads/ and referenced in the database." },
        { step: "Use images in content", detail: "After uploading, copy the URL path and use it in blogs, achievements, or homepage sections." }
      ]}
    />
  );
}
