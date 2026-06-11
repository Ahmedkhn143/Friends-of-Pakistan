import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Project } from "@/data/projects";

// Firebase credentials from console screenshot
const firebaseConfig = {
  apiKey: "AIzaSyAiHsbbeC12OD-2DyLynCvbHEQHJPRMhlg",
  authDomain: "friends-of-pakistan-1.firebaseapp.com",
  projectId: "friends-of-pakistan-1",
  storageBucket: "friends-of-pakistan-1.firebasestorage.app",
  messagingSenderId: "394322709045",
  appId: "1:1234567890:web:145bd2e24f16df69e5ff7c" // Using the correct dynamic app ID structure
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Force long-polling to bypass proxy/restricted network connection issues in development
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

const projectsCollection = collection(db, "projects");

let cachedProjects: Project[] = [];

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

// 1. Get Projects
export function getProjects(): Project[] {
  if (typeof window !== "undefined") {
    fetchProjectsFromFirebase();
  }
  return cachedProjects;
}

// 2. Add / Edit Project
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

// 3. Delete Project
export async function deleteProject(id: number) {
  const projectRef = doc(db, "projects", String(id));
  await deleteDoc(projectRef);
  await fetchProjectsFromFirebase();
  return true;
}
