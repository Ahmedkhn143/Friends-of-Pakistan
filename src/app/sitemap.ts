import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://friendsofpakistan.vercel.app";
  
  const routes = [
    "",
    "/about",
    "/projects",
    "/impact",
    "/media",
    "/partners",
    "/volunteer",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/projects" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/projects" ? 0.9 : 0.8,
  }));
}
