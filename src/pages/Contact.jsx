import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { submitFormToEmail } from '../services/emailService';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Pre-Approval Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitFormToEmail('Contact Page Inquiry', formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to deliver message. Please try again or call us directly.');
    }
  };


  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>GET IN TOUCH</span>
          <h1>Contact Our Office</h1>
          <p>We are available to answer your calls and schedule face-to-face rate consultations. Drop by our Mississauga office or send a direct inquiry.</p>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section className="section bg-light" style={{ paddingBottom: '30px' }}>
        <div className="container">
          <div className="grid-4">
            <div className="card" style={{ padding: '24px', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%', marginBottom: '16px' }}><MapPin size={22} /></div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Office Address</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: 0 }}>
                6685 Tomken Rd Unit 208,<br />Mississauga, ON L5T 2C5
              </p>
            </div>

            <div className="card" style={{ padding: '24px', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%', marginBottom: '16px' }}><Phone size={22} /></div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Phone Number</h3>
              <a href="tel:6472227071" style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>
                647-222-7071
              </a>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', margin: 0 }}>Toll-Free & WhatsApp Enabled</p>
            </div>

            <div className="card" style={{ padding: '24px', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%', marginBottom: '16px' }}><Mail size={22} /></div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Email Address</h3>
              <a href="mailto:info@mortgageswithmanpreet.com" style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>
                info@mortgageswithmanpreet.com
              </a>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '4px', margin: 0 }}>Response within 1 business hour</p>
            </div>

            <div className="card" style={{ padding: '24px', textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%', marginBottom: '16px' }}><Clock size={22} /></div>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Office Hours</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: 0 }}>
                Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'stretch' }}>

          {/* Map column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h2 className="serif-font" style={{ fontSize: '26px', textAlign: 'left' }}>Mississauga Location Map</h2>

            <div className="map-container" style={{ flexGrow: 1, minHeight: '350px' }}>
              <div className="map-placeholder">
                <MapPin size={48} />
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '18px' }}>Manpreet Singh - Level 2 Mortgage Office</h4>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>6685 Tomken Rd Unit 208, Mississauga, ON L5T 2C5</p>
                <a
                  href="https://maps.google.com/?q=6685+Tomken+Rd+Unit+208,+Mississauga,+ON+L5T+2C5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="card" style={{ padding: '40px' }}>
            <h2 className="serif-font" style={{ fontSize: '26px', marginBottom: '24px', textAlign: 'left' }}>Send Us a Message</h2>

            {submitted ? (
              <div className="success-banner" style={{ margin: 0, padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--success)' }}>Message Dispatched!</h4>
                <p style={{ color: 'var(--text-dark)', fontWeight: 'normal', fontSize: '14.5px' }}>
                  Thank you, <strong>{formData.fullName}</strong>. Your message regarding <em>{formData.subject}</em> has been securely sent. Manpreet will contact you via email at <strong>{formData.email}</strong> or by phone at <strong>{formData.phone}</strong> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactFullName">Full Name</label>
                  <input
                    type="text"
                    id="contactFullName"
                    name="fullName"
                    className="form-control"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactEmail">Email Address</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      className="form-control"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contactPhone">Phone Number</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="phone"
                      className="form-control"
                      placeholder="416-123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactSubject">Inquiry Subject</label>
                  <select
                    id="contactSubject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option>Pre-Approval Inquiry</option>
                    <option>Refinance or Debt Consolidation</option>
                    <option>Alternative or Private Lending</option>
                    <option>Mortgage Renewal Review</option>
                    <option>Commercial or Construction Loan</option>
                    <option>General Question</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label" htmlFor="contactMessage">Your Message</label>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows="5"
                    className="form-control"
                    placeholder="Briefly describe your mortgage requirements..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {errorMessage && (
                  <div style={{ padding: '12px 16px', marginBottom: '18px', backgroundColor: '#fee2e2', border: '1px solid #f87171', borderRadius: '6px', color: '#991b1b', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spin-icon" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} /> Sending Secure Message...
                    </>
                  ) : (
                    <>
                      <Send size={16} style={{ marginRight: '8px' }} /> Send Secure Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
