import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Project } from "@/data/projects";

export interface VideoItem {
  id: number;
  title: string;
  duration: string;
  img: string;
  videoUrl: string;
}

export interface ReviewItem {
  id: number;
  stars: string;
  quote: string;
  avatar: string;
  name: string;
  loc: string;
}

// Fallback lists
const defaultVideos: VideoItem[] = [
  { id: 1, title: "Flood Relief Operations — Sindh 2022", duration: "4:32", img: "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 2, title: "Building Homes in Swat Valley", duration: "6:15", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 3, title: "Clean Water for Tharparkar", duration: "3:48", img: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 4, title: "Rebuilding Lives: Post-Flood Housing", duration: "5:20", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 5, title: "Medical Camps in Remote Balochistan", duration: "4:10", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 6, title: "Ramadan Food Distribution Nationwide", duration: "3:05", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 7, title: "Girls Education in Southern Punjab", duration: "7:02", img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" },
  { id: 8, title: "Emergency Response: Cyclone Relief", duration: "3:55", img: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=800&q=80", videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4" }
];

const defaultReviews: ReviewItem[] = [
  { id: 1, stars: "★★★★★", quote: "I've donated to many organizations, but Friends of Pakistan is different. They send field photos within days. You can see exactly where your money goes.", avatar: "AK", name: "Ahmed Khan", loc: "Donor since 2022 · Lahore" },
  { id: 2, stars: "★★★★★", quote: "As a corporate partner, we needed full transparency and documented impact. Friends of Pakistan delivered quarterly reports with GPS-tagged photos. Exceptional.", avatar: "SR", name: "Sana Rehman", loc: "Corporate Partner · Karachi" },
  { id: 3, stars: "★★★★★", quote: "My monthly contribution of Rs 5,000 has funded two water pumps. I see real people drinking clean water because of it. This is what giving should feel like.", avatar: "MF", name: "Muhammad Farooq", loc: "Regular Donor · Islamabad" }
];

// Firebase credentials from console screenshot
const firebaseConfig = {
  apiKey: "AIzaSyAiHsbbeC12OD-2DyLynCvbHEQHJPRMhlg",
  authDomain: "friends-of-pakistan-1.firebaseapp.com",
  projectId: "friends-of-pakistan-1",
  storageBucket: "friends-of-pakistan-1.firebasestorage.app",
  messagingSenderId: "394322709045",
  appId: "1:1234567890:web:145bd2e24f16df69e5ff7c"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Force long-polling to bypass proxy/restricted network connection issues in development
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const storage = getStorage(app);
const projectsCollection = collection(db, "projects");
const videosCollection = collection(db, "videos");
const reviewsCollection = collection(db, "reviews");

let cachedProjects: Project[] = [];
let cachedVideos: VideoItem[] = [];
let cachedReviews: ReviewItem[] = [];

// ==================== PROJECTS API ====================
export async function fetchProjectsFromFirebase(): Promise<Project[]> {
  try {
    const querySnapshot = await getDocs(projectsCollection);
    const list: Project[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({ 
        id: Number(docSnap.id),
        title: data.title || "",
        category: data.category || "Housing",
        location: data.location || "",
        date: data.date || "",
        desc: data.desc || data.description || "",
        beneficiaries: Number(data.beneficiaries || 0),
        img: data.img || "https://picsum.photos/400/260",
        featured: data.featured || false,
        order: Number(data.order ?? docSnap.id)
      } as Project);
    });
    cachedProjects = list;
    return list;
  } catch (e) {
    console.error("Firebase fetch error:", e);
    return cachedProjects;
  }
}

export function getProjects(): Project[] {
  if (typeof window !== "undefined") {
    fetchProjectsFromFirebase();
  }
  return cachedProjects;
}

export async function saveProject(project: Omit<Project, "id"> & { id?: number; featured?: boolean; order?: number }) {
  const finalId = project.id || Date.now();
  const projectRef = doc(db, "projects", String(finalId));
  
  const payload = {
    ...project,
    id: finalId,
    featured: project.featured ?? false,
    order: project.order ?? finalId
  };

  await setDoc(projectRef, payload);
  await fetchProjectsFromFirebase();
  return payload as Project;
}

export async function deleteProject(id: number) {
  const projectRef = doc(db, "projects", String(id));
  await deleteDoc(projectRef);
  await fetchProjectsFromFirebase();
  return true;
}

// ==================== VIDEOS API ====================
export async function fetchVideosFromFirebase(): Promise<VideoItem[]> {
  try {
    const querySnapshot = await getDocs(videosCollection);
    const list: VideoItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: Number(docSnap.id),
        title: data.title || "",
        duration: data.duration || "5:00",
        img: data.img || "https://images.unsplash.com/photo-1469504512102-900f29606341?w=800&q=80",
        videoUrl: data.videoUrl || ""
      } as VideoItem);
    });
    if (list.length === 0) {
      cachedVideos = defaultVideos;
    } else {
      cachedVideos = list;
    }
    return cachedVideos;
  } catch (e) {
    console.error("Firebase fetch error:", e);
    return cachedVideos.length > 0 ? cachedVideos : defaultVideos;
  }
}

export function getVideos(): VideoItem[] {
  if (typeof window !== "undefined" && cachedVideos.length === 0) {
    fetchVideosFromFirebase();
  }
  return cachedVideos.length > 0 ? cachedVideos : defaultVideos;
}

export async function saveVideo(video: Omit<VideoItem, "id"> & { id?: number }) {
  const finalId = video.id || Date.now();
  const videoRef = doc(db, "videos", String(finalId));
  
  const payload = {
    ...video,
    id: finalId
  };

  await setDoc(videoRef, payload);
  await fetchVideosFromFirebase();
  return payload as VideoItem;
}

export async function deleteVideo(id: number) {
  const videoRef = doc(db, "videos", String(id));
  await deleteDoc(videoRef);
  await fetchVideosFromFirebase();
  return true;
}

// ==================== REVIEWS API ====================
export async function fetchReviewsFromFirebase(): Promise<ReviewItem[]> {
  try {
    const querySnapshot = await getDocs(reviewsCollection);
    const list: ReviewItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: Number(docSnap.id),
        stars: data.stars || "★★★★★",
        quote: data.quote || "",
        avatar: data.avatar || "AK",
        name: data.name || "",
        loc: data.loc || ""
      } as ReviewItem);
    });
    if (list.length === 0) {
      cachedReviews = defaultReviews;
    } else {
      cachedReviews = list;
    }
    return cachedReviews;
  } catch (e) {
    console.error("Firebase fetch error:", e);
    return cachedReviews.length > 0 ? cachedReviews : defaultReviews;
  }
}

export function getReviews(): ReviewItem[] {
  if (typeof window !== "undefined" && cachedReviews.length === 0) {
    fetchReviewsFromFirebase();
  }
  return cachedReviews.length > 0 ? cachedReviews : defaultReviews;
}

export async function saveReview(review: Omit<ReviewItem, "id"> & { id?: number }) {
  const finalId = review.id || Date.now();
  const reviewRef = doc(db, "reviews", String(finalId));
  
  const payload = {
    ...review,
    id: finalId
  };

  await setDoc(reviewRef, payload);
  await fetchReviewsFromFirebase();
  return payload as ReviewItem;
}

export async function deleteReview(id: number) {
  const reviewRef = doc(db, "reviews", String(id));
  await deleteDoc(reviewRef);
  await fetchReviewsFromFirebase();
  return true;
}

// ==================== STORAGE UPLOAD ====================
export async function uploadProjectImage(file: File): Promise<string> {
  const fileRef = ref(storage, `project_images/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return getDownloadURL(fileRef);
}
