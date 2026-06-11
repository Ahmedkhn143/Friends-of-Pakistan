"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { galleryImgs } from "@/data/gallery";
import { getProjects, fetchProjectsFromFirebase } from "@/utils/projectDb";
import { Project } from "@/data/projects";

interface GalleryItem {
  src: string;
  projectId?: number;
  projectTitle?: string;
  isStatic?: boolean;
}

export default function Gallery() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  useEffect(() => {
    // 1. Static images from gallery.ts
    const staticItems: GalleryItem[] = galleryImgs.map((src) => ({
      src,
      isStatic: true,
    }));

    // 2. Update gallery helper
    const updateGallery = (projectsList: Project[]) => {
      const projectItems: GalleryItem[] = projectsList.map((p) => ({
        src: p.img,
        projectId: p.id,
        projectTitle: p.title,
        isStatic: false,
      }));
      // Combine: Projects first, then static images
      setItems([...projectItems, ...staticItems]);
    };

    // Load initial cached projects
    updateGallery(getProjects());

    // Fetch fresh database items
    fetchProjectsFromFirebase().then((fresh) => {
      if (fresh && fresh.length > 0) {
        updateGallery(fresh);
      }
    });
  }, []);

  const handleItemClick = (item: GalleryItem, index: number) => {
    if (!item.isStatic && item.projectTitle) {
      // Redirect to projects page and automatically search/filter this project
      router.push(`/projects?search=${encodeURIComponent(item.projectTitle)}`);
    } else {
      // Open standard lightbox for static images
      openLightbox(index);
    }
  };

  const openLightbox = (index: number) => {
    setLbIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLb = (direction: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let newIndex = (lbIndex + direction + items.length) % items.length;
    setLbIndex(newIndex);
  };

  return (
    <>
      <div className="gallery-grid" id="galleryGrid">
        {items.map((item, i) => (
          <div 
            key={i} 
            className="gallery-item" 
            onClick={() => handleItemClick(item, i)}
            style={{ cursor: "pointer" }}
            title={item.isStatic ? "Zoom Image" : `View Project: ${item.projectTitle}`}
          >
            <img src={item.src} alt={item.projectTitle || `Gallery image ${i + 1}`} loading="lazy" />
            <div className="gallery-overlay">
              {item.isStatic ? "🔍" : "🔗"}
            </div>
            {!item.isStatic && (
              <div 
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(6, 78, 59, 0.9)",
                  color: "white",
                  padding: "8px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  zIndex: 2,
                }}
              >
                🇵🇰 {item.projectTitle}
              </div>
            )}
          </div>
        ))}
      </div>

      <div 
        id="lightbox" 
        className={lightboxOpen ? "open" : ""} 
        onClick={closeLightbox}
      >
        <button className="lb-close" onClick={closeLightbox}>×</button>
        <button className="lb-nav lb-prev" onClick={(e) => navigateLb(-1, e)}>‹</button>
        {lightboxOpen && items[lbIndex] && (
          <img 
            id="lbImg" 
            className="lb-img" 
            src={items[lbIndex].src} 
            alt="Gallery item" 
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <button className="lb-nav lb-next" onClick={(e) => navigateLb(1, e)}>›</button>
      </div>
    </>
  );
}
