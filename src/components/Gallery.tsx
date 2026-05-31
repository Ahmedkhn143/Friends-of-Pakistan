"use client";

import { useState } from "react";
import { galleryImgs } from "@/data/gallery";

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

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
    let newIndex = (lbIndex + direction + galleryImgs.length) % galleryImgs.length;
    setLbIndex(newIndex);
  };

  return (
    <>
      <div className="gallery-grid" id="galleryGrid">
        {galleryImgs.map((src, i) => (
          <div key={i} className="gallery-item" onClick={() => openLightbox(i)}>
            <img src={src} alt={`Gallery image ${i + 1}`} loading="lazy" />
            <div className="gallery-overlay">🔍</div>
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
        {lightboxOpen && (
          <img 
            id="lbImg" 
            className="lb-img" 
            src={galleryImgs[lbIndex]} 
            alt="Gallery item" 
            onClick={(e) => e.stopPropagation()}
          />
        )}
        <button className="lb-nav lb-next" onClick={(e) => navigateLb(1, e)}>›</button>
      </div>
    </>
  );
}
