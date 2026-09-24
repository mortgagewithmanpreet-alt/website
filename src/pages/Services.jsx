import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ShieldCheck, FileCheck, RefreshCw, RotateCcw, Landmark, Compass, Award, Briefcase, AlertTriangle, Globe, Building, Hammer, HelpCircle, UserCheck, ArrowRight } from 'lucide-react';

export default function Services() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  // Handle Hash Scroll on load/hash change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const servicesData = [
    {
      id: 'first-time',
      category: 'Buying a Home',
      title: 'First-Time Home Buyers',
      icon: <Home size={28} />,
      desc: 'Purchase your first home with confidence. We help you navigate the entire journey, including down payment incentive programs, land transfer tax rebates, and leveraging RRSPs.',
      points: [
        'Guidance on the First-Time Home Buyer Incentive',
        'Help with land transfer tax rebate applications (up to $4,000 in Ontario)',
        'Advice on utilizing the Home Buyers Plan (HBP) to withdraw RRSPs tax-free',
        'Special low-rate packages for first-time buyers'
      ]
    },
    {
      id: 'purchase',
      category: 'Buying a Home',
      title: 'Purchase Mortgage',
      icon: <Award size={28} />,
      desc: 'Ready to buy? Whether upgrading, downsizing, or relocating, we structure primary home purchase financing with flexible terms, competitive rates, and optimal payment frequencies.',
      points: [
        'Secure pre-approvals to shop with buying confidence',
        'Access to multiple institutional rate sheets',
        'Customized amortization (up to 30 years depending on down payment)',
        'Prepayment options to pay down your mortgage faster'
      ]
    },
    {
      id: 'pre-approval',
      category: 'Buying a Home',
      title: 'Pre-Approval',
      icon: <FileCheck size={28} />,
      desc: 'Establish your purchasing power before you visit open houses. Our VERICO network system provides formal pre-approvals in under 10 hours and locks in rates for up to 120 days.',
      points: [
        'Accurate calculations of your maximum purchase price',
        'Interest rate lock-ins for 90 to 120 days (protects against rate hikes)',
        'Thorough document pre-screening to avoid issues later',
        'Fast turnaround time (average 10 business hours)'
      ]
    },
    {
      id: 'refinancing',
      category: 'Refinancing & Equity',
      title: 'Mortgage Refinancing',
      icon: <RefreshCw size={28} />,
      desc: 'Unlock up to 80% of your home equity to fund renovations, pay off higher-interest debt, or invest. We break down the interest savings versus refinance penalties clearly.',
      points: [
        'Access up to 80% of your home\'s current appraised value',
        'Consolidate multiple high-interest debts into one low mortgage rate',
        'Fund major home improvements or additions',
        'Calculate penalty break-even points before signing'
      ]
    },
    {
      id: 'renewal',
      category: 'Refinancing & Equity',
      title: 'Mortgage Renewal',
      icon: <RotateCcw size={28} />,
      desc: 'Don\'t just sign the bank\'s automated renewal notice. Over 60% of homeowners pay too much by renewing blindly. Let us negotiate a lower rate with other competing lenders.',
      points: [
        'We review renewal offers 4 to 6 months before your term ends',
        'Shop competing lenders to beat your current bank\'s offer',
        'No cost transfer options available for most clients',
        'Adjust amortization or payment frequencies at renewal'
      ]
    },
    {
      id: 'debt-consolidation',
      category: 'Refinancing & Equity',
      title: 'Debt Consolidation',
      icon: <Landmark size={28} />,
      desc: 'Combine high-interest credit cards, auto loans, and lines of credit into a single, low-interest mortgage payment, increasing your monthly cash flow dramatically.',
      points: [
        'Pay off high-interest credit cards (saving 19%+ interest)',
        'Reduce total monthly payments by hundreds of dollars',
        'Simplify your finances into a single monthly payment',
        'Improve your credit score by clearing credit card balances'
      ]
    },
    {
      id: 'heloc',
      category: 'Refinancing & Equity',
      title: 'HELOC (Home Equity Line of Credit)',
      icon: <Compass size={28} />,
      desc: 'Get an adjustable-rate credit line secured by your home. Borrow only what you need, pay it back on your own terms, and pay interest only on the amount you draw.',
      points: [
        'Re-advancable credit line that grows as you pay down mortgage principal',
        'Interest-only payment options for ultimate flexibility',
        'Great for ongoing expenses like tuition or rolling renovations',
        'Lower interest rates compared to unsecured personal credit lines'
      ]
    },
    {
      id: 'second-mortgage',
      category: 'Alternative Lending',
      title: 'Second Mortgages',
      icon: <Building size={28} />,
      desc: 'Secure a second loan on your property without breaking your first mortgage and paying heavy penalties. Ideal for short-term emergency funds or business needs.',
      points: [
        'Keep your primary low-interest mortgage intact',
        'Fast approval turnaround with minimal document requirements',
        'Short terms available (usually 1 to 2 years)',
        'Equity-based qualifications (credit score is less critical)'
      ]
    },
    {
      id: 'self-employed',
      category: 'Special Situations',
      title: 'Self-Employed Mortgages',
      icon: <Briefcase size={28} />,
      desc: 'Business owners write off expenses to save taxes, which often disqualifies them at traditional banks. We use alternative income programs based on business bank statements.',
      points: [
        'Stated income programs (no standard tax returns required)',
        'Evaluation based on 6 to 12 months of business bank statements',
        'Available for sole proprietorships and corporations',
        'Flexible debt-servicing ratios'
      ]
    },
    {
      id: 'bad-credit',
      category: 'Special Situations',
      title: 'Bad Credit Mortgages',
      icon: <AlertTriangle size={28} />,
      desc: 'Had credit issues, past bankruptcies, consumer proposals, or tax arrears? We work with B-lenders and private sources who focus on your home\'s equity rather than your credit score.',
      points: [
        'Mortgage programs for credit scores under 600',
        'Solutions for active consumer proposals and bankruptcies',
        'Pathways to rebuild credit scores and transition back to prime rates',
        'Equity-driven alternative approvals'
      ]
    },
    {
      id: 'new-to-canada',
      category: 'Special Situations',
      title: 'New to Canada Programs',
      icon: <Globe size={28} />,
      desc: 'New immigrants and permanent residents can buy homes within their first 5 years in Canada. We access programs that require as little as 5% down payment.',
      points: [
        'Mortgages for Permanent Residents and Work Permit holders',
        'Alternative credit verification (using rent histories or utility bills)',
        'Minimum down payment starting at 5%',
        'Access to major bank immigrant packages'
      ]
    },
    {
      id: 'investment',
      category: 'Buying a Home',
      title: 'Investment Property',
      icon: <ShieldCheck size={28} />,
      desc: 'Build wealth through real estate. We assist you in financing rental properties, multi-unit complexes, and vacation homes, capitalizing on projected rental income.',
      points: [
        'Use up to 50%-80% of projected rent to offset debt ratios',
        'Guidance on down payment requirements (minimum 20% for rentals)',
        'Refinance primary residences to fund investment acquisitions',
        'Financing structures for multiple properties'
      ]
    },
    {
      id: 'construction',
      category: 'Alternative Lending',
      title: 'Construction Financing',
      icon: <Hammer size={28} />,
      desc: 'Build your custom dream home from the ground up. We structure progress draw construction mortgages, releasing funds in stages as construction milestones are completed.',
      points: [
        'Land acquisition financing options',
        'Progress draw mortgages (funds released at foundation, lock-up, and finish)',
        'Interest-only payments during the construction phase',
        'Transition to standard closed mortgages post-completion'
      ]
    },
    {
      id: 'reverse',
      category: 'Special Situations',
      title: 'Reverse Mortgages',
      icon: <HelpCircle size={28} />,
      desc: 'For homeowners aged 55+. Cash out up to 55% of your home equity tax-free with no monthly mortgage payments required. The loan is only repaid when you sell the home.',
      points: [
        'No monthly principal or interest payments required',
        'Keep 100% ownership and control of your home',
        'Tax-free cash (lump sum or monthly payouts)',
        'Will not affect Old Age Security (OAS) or GIS benefits'
      ]
    },
    {
      id: 'private',
      category: 'Alternative Lending',
      title: 'Private Lending',
      icon: <UserCheck size={28} />,
      desc: 'When institutional lenders say no, private individuals and mortgage investment corporations (MICs) step in. Equity-focused, interest-only short term bridges.',
      points: [
        'Extremely rapid approvals (within 24-48 hours)',
        'Interest-only payments to keep costs manageable',
        'Ideal for bridge financing or stopping power of sale',
        'No minimum credit score or strict income proof'
      ]
    }
  ];

  const categories = ['All', 'Buying a Home', 'Refinancing & Equity', 'Special Situations', 'Alternative Lending'];

  const filteredServices = activeFilter === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeFilter);

  const handleInquire = (serviceName) => {
    navigate('/book-consultation', { state: { goal: serviceName } });
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>OUR OFFERINGS</span>
          <h1>Comprehensive Mortgage Programs</h1>
          <p>Explore our full list of 15 mortgage services. We structure packages from prime banks to private capital to fit your requirements.</p>
        </div>
      </section>

      {/* Services List and Filter */}
      <section className="section bg-light">
        <div className="container">
          {/* Category Filter */}
          <div className="faq-cats">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                className={`faq-cat-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid list of services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                id={service.id} 
                className="card" 
                style={{ 
                  flexDirection: 'row', 
                  gap: '32px', 
                  alignItems: 'flex-start',
                  scrollMarginTop: '100px',
                  padding: '40px'
                }}
              >
                {/* Left icon wrapper */}
                <div 
                  className="card-icon" 
                  style={{ 
                    flexShrink: 0, 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '12px',
                    marginBottom: 0
                  }}
                >
                  {service.icon}
                </div>

                {/* Right details */}
                <div style={{ flexGrow: 1, textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <h2 className="serif-font" style={{ fontSize: '24px', color: 'var(--primary)' }}>{service.title}</h2>
                    <span 
                      style={{ 
                        fontSize: '11px', 
                        fontWeight: '700', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px', 
                        padding: '4px 10px', 
                        backgroundColor: 'var(--accent-light)', 
                        color: 'var(--accent)',
                        borderRadius: '30px'
                      }}
                    >
                      {service.category}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '15.5px', marginTop: '12px', marginBottom: '20px' }}>
                    {service.desc}
                  </p>

                  <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: 'var(--primary)' }}>
                    Key Features & Options:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 24px', marginBottom: '24px' }}>
                    {service.points.map((pt, pIdx) => (
                      <li key={pIdx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: 'bold', lineHeight: 1 }}>•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleInquire(service.title)} 
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '8px 20px' }}
                  >
                    Inquire About This Service <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="cta-banner">
        <div className="container">
          <h2 className="cta-title serif-font">Unsure Which Option Fits Best?</h2>
          <p className="cta-subtitle">Let Manpreet analyze your credit profile and debt ratios to recommend the optimal solution.</p>
          <div className="cta-btns">
            <Link to="/book-consultation" className="btn btn-primary btn-lg">
              Get Expert Guidance
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
