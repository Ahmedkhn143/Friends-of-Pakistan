import ScrollReveal from "./ScrollReveal";
import styles from "./VideoGallery.module.css";

const videos = [
  {
    id: 1,
    title: "Flood Relief Operations — Sindh 2022",
    duration: "4:32",
    img: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80",
  },
  {
    id: 2,
    title: "Building Homes in Swat Valley",
    duration: "6:15",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
  {
    id: 3,
    title: "Clean Water for Tharparkar",
    duration: "3:48",
    img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
  }
];

export default function VideoGallery() {
  return (
    <div className={styles.videoGrid}>
      {videos.map((video, i) => (
        <ScrollReveal key={video.id} delay={i % 3}>
          <div className={styles.videoCard}>
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
        </ScrollReveal>
      ))}
    </div>
  );
}
