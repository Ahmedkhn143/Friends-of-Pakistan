import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import VolunteerForm from "@/components/VolunteerForm";

export default function VolunteerPage() {
  return (
    <>
      <PageHero 
        title="Volunteer With Us" 
        subtitle="Your time and skills can change lives across Pakistan."
        breadcrumbLabel="Volunteer"
      />

      <section className="section">
        <div className="container">
          <div className="volunteer-grid">
            <div>
              <SectionHeading tag="How you can help" title="Find Your Role" />
              
              <div className="volunteer-roles">
                <ScrollReveal className="role-card">
                  <h4 className="role-title">🏕️ Field Volunteer</h4>
                  <p className="role-desc">Join our ground teams for project delivery, community assessment, and emergency response operations across Pakistan.</p>
                  <ul className="role-reqs">
                    <li>Available for weekend deployments</li>
                    <li>Based in or willing to travel to project areas</li>
                    <li>Good physical fitness</li>
                  </ul>
                </ScrollReveal>
                
                <ScrollReveal delay={1} className="role-card">
                  <h4 className="role-title">💻 Remote Support</h4>
                  <p className="role-desc">Help from anywhere — assist with social media, donor communication, data entry, and project documentation remotely.</p>
                  <ul className="role-reqs">
                    <li>Minimum 5 hours/week commitment</li>
                    <li>Good written Urdu or English skills</li>
                    <li>Reliable internet connection</li>
                  </ul>
                </ScrollReveal>
                
                <ScrollReveal delay={2} className="role-card">
                  <h4 className="role-title">⚙️ Technical Help</h4>
                  <p className="role-desc">Are you a developer, designer, accountant, or engineer? We need your specific skills to build our systems and infrastructure.</p>
                  <ul className="role-reqs">
                    <li>Professional skill in relevant domain</li>
                    <li>Project-based or ongoing commitment</li>
                    <li>References may be required</li>
                  </ul>
                </ScrollReveal>
              </div>
            </div>
            
            <ScrollReveal delay={1}>
              <VolunteerForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
