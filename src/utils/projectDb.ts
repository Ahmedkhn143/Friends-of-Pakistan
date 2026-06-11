import { Project, projects, extraProjects } from "@/data/projects";

const STORAGE_KEY = "fop_projects_db";

// Helper to check if code is running in the browser
const isClient = typeof window !== "undefined";

export function getProjects(): Project[] {
  if (!isClient) {
    return [...projects, ...extraProjects];
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with static projects data
    const initialList = [...projects, ...extraProjects].map((p, index) => ({
      ...p,
      featured: index < 6, // Default first 6 projects as featured
      order: p.id,        // Default order
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
    return initialList;
  }

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored projects", e);
    return [...projects, ...extraProjects];
  }
}

export function saveProject(project: Omit<Project, "id"> & { id?: number; featured?: boolean; order?: number }): Project {
  if (!isClient) return project as Project;

  const currentList = getProjects();
  let updatedProject: Project;

  if (project.id) {
    // Edit existing project
    currentList.forEach((p, idx) => {
      if (p.id === project.id) {
        currentList[idx] = { ...p, ...project } as Project;
        updatedProject = currentList[idx];
      }
    });
  } else {
    // Add new project
    const nextId = currentList.length > 0 ? Math.max(...currentList.map(p => p.id)) + 1 : 1;
    updatedProject = {
      ...project,
      id: nextId,
      featured: project.featured ?? false,
      order: project.order ?? nextId,
    } as Project;
    currentList.push(updatedProject);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentList));
  return updatedProject!;
}

export function deleteProject(id: number): boolean {
  if (!isClient) return false;

  const currentList = getProjects();
  const filteredList = currentList.filter(p => p.id !== id);

  if (filteredList.length !== currentList.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredList));
    return true;
  }
  return false;
}
