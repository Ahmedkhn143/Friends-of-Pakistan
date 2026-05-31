"use client";

import { useState } from "react";

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="form-card">
      <h3 className="form-title">Apply to Volunteer</h3>
      <p className="form-sub">Fill out the form and our team will contact you within 48 hours.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-input" type="text" placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input className="form-input" type="email" placeholder="you@example.com" required />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" type="tel" placeholder="+92 300 0000000" />
          </div>
          <div className="form-group">
            <label className="form-label">Your City</label>
            <input className="form-input" type="text" placeholder="Karachi, Lahore..." />
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Volunteer Role Preference</label>
          <select className="form-select" defaultValue="">
            <option value="" disabled>Select a role...</option>
            <option value="field">Field Volunteer</option>
            <option value="remote">Remote Support</option>
            <option value="tech">Technical Help</option>
            <option value="any">Any Role</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Why do you want to volunteer?</label>
          <textarea className="form-textarea" placeholder="Tell us about yourself and your motivation..."></textarea>
        </div>
        
        <button type="submit" className="btn btn-green" style={{ width: "100%", justifyContent: "center" }}>
          Submit Application
        </button>
        
        {submitted && (
          <div className="form-success show">
            ✅ Application submitted! We'll contact you within 48 hours. JazakAllah Khair!
          </div>
        )}
      </form>
    </div>
  );
}
