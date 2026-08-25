import React, { useEffect } from "react";
import { usePortfolioData } from "../context/PortfolioContext";
import { resolveImagePath } from "../utils/imageCompressor";

/**
 * Dynamic SEO Component for Head Meta Tags, OpenGraph, Twitter Cards, and JSON-LD Structured Data
 */
const SEO = ({ title, description, keywords, image, url, type = "website" }) => {
  const { siteSettings } = usePortfolioData();
  const seo = siteSettings?.seoSettings || {};

  const siteTitle = title || seo.metaTitle || `${siteSettings?.name || "Nongsaibam Tazkhan"} | ${siteSettings?.title || "Full Stack & AI Developer"}`;
  const siteDescription = description || seo.metaDescription || siteSettings?.bio || "Explore full stack web apps, AI projects, certifications, and experience.";
  const siteKeywords = keywords || seo.metaKeywords || "Full Stack Developer, React, Node.js, Python, AI Developer, Portfolio";
  const siteAuthor = seo.authorName || siteSettings?.name || "Nongsaibam Tazkhan";
  const siteUrl = url || seo.siteUrl || (typeof window !== "undefined" ? window.location.href : "https://tazkhan.dev");
  const rawImage = image || seo.ogImage || siteSettings?.profileImage || "/vite.svg";
  const siteImage = resolveImagePath(rawImage);

  useEffect(() => {
    // 1. Update Document Title
    document.title = siteTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (nameAttr, nameValue, contentValue) => {
      let element = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, nameValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue || "");
    };

    // 2. Standard Meta Tags
    updateMetaTag("name", "description", siteDescription);
    updateMetaTag("name", "keywords", siteKeywords);
    updateMetaTag("name", "author", siteAuthor);
    updateMetaTag("name", "viewport", "width=device-width, initial-scale=1.0");

    if (seo.allowIndexing === false) {
      updateMetaTag("name", "robots", "noindex, nofollow");
    } else {
      updateMetaTag("name", "robots", "index, follow");
    }

    // 3. Open Graph (OG) Meta Tags
    updateMetaTag("property", "og:title", siteTitle);
    updateMetaTag("property", "og:description", siteDescription);
    updateMetaTag("property", "og:image", siteImage);
    updateMetaTag("property", "og:url", siteUrl);
    updateMetaTag("property", "og:type", type);
    updateMetaTag("property", "og:site_name", `${siteAuthor} Portfolio`);

    // 4. Twitter Card Meta Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", siteTitle);
    updateMetaTag("name", "twitter:description", siteDescription);
    updateMetaTag("name", "twitter:image", siteImage);

    // 5. Canonical Link
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", siteUrl);

    // 6. JSON-LD Structured Data (Schema.org Person)
    let jsonLdScript = document.querySelector("script[type='application/ld+json']");
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdScript);
    }

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": siteAuthor,
      "jobTitle": siteSettings?.title || "Full Stack Developer & AI Engineer",
      "url": siteUrl,
      "image": siteImage,
      "email": siteSettings?.email || "nongsaibamtazkhan@gmail.com",
      "sameAs": [
        siteSettings?.githubLink,
        siteSettings?.linkedinLink,
        siteSettings?.twitterLink,
      ].filter(Boolean),
    };

    jsonLdScript.textContent = JSON.stringify(personSchema);

    // 7. Dynamic Favicon Link Tag Update (Real-time Admin Favicon Controller)
    const rawFavicon = siteSettings?.faviconImage || seo?.faviconImage || "/favicon.png";
    const siteFavicon = resolveImagePath(rawFavicon, "/favicon.png");

    const updateFaviconLink = (relType) => {
      let link = document.querySelector(`link[rel="${relType}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", relType);
        document.head.appendChild(link);
      }
      link.setAttribute("href", siteFavicon);
    };

    updateFaviconLink("icon");
    updateFaviconLink("shortcut icon");
    updateFaviconLink("apple-touch-icon");
  }, [siteTitle, siteDescription, siteKeywords, siteAuthor, siteUrl, siteImage, siteSettings?.faviconImage, seo?.faviconImage, type, seo.allowIndexing]);

  return null;
};

export default SEO;
