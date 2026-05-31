import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="We'd love to hear from you — donors, volunteers, partners, or press."
        breadcrumbLabel="Contact"
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal className="contact-info">
              <SectionHeading tag="Get in touch" title={<>We're Here<br />to Connect</>} />
              
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">info@friendsofpakistan.org<br />donors@friendsofpakistan.org</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <div className="contact-label">Phone / WhatsApp</div>
                  <div className="contact-value">+92 300 1234567<br />+92 321 9876543</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <div className="contact-label">Main Office</div>
                  <div className="contact-value">Block 7, Clifton<br />Karachi, Sindh, Pakistan</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div>
                  <div className="contact-label">Office Hours</div>
                  <div className="contact-value">Mon – Sat: 9:00 AM – 6:00 PM<br />Sunday: Closed</div>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-label" style={{ marginBottom: "12px" }}>Follow Us</div>
              </div>
              
              <div className="social-links">
                <a className="social-btn" href="https://www.linkedin.com/company/friends-of-pakistan" target="_blank" rel="noopener noreferrer" title="LinkedIn">in</a>
                <a className="social-btn" href="#" title="Facebook">f</a>
                <a className="social-btn" href="#" title="Instagram">ig</a>
                <a className="social-btn" href="#" title="WhatsApp">wa</a>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={1}>
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
