import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import ScrollReveal from "@/components/ScrollReveal";
import VideoGallery from "@/components/VideoGallery";

export default function MediaPage() {
  return (
    <>
      <PageHero 
        title="Media & Gallery" 
        subtitle="Moments from the field — real people, real projects, real impact."
        breadcrumbLabel="Media"
      />

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <SectionHeading 
            tag="Watch Our Stories" 
            title="Watch Our Stories" 
            subtitle="Video documentaries from our projects across Pakistan"
            align="center"
          />
          <VideoGallery />
        </div>
      </section>

      <section className="section" style={{ background: "var(--cream-dark)", paddingTop: "64px" }}>
        <div className="container">
          <SectionHeading tag="Photo gallery" title="From the Field" />
          <Gallery />
        </div>
      </section>

    </>
  );
}
