"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="form-card">
      <h3 className="form-title">Send a Message</h3>
      <p className="form-sub">We respond to all inquiries within 24 hours.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" type="text" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input className="form-input" type="email" placeholder="you@email.com" required />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Subject</label>
          <select className="form-select" defaultValue="general">
            <option value="general">General Inquiry</option>
            <option value="donation">Donation Inquiry</option>
            <option value="partnership">Partnership</option>
            <option value="volunteer">Volunteer</option>
            <option value="media">Media / Press</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Message *</label>
          <textarea className="form-textarea" placeholder="Write your message here..." required></textarea>
        </div>
        
        <button type="submit" className="btn btn-green" style={{ width: "100%", justifyContent: "center" }}>
          Send Message
        </button>
        
        {submitted && (
          <div className="form-success show">
            ✅ Message sent successfully! We'll get back to you within 24 hours.
          </div>
        )}
      </form>
    </div>
  );
}
