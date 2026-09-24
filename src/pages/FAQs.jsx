import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    'All',
    'Getting Started',
    'Mortgage Basics',
    'Pre-Approval & Qualification',
    'First-Time Buyers',
    'Self-Employed & Alternative',
    'Refinancing & Renewal'
  ];

  const faqsData = [
    {
      category: 'Getting Started',
      q: "What is a mortgage broker and why should I use one instead of a bank?",
      a: "A bank representative only sells their own bank's products. As a licensed mortgage agent, I shop your application to over 40 lenders—including major banks, credit unions, alternative B-lenders, and private trusts. I negotiate the rate, fees, and terms on your behalf, and my service is typically free to you as the lenders pay the broker commission."
    },
    {
      category: 'Mortgage Basics',
      q: "What is the Canadian mortgage stress test?",
      a: "The mortgage stress test is a federal regulation requiring lenders to qualify you at a higher rate than your actual contract rate. Currently, you must prove you can afford payments at either the benchmark rate (5.25%) or your contract rate plus 2%, whichever is higher. This ensures you can handle payments if rates rise."
    },
    {
      category: 'Pre-Approval & Qualification',
      q: "What credit score is needed to qualify for a prime mortgage?",
      a: "Generally, a credit score of 680 or higher is required for prime rates at major banks. If your score is between 600 and 679, we can qualify you with alternative B-lenders. If your score is under 600, we can access private lenders who qualify based on home equity while we help you build credit."
    },
    {
      category: 'First-Time Buyers',
      q: "What incentives are available for first-time home buyers in Ontario?",
      a: "First-time buyers can access: 1) Land Transfer Tax Rebates of up to $4,000 in Ontario (and an additional $4,475 in Toronto); 2) The Home Buyers' Plan (HBP) allowing you to withdraw up to $60,000 tax-free from your RRSP; 3) The First Home Savings Account (FHSA) allowing tax-free contributions and withdrawals of up to $40,000."
    },
    {
      category: 'Self-Employed & Alternative',
      q: "How do I get approved if I am self-employed or run a small business?",
      a: "Traditional banks require two years of stable income history shown on tax assessments. As a Level 2 agent, I offer 'Stated Income' programs where we prove income using 6 to 12 months of business bank statements showing deposit cashflow, bypassing traditional tax assessment guidelines."
    },
    {
      category: 'Refinancing & Renewal',
      q: "When should I begin shopping around for my mortgage renewal?",
      a: "You should start shopping 4 to 6 months before your term ends. Banks send automated renewal notices roughly 21 days before expiration, often with high standard rates. Shopping early allows us to lock in a lower rate with other competing lenders for up to 120 days at no cost to you."
    },
    {
      category: 'Mortgage Basics',
      q: "What is the difference between fixed-rate and variable-rate mortgages?",
      a: "A fixed-rate mortgage locks in your interest rate for the entire term (e.g. 5 years), ensuring stable, predictable payments. A variable-rate mortgage fluctuates with the lender's prime rate. If rates drop, more of your payment goes to principal; if rates rise, more goes to interest."
    },
    {
      category: 'Pre-Approval & Qualification',
      q: "What documents are required to get a mortgage pre-approval?",
      a: "Generally, you will need: 1) Employment verification (a job letter and recent pay stub); 2) Proof of down payment (3 months of bank/investment statements or a gift letter); 3) Two years of tax returns (T4s, T1 Generals, and Notices of Assessment); 4) Photo ID and consent for a credit check."
    },
    {
      category: 'Refinancing & Renewal',
      q: "Can I break my mortgage term early to refinance at a lower rate?",
      a: "Yes, but you will pay a prepayment penalty. For fixed-rate mortgages, the penalty is the greater of 3 months' interest or the Interest Rate Differential (IRD). For variable-rate mortgages, it is capped at 3 months' interest. We calculate the interest savings vs. penalty cost to verify if refinancing is financially sound."
    }
  ];

  const handleToggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Filter logic
  const filteredFaqs = faqsData.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>KNOWLEDGE BASE</span>
          <h1>Frequently Asked Questions</h1>
          <p>Find clear, straightforward answers regarding pre-approvals, rates, renewals, and self-employed mortgages.</p>
        </div>
      </section>

      {/* Search & Categories Section */}
      <section className="section bg-light">
        <div className="container">
          {/* Search Input Box */}
          <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative' }}>
            <input 
              type="text"
              placeholder="Search mortgage questions..."
              className="form-control"
              style={{ paddingLeft: '48px', paddingRight: '20px', height: '54px', borderRadius: '30px', boxShadow: 'var(--shadow-sm)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} style={{ position: 'absolute', left: '18px', top: '17px', color: 'var(--text-muted)' }} />
          </div>

          {/* Categories Tab Buttons */}
          <div className="faq-cats">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(null); // Close accordions when changing categories
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="accordion">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className={`accordion-item ${openFaq === idx ? 'open' : ''}`}
                >
                  <button className="accordion-header" onClick={() => handleToggleFaq(idx)}>
                    <span>{faq.q}</span>
                    <ChevronDown className="accordion-icon" size={20} />
                  </button>
                  <div className="accordion-content">
                    <p style={{ lineHeight: '1.7', color: 'var(--text-muted)' }}>{faq.a}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                <HelpCircle size={48} style={{ margin: '0 auto 16px auto', color: 'var(--accent)', opacity: 0.6 }} />
                <h3>No results match your search</h3>
                <p>Try searching different terms or change the category filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-banner">
        <div className="container">
          <MessageSquare size={44} style={{ color: 'var(--accent)', margin: '0 auto 20px auto' }} />
          <h2 className="cta-title serif-font">Have a Specific Question?</h2>
          <p className="cta-subtitle">Every property, business, and credit profile is different. Get a direct, customized answer from Manpreet.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Send a Message
            </Link>
            <Link to="/book-consultation" className="btn btn-secondary btn-lg" style={{ borderColor: '#fff', color: '#fff' }}>
              Schedule Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
