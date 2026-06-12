"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ScrollReveal from "./ScrollReveal";
import styles from "./VideoGallery.module.css";
import { getVideos, fetchVideosFromFirebase, VideoItem } from "@/utils/projectDb";

export default function VideoGallery() {
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load cached/default immediately
    setVideoList(getVideos());
    // Fetch fresh list from Firebase
    fetchVideosFromFirebase().then((freshVideos) => {
      if (freshVideos && freshVideos.length > 0) {
        setVideoList(freshVideos);
      }
    });
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
  const row1Videos = videoList.filter((_, idx) => idx % 2 === 0);
  const row2Videos = videoList.filter((_, idx) => idx % 2 !== 0);

  // Duplicate arrays to allow seamless marquee loop
  const row1List = [...row1Videos, ...row1Videos];
  const row2List = [...row2Videos, ...row2Videos];

  return (
    <>
      <div className={styles.sliderContainer}>
        {/* Row 1 - scrolling left */}
        <div className={styles.row}>
          <div className={`${styles.track} ${styles.trackLeft}`}>
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
          <div className={`${styles.track} ${styles.trackRight}`}>
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
