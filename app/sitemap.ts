import type { MetadataRoute } from "next";
import { navItems, seedBlogs } from "@/lib/school-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://skalvi.com";
  return [
    ...navItems.map((item) => ({ url: `${base}${item.href}`, lastModified: new Date() })),
    ...seedBlogs.map((blog) => ({ url: `${base}/blogs/${blog.slug}`, lastModified: new Date() }))
  ];
}
