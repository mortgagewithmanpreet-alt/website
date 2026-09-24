import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Shield, Award, Users, CheckCircle, ArrowRight, Star, HelpCircle, Phone, Loader2, AlertCircle } from 'lucide-react';
import heroVideo from '../assets/Basic Model-1782143188000.mp4';
import { submitFormToEmail } from '../services/emailService';

export default function Home() {
  // Pre-approval Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    province: 'Ontario',
    purchasePrice: 650000,
    downPayment: 65000,
    creditScore: 'Excellent (740+)',
    employmentStatus: 'Full-Time Employed'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const numVal = parseInt(value, 10);
    setFormData((prev) => {
      let updated = { ...prev, [name]: numVal };
      // Keep down payment constrained appropriately
      if (name === 'purchasePrice' && updated.downPayment > numVal) {
        updated.downPayment = numVal;
      }
      return updated;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setFormError('Please fill in all required contact fields.');
      return;
    }

    setIsSubmitting(true);
    const result = await submitFormToEmail('Online Pre-Approval Application', formData);
    setIsSubmitting(false);

    if (result.success) {
      setFormSubmitted(true);
    } else {
      setFormError(result.error || 'Failed to submit application. Please try again or call directly.');
    }
  };


  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const homeFaqs = [
    {
      q: "What is the difference between a mortgage pre-approval and pre-qualification?",
      a: "Pre-qualification is a quick estimate of how much you can borrow based on self-reported details. A pre-approval is a formal process where we verify your credit score, income, and documents. Under VERICO network, we can secure a pre-approval in as little as 10 hours, locking in your interest rate for up to 120 days."
    },
    {
      q: "How much down payment do I need to buy a home in Ontario?",
      a: "For homes under $500,000, the minimum down payment is 5%. For homes between $500,000 and $999,999, you need 5% on the first $500k and 10% on the remaining balance. For homes $1 million or more, a minimum of 20% down payment is required."
    },
    {
      q: "Can I get a mortgage if I am self-employed or have bad credit?",
      a: "Yes! As a Level 2 licensed agent, I specialize in alternative and private lending. Traditional banks have strict guidelines, but we work with private lenders who look at your overall equity and business cash flow rather than just standard tax returns or credit scores."
    }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}>
          <div className="hero-content">
            <span className="hero-badge">Licensed Mortgage Agent Level 2 - Ontario</span>
            <h1 className="hero-title serif-font">Your Path to Homeownership Starts Here</h1>
            <p className="hero-desc">
              Trusted, customized mortgage advice serving Mississauga, Toronto, and all across Ontario. We negotiate with 40+ lenders to secure your absolute best interest rate.
            </p>
            <div className="hero-actions">
              <Link to="/book-consultation" className="btn btn-primary btn-lg">
                Book Consultation
              </Link>
              <a href="tel:6472227071" className="btn btn-secondary btn-lg">
                <Phone size={18} /> Call 647-222-7071
              </a>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-bg"></div>
            <img 
              src="/manpreet_singh.png" 
              alt="Manpreet Singh - Licensed Mortgage Agent Level 2" 
              className="hero-image" 
            />
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-number">100+</div>
            <div className="stat-label">Families Helped</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">40+</div>
            <div className="stat-label">Lender Partners</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10hr</div>
            <div className="stat-label">Average Pre-Approval Time</div>
          </div>
        </div>
      </section>

      {/* 3. Video Introduction Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">MEET YOUR MORTGAGE EXPERT</span>
            <h2 className="section-title serif-font">A Personal Message For You</h2>
            <p className="section-desc">Learn how we simplify the borrowing process to secure your dream home.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div className="map-container" style={{ height: '320px', position: 'relative' }}>
              <div 
                className="map-placeholder" 
                style={{ 
                  background: 'linear-gradient(rgba(10, 15, 30, 0.6), rgba(10, 15, 30, 0.7)), url(/luxury_modern_home.png) center/cover no-repeat',
                  cursor: 'pointer'
                }}
              >
                <div 
                  style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(184, 149, 106, 0.9)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 0 20px rgba(184, 149, 106, 0.6)',
                    color: '#0A0F1E',
                    transition: 'transform 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Play size={32} fill="#0A0F1E" style={{ marginLeft: '4px' }} />
                </div>
                <span style={{ color: '#fff', marginTop: '16px', fontWeight: '600', letterSpacing: '1px' }}>WATCH INTRO VIDEO</span>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '26px', marginBottom: '16px' }} className="serif-font">"My goal is simple: to make your mortgage journey seamless, transparent, and financially smart."</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                With a Level 2 License, I am licensed to broker not just primary bank mortgages but also specialized alternative and private lending structures. Whether you are a first-time home buyer, a self-employed business owner, or looking to build an investment portfolio, we look past traditional criteria to structure loans that work for you.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/about" className="btn btn-dark">
                  Read My Story
                </Link>
                <Link to="/book-consultation" className="btn btn-secondary">
                  Schedule Call
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">OUR PROGRAMS</span>
            <h2 className="section-title serif-font">Tailored Mortgage Solutions</h2>
            <p className="section-desc">We offer professional brokerage assistance across 15+ comprehensive programs.</p>
          </div>

          <div className="grid-4" style={{ marginBottom: '40px' }}>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="card-img-wrapper">
                <img 
                  src="/first_time_buyer.png" 
                  alt="First-Time Buyers" 
                  className="card-img"
                />
              </div>
              <div style={{ padding: '24px 32px 32px 32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', marginBottom: 0, borderRadius: '8px' }}>
                    <Shield size={20} />
                  </div>
                  <h3 className="card-title" style={{ margin: 0, fontSize: '19px' }}>First-Time Buyers</h3>
                </div>
                <p className="card-desc">Navigate down payment incentives, RRSP withdrawals, and transfer tax rebates easily.</p>
                <Link to="/services#first-time" className="card-link">Learn More <ArrowRight size={16} /></Link>
              </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="card-img-wrapper">
                <img 
                  src="/house_purchase.png" 
                  alt="Purchase Mortgage" 
                  className="card-img"
                />
              </div>
              <div style={{ padding: '24px 32px 32px 32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', marginBottom: 0, borderRadius: '8px' }}>
                    <Award size={20} />
                  </div>
                  <h3 className="card-title" style={{ margin: 0, fontSize: '19px' }}>Purchase Mortgage</h3>
                </div>
                <p className="card-desc">Secure pre-approvals and finance your dream home with low rates and great terms.</p>
                <Link to="/services#purchase" className="card-link">Learn More <ArrowRight size={16} /></Link>
              </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="card-img-wrapper">
                <img 
                  src="/self_employed.png" 
                  alt="Self-Employed" 
                  className="card-img"
                />
              </div>
              <div style={{ padding: '24px 32px 32px 32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', marginBottom: 0, borderRadius: '8px' }}>
                    <Users size={20} />
                  </div>
                  <h3 className="card-title" style={{ margin: 0, fontSize: '19px' }}>Self-Employed</h3>
                </div>
                <p className="card-desc">Specialized products designed for business owners without traditional paystubs.</p>
                <Link to="/services#self-employed" className="card-link">Learn More <ArrowRight size={16} /></Link>
              </div>
            </div>

            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div className="card-img-wrapper">
                <img 
                  src="/private_lending.png" 
                  alt="Private Lending" 
                  className="card-img"
                />
              </div>
              <div style={{ padding: '24px 32px 32px 32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div className="card-icon" style={{ width: '40px', height: '40px', marginBottom: 0, borderRadius: '8px' }}>
                    <CheckCircle size={20} />
                  </div>
                  <h3 className="card-title" style={{ margin: 0, fontSize: '19px' }}>Private Lending</h3>
                </div>
                <p className="card-desc">Fast equity-based solutions for construction, debt clearing, or temporary needs.</p>
                <Link to="/services#private" className="card-link">Learn More <ArrowRight size={16} /></Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/services" className="btn btn-primary">
              View All 15 Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Lending Network */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">LENDING CHANNELS</span>
            <h2 className="section-title serif-font">Our Lending Network</h2>
            <p className="section-desc">Access to 40+ prime banks, credit unions, alternative B-lenders, and private funders through the VERICO broker network.</p>
          </div>

          <div className="lender-grid">
            <div className="lender-card">TD Bank</div>
            <div className="lender-card">Scotiabank</div>
            <div className="lender-card">First National</div>
            <div className="lender-card">MCAP</div>
            <div className="lender-card">Equitable Bank</div>
            <div className="lender-card">Home Trust</div>
            <div className="lender-card">CMLS Financial</div>
            <div className="lender-card">RMG Mortgages</div>
            <div className="lender-card">Merix Financial</div>
            <div className="lender-card">VERICO Network</div>
          </div>
        </div>
      </section>

      {/* 6. The Manpreet Difference */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">WHY CHOOSE US</span>
            <h2 className="section-title serif-font">The Manpreet Singh Difference</h2>
            <p className="section-desc">We represent your best interests from the initial consult to the final closing signature.</p>
          </div>

          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%' }}><Star size={24} /></div>
              <h3 className="card-title">Best Interest Rates</h3>
              <p className="card-desc" style={{ marginBottom: '0' }}>We scan dozens of institutional wholesale rate sheets to extract the lowest rates available on the market.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%' }}><Award size={24} /></div>
              <h3 className="card-title">Level 2 Licensing</h3>
              <p className="card-desc" style={{ marginBottom: '0' }}>Unlike Level 1 agents, we are fully licensed to structure complex non-traditional mortgages and private funds.</p>
            </div>
            <div className="card" style={{ textAlign: 'center', alignItems: 'center' }}>
              <div className="card-icon" style={{ borderRadius: '50%' }}><CheckCircle size={24} /></div>
              <h3 className="card-title">Transparent Advice</h3>
              <p className="card-desc" style={{ marginBottom: '0' }}>No hidden fees, no deceptive metrics. We walk you through cost-breakdowns and renewal restrictions step-by-step.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reviews Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">GOOGLE REVIEWS</span>
            <h2 className="section-title serif-font">5.0 Star Rating (22+ Reviews)</h2>
            <p className="section-desc">Read about the custom mortgage journeys we've structured for our clients.</p>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFB800" />)}
              </div>
              <p className="review-text">
                "Manpreet made our first home buying process so easy. He explained every document, locked down a rate that was lower than our primary bank offered, and closed on time. Highly recommend!"
              </p>
              <div className="review-author">Harpreet S.</div>
              <div className="review-source">Mississauga, ON</div>
            </div>
            <div className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFB800" />)}
              </div>
              <p className="review-text">
                "As a self-employed business owner, getting approved at banks was a nightmare. Manpreet looked at my actual statement cashflows and set up an alternative mortgage quickly. Absolute lifesaver."
              </p>
              <div className="review-author">Jaswinder D.</div>
              <div className="review-source">Mississauga, ON</div>
            </div>
            <div className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFB800" />)}
              </div>
              <p className="review-text">
                "Excellent service and complete honesty. He advised me against taking a complex private loan and restructured my debt consolidation into a prime refi. A broker who actually cares about clients!"
              </p>
              <div className="review-author">Aman K.</div>
              <div className="review-source">Toronto, ON</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Areas We Serve */}
      <section className="section" style={{ padding: '60px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 className="serif-font" style={{ marginBottom: '24px' }}>Proudly Serving Communities Across Ontario</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {['Mississauga', 'Toronto', 'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Scarborough', 'Hamilton', 'Kitchener'].map((city, idx) => (
              <span 
                key={idx} 
                style={{ 
                  padding: '8px 16px', 
                  backgroundColor: 'var(--bg-light)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '30px', 
                  fontSize: '14px', 
                  fontWeight: '600' 
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Interactive Pre-Approval Estimator */}
      <section className="section bg-light" id="pre-approval-estimator">
        <div className="container">
          <div className="preapp-card">
            <div className="preapp-header">
              <h3 className="serif-font">Get Pre-Approved Online</h3>
              <p>Fill out this short form to estimate your qualifying home price and secure your rate consultation.</p>
            </div>
            <div className="preapp-body">
              {formSubmitted ? (
                <div className="success-banner" style={{ margin: 0, padding: '40px' }}>
                  <CheckCircle size={48} style={{ margin: '0 auto 16px auto', color: 'var(--success)' }} />
                  <h4 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--success)' }}>Application Received!</h4>
                  <p style={{ color: 'var(--text-dark)', fontWeight: 'normal', fontSize: '15px' }}>
                    Thank you, <strong>{formData.fullName}</strong>. A customized mortgage breakdown and rate estimate has been prepared. Manpreet will contact you at <strong>{formData.phone}</strong> or <strong>{formData.email}</strong> within 10 business hours to lock in your pre-approval rate.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">Full Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        className="form-control" 
                        placeholder="John Doe" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="john@example.com" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        className="form-control" 
                        placeholder="647-123-4567" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="province">Province</label>
                      <select 
                        id="province" 
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
                  </div>

                  <div className="range-slider-group" style={{ marginBottom: '24px' }}>
                    <div className="range-header">
                      <label className="form-label" htmlFor="purchasePrice">Target Purchase Price</label>
                      <span className="range-value">${formData.purchasePrice.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      id="purchasePrice" 
                      name="purchasePrice" 
                      min="150000" 
                      max="2000000" 
                      step="25000" 
                      className="range-slider" 
                      value={formData.purchasePrice} 
                      onChange={handleSliderChange} 
                    />
                  </div>

                  <div className="range-slider-group" style={{ marginBottom: '24px' }}>
                    <div className="range-header">
                      <label className="form-label" htmlFor="downPayment">Estimated Down Payment</label>
                      <span className="range-value">
                        ${formData.downPayment.toLocaleString()} ({((formData.downPayment / formData.purchasePrice) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <input 
                      type="range" 
                      id="downPayment" 
                      name="downPayment" 
                      min={Math.ceil(formData.purchasePrice * 0.05)} 
                      max={formData.purchasePrice} 
                      step="5000" 
                      className="range-slider" 
                      value={formData.downPayment} 
                      onChange={handleSliderChange} 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="creditScore">Self-Reported Credit Score</label>
                      <select 
                        id="creditScore" 
                        name="creditScore" 
                        className="form-control" 
                        value={formData.creditScore} 
                        onChange={handleInputChange}
                      >
                        <option>Excellent (740+)</option>
                        <option>Good (680-739)</option>
                        <option>Fair (600-679)</option>
                        <option>Poor (Under 600)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="employmentStatus">Employment Status</label>
                      <select 
                        id="employmentStatus" 
                        name="employmentStatus" 
                        className="form-control" 
                        value={formData.employmentStatus} 
                        onChange={handleInputChange}
                      >
                        <option>Full-Time Employed</option>
                        <option>Self-Employed (Incorporated/Sole-Prop)</option>
                        <option>Contract / Part-Time</option>
                        <option>Retired / Investment Income</option>
                      </select>
                    </div>
                  </div>

                  {formError && (
                    <div style={{ padding: '12px 16px', marginTop: '16px', marginBottom: '8px', backgroundColor: '#fee2e2', border: '1px solid #f87171', borderRadius: '6px', color: '#991b1b', fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <AlertCircle size={18} style={{ flexShrink: 0 }} />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg" 
                      style={{ width: '100%', opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="spin-icon" style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} /> Submitting Application...
                        </>
                      ) : (
                        'Get Your Free Pre-Approval Rate'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">COMMON QUESTIONS</span>
            <h2 className="section-title serif-font">Frequently Asked Questions</h2>
            <p className="section-desc">Quick answers to standard mortgage queries before you lock in your pre-approval.</p>
          </div>

          <div className="accordion">
            {homeFaqs.map((faq, index) => (
              <div 
                key={index} 
                className={`accordion-item ${openFaq === index ? 'open' : ''}`}
              >
                <button className="accordion-header" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <HelpCircle className="accordion-icon" size={20} />
                </button>
                <div className="accordion-content">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/faqs" className="btn btn-secondary">
              View FAQ Hub
            </Link>
          </div>
        </div>
      </section>

      {/* 11. CTA Banner Section */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-title serif-font">Ready to Get Started?</h2>
          <p className="cta-subtitle">Contact Manpreet today for a transparent, pressure-free evaluation of your home financing options.</p>
          <div className="cta-btns">
            <Link to="/book-consultation" className="btn btn-primary btn-lg">
              Book a Free Consultation
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
