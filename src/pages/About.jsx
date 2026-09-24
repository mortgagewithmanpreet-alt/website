import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Award, Briefcase, Globe, Heart } from 'lucide-react';

export default function About() {
  const credentials = [
    "Level 2 Mortgage Agent License (Lic #M22002134)",
    "Affiliated with Premium Financial Services (Brokerage Lic #12953)",
    "VERICO Broker Network Partner (Access to wholesale institutional capital)",
    "Specialist in First-Time Home Buyers & Self-Employed Mortgages",
    "Expert in Alternative (B-Lending) & Private Mortgage Structures",
    "Multilingual support in English, Punjabi, Hindi, and Urdu"
  ];

  const values = [
    {
      title: "100% Transparency",
      desc: "We detail all amortization schedules, hidden lender penalties, interest rate calculations, and closing disbursements. No surprises.",
      icon: <Shield size={24} />
    },
    {
      title: "Client-First Focus",
      desc: "Traditional bank reps work for the bank's profit margins. We are independent brokers: we work solely to save you money.",
      icon: <Heart size={24} />
    },
    {
      title: "Wholesale Rate Access",
      desc: "Through the VERICO network, we access wholesale rates that aren't advertised to the general public, passing savings to you.",
      icon: <Award size={24} />
    },
    {
      title: "Diverse Financing",
      desc: "From private lenders to major banks, we offer solutions for low credit, self-employed write-offs, and custom builds.",
      icon: <Briefcase size={24} />
    }
  ];

  const expertiseList = [
    "First-Time Buyers",
    "Mortgage Refinancing",
    "Self-Employed Loans",
    "Private Lending",
    "Bad Credit Mortgages",
    "Investment Properties",
    "New to Canada Programs",
    "Debt Consolidation"
  ];

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>ABOUT MANPREET</span>
          <h1>Meet Manpreet Singh</h1>
          <p>Licensed Mortgage Agent Level 2 serving home buyers and investors across Mississauga and the GTA.</p>
        </div>
      </section>

      {/* Hero Stats */}
      <section className="stats-section" style={{ backgroundColor: 'var(--primary-light)' }}>
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Families Helped</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">40+</div>
            <div className="stat-label">Lenders Queried</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">Languages Spoken</div>
          </div>
        </div>
      </section>

      {/* Detailed Info */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', alignItems: 'center' }}>
          <div className="hero-image-wrapper">
            <div className="hero-image-bg"></div>
            <img 
              src="/manpreet_singh.png" 
              alt="Manpreet Singh Portrait" 
              className="hero-image" 
            />
          </div>
          <div>
            <span className="section-badge">YOUR ADVOCATE</span>
            <h2 className="serif-font" style={{ fontSize: '32px', marginBottom: '20px' }}>Dedicated to Finding Your Best Rate</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
              Buying a home is one of the most significant financial steps you will take. As an independent Level 2 Mortgage Agent, I do not sell one single bank's products. Instead, I analyze your unique financial scenario and shop your application to over 40 prime banks, credit unions, and alternative trust companies.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              I pride myself on responsiveness, detailed explanations, and absolute transparency. From organizing pre-approvals in under 10 hours to negotiating custom private loan terms, my focus remains constant: ensuring you close on time with the lowest possible monthly payment.
            </p>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <Globe size={18} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '15px' }}>Multilingual Service: English, Punjabi (ਪੰਜਾਬੀ), Hindi (हिन्दी), Urdu (اردو)</strong>
            </div>

            <div style={{ marginTop: '30px' }}>
              <Link to="/book-consultation" className="btn btn-primary">Book Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">LICENSING & TRUST</span>
            <h2 className="section-title serif-font">Professional Credentials</h2>
            <p className="section-desc">We operate under strict compliance guidelines set by the Financial Services Regulatory Authority of Ontario (FSRA).</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'var(--bg-white)', padding: '40px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {credentials.map((cred, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '16px', fontWeight: '500' }}>
                  <Check size={20} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '2px' }} />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">OUR COMMITMENT</span>
            <h2 className="section-title serif-font">Core Professional Values</h2>
            <p className="section-desc">How we maintain standard-setting client relationships on every mortgage application.</p>
          </div>

          <div className="grid-2">
            {values.map((val, idx) => (
              <div key={idx} className="card" style={{ flexDirection: 'row', gap: '20px', padding: '24px' }}>
                <div className="card-icon" style={{ flexShrink: 0, marginBottom: 0 }}>{val.icon}</div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{val.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14.5px', margin: 0 }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise Grid */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">AREAS OF EXPERTISE</span>
            <h2 className="section-title serif-font">Specialized Lending Programs</h2>
            <p className="section-desc">We structure tailored products across these core financial focus areas.</p>
          </div>

          <div className="grid-4">
            {expertiseList.map((item, idx) => (
              <div key={idx} className="card" style={{ padding: '20px', textAlign: 'center', alignItems: 'center' }}>
                <Check size={20} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
                <h3 style={{ fontSize: '16px', margin: 0 }}>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Work Together CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-title serif-font">Let's Work Together</h2>
          <p className="cta-subtitle">Secure your custom rates and start your financing journey with a trusted agent.</p>
          <div className="cta-btns">
            <Link to="/book-consultation" className="btn btn-primary btn-lg">
              Book a Consultation
            </Link>
            <a href="tel:6472227071" className="btn btn-secondary btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
              Call 647-222-7071
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
