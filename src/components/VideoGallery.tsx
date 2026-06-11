"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ScrollReveal from "./ScrollReveal";
import styles from "./VideoGallery.module.css";

interface VideoItem {
  id: number;
  title: string;
  duration: string;
  img: string;
  videoUrl: string;
}

// 8 High-Quality Realistic Video Documentaries
const videos: VideoItem[] = [
  {
    id: 1,
    title: "Flood Relief Operations — Sindh 2022",
    duration: "4:32",
    img: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 2,
    title: "Building Homes in Swat Valley",
    duration: "6:15",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 3,
    title: "Clean Water for Tharparkar",
    duration: "3:48",
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 4,
    title: "Rebuilding Lives: Post-Flood Housing",
    duration: "5:20",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 5,
    title: "Medical Camps in Remote Balochistan",
    duration: "4:10",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 6,
    title: "Ramadan Food Distribution Nationwide",
    duration: "3:05",
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 7,
    title: "Girls Education in Southern Punjab",
    duration: "7:02",
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: 8,
    title: "Emergency Response: Cyclone Relief",
    duration: "3:55",
    img: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=800&q=80",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  }
];

export default function VideoGallery() {
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeVideoUrl) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeVideoUrl]);

  // Split videos into two separate lists for the dual rows
  const row1Videos = videos.filter((_, idx) => idx % 2 === 0);
  const row2Videos = videos.filter((_, idx) => idx % 2 !== 0);

  // Duplicate arrays to allow seamless marquee loop
  const row1List = [...row1Videos, ...row1Videos];
  const row2List = [...row2Videos, ...row2Videos];

  return (
    <>
      <div className={styles.sliderContainer}>
        {/* Row 1 - scrolling left */}
        <div className={styles.row}>
          <div className={styles.trackLeft}>
            {row1List.map((video, idx) => (
              <div 
                key={`row1-${video.id}-${idx}`} 
                className={styles.videoCard}
                onClick={() => setActiveVideoUrl(video.videoUrl)}
              >
                <div className={styles.thumbnailWrap}>
                  <img src={video.img} alt={video.title} className={styles.img} loading="lazy" />
                  <div className={styles.playBtn}>
                    <svg viewBox="0 0 24 24" className={styles.playIcon}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className={styles.duration}>{video.duration}</span>
                </div>
                <h3 className={styles.title}>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className={styles.row}>
          <div className={styles.trackRight}>
            {row2List.map((video, idx) => (
              <div 
                key={`row2-${video.id}-${idx}`} 
                className={styles.videoCard}
                onClick={() => setActiveVideoUrl(video.videoUrl)}
              >
                <div className={styles.thumbnailWrap}>
                  <img src={video.img} alt={video.title} className={styles.img} loading="lazy" />
                  <div className={styles.playBtn}>
                    <svg viewBox="0 0 24 24" className={styles.playIcon}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className={styles.duration}>{video.duration}</span>
                </div>
                <h3 className={styles.title}>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render Video Player Modal dynamically inside document body via Portal */}
      {activeVideoUrl && mounted && createPortal(
        <div 
          className={styles.modalOverlay}
          onClick={() => setActiveVideoUrl(null)}
        >
          <div 
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className={styles.closeBtn}
              onClick={() => setActiveVideoUrl(null)}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%"
              src={activeVideoUrl}
              title="Project Documentary"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
