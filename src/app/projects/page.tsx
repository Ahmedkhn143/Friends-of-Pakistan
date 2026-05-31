import PageHero from "@/components/PageHero";
import ProjectFilter from "@/components/ProjectFilter";

export default function ProjectsPage() {
  return (
    <>
      <PageHero 
        title="Our Projects" 
        subtitle="1,000+ projects completed across Pakistan since 2021."
        breadcrumbLabel="Projects"
      />

      <section className="section projects-bg">
        <div className="container">
          <ProjectFilter />
        </div>
      </section>
    </>
  );
}
