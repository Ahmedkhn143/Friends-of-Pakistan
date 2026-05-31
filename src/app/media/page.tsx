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

      <section className="section" style={{ background: "var(--cream-dark)" }}>
        <div className="container">
          <SectionHeading tag="News coverage" title="In the News" />
          
          <div className="projects-grid">
            <ScrollReveal className="project-card">
              <div className="project-card-body">
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "8px" }}>
                  Dawn News · August 2022
                </div>
                <h4 className="project-title">Friends of Pakistan houses 200 flood victims in record 60 days</h4>
                <p className="project-desc">The Karachi-based NGO became one of the fastest responders to the 2022 floods, with on-ground presence within 48 hours of disaster declaration.</p>
                <Link href="#" className="cause-link">Read article →</Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={1} className="project-card">
              <div className="project-card-body">
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "8px" }}>
                  Geo News · March 2023
                </div>
                <h4 className="project-title">Clean water initiative reaches 15,000 people in Balochistan</h4>
                <p className="project-desc">Friends of Pakistan's rural water program installs 100th hand pump, crossing a milestone that took just 8 months from program launch.</p>
                <Link href="#" className="cause-link">Read article →</Link>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={2} className="project-card">
              <div className="project-card-body">
                <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--gold)", textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "8px" }}>
                  ARY News · January 2025
                </div>
                <h4 className="project-title">From 12 people to 1,000+ projects: The FoP story</h4>
                <p className="project-desc">A documentary feature on how Friends of Pakistan grew from a WhatsApp group to one of Pakistan's most impactful grassroots humanitarian foundations.</p>
                <Link href="#" className="cause-link">Read article →</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
