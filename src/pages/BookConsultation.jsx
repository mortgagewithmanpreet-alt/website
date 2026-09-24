import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, Shield, PhoneCall, Loader2, AlertCircle } from 'lucide-react';
import { submitFormToEmail } from '../services/emailService';

export default function BookConsultation() {
  const location = useLocation();
  const initialGoal = location.state?.goal || 'First-Time Home Buyer';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: 'Ontario',
    preferredDate: '',
    timeSlot: 'Morning (9:00 AM - 12:00 PM)',
    mortgageGoal: initialGoal
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

    if (!formData.fullName || !formData.email || !formData.phone || !formData.preferredDate) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitFormToEmail('Consultation Booking Request', formData);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || 'Failed to submit booking. Please try again or call 647-222-7071.');
    }
  };


  const timeSlots = [
    'Morning (9:00 AM - 12:00 PM)',
    'Afternoon (12:00 PM - 5:00 PM)',
    'Evening (5:00 PM - 8:00 PM)'
  ];

  const mortgageGoals = [
    'First-Time Home Buyer',
    'Purchase Existing Home',
    'Mortgage Pre-Approval',
    'Mortgage Refinancing',
    'Mortgage Renewal',
    'Debt Consolidation',
    'HELOC / Home Equity Loan',
    'Private or Second Mortgage',
    'Self-Employed Mortgage',
    'Bad Credit Lending',
    'Investment Property Portfolio',
    'Commercial / Construction financing'
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>SCHEDULE CALL</span>
          <h1>Book a Free Consultation</h1>
          <p>Schedule a no-obligation, 30-minute rate review with Manpreet. Choose your preferred callback slot below.</p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section bg-light">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', alignItems: 'start' }}>
          
          {/* Left Side: Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <h2 className="serif-font" style={{ fontSize: '28px' }}>What to Expect</h2>
            
            <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-white)' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, margin: 0 }}><Clock size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>30-Minute Review</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: 0 }}>A quick phone or video call to evaluate your income, ratios, and purchasing objectives.</p>
                  </div>
                </li>

                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, margin: 0 }}><Shield size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>No Obligation & Free</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: 0 }}>Our consultations are 100% free. Lenders cover broker fees, meaning our negotiation services cost you nothing.</p>
                  </div>
                </li>

                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0, margin: 0 }}><PhoneCall size={18} /></div>
                  <div>
                    <h4 style={{ fontSize: '16px', marginBottom: '4px' }}>Prompt Availability</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', margin: 0 }}>Consultations are conducted Monday to Friday 9:00 AM - 8:00 PM EST, and Saturdays 10:00 AM - 4:00 PM EST.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'rgba(184, 149, 106, 0.12)', borderLeft: '4px solid var(--accent)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', fontSize: '13.5px' }}>
              <strong>Online Booking Notice:</strong> We are transitioning to a live online calendar scheduling tool. In the meantime, request a callback using this secure form, and Manpreet will confirm the slot via SMS/Email within 2 business hours.
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="card" style={{ padding: '40px' }}>
            <h2 className="serif-font" style={{ fontSize: '26px', marginBottom: '24px', textAlign: 'left' }}>Request Callback</h2>

            {submitted ? (
              <div className="success-banner" style={{ margin: 0, padding: '32px', textAlign: 'center' }}>
                <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--success)' }}>Consultation Requested!</h4>
                <p style={{ color: 'var(--text-dark)', fontWeight: 'normal', fontSize: '14.5px' }}>
                  Thank you, <strong>{formData.fullName}</strong>. We have received your booking request for <strong>{formData.preferredDate}</strong> during the <strong>{formData.timeSlot}</strong>. 
                </p>
                <p style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '13.5px', marginTop: '12px' }}>
                  Manpreet will contact you via <strong>{formData.phone}</strong> or email <strong>{formData.email}</strong> shortly to finalize the connection.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="consultFullName">Full Name</label>
                  <input 
                    type="text" 
                    id="consultFullName"
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
                    <label className="form-label" htmlFor="consultEmail">Email Address</label>
                    <input 
                      type="email" 
                      id="consultEmail"
                      name="email"
                      className="form-control"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="consultPhone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="consultPhone"
                      name="phone"
                      className="form-control"
                      placeholder="416-123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="consultProvince">Province</label>
                    <select 
                      id="consultProvince"
                      name="province"
                      className="form-control"
                      value={formData.province}
                      onChange={handleInputChange}
                    >
                      <option>Ontario</option>
                      <option>British Columbia</option>
                      <option>Alberta</option>
                      <option>Manitoba</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="consultGoal">Mortgage Goal</label>
                    <select 
                      id="consultGoal"
                      name="mortgageGoal"
                      className="form-control"
                      value={formData.mortgageGoal}
                      onChange={handleInputChange}
                    >
                      {mortgageGoals.map((goal, idx) => (
                        <option key={idx} value={goal}>{goal}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="consultDate">Preferred Date</label>
                    <input 
                      type="date" 
                      id="consultDate"
                      name="preferredDate"
                      className="form-control"
                      min={new Date().toISOString().split('T')[0]} // Prevents selecting past dates
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="consultTime">Preferred Time Slot</label>
                    <select 
                      id="consultTime"
                      name="timeSlot"
                      className="form-control"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                    >
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {errorMessage && (
                  <div style={{ padding: '12px 16px', marginTop: '12px', marginBottom: '8px', backgroundColor: '#fee2e2', border: '1px solid #f87171', borderRadius: '6px', color: '#991b1b', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '12px', opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="spin-icon" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} /> Submitting Booking Request...
                    </>
                  ) : (
                    <>
                      <Calendar size={16} style={{ marginRight: '8px' }} /> Request My Free Rate Consultation
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
