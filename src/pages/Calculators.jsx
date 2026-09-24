import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Calculator, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('purchase');

  // Purchase Calculator State
  const [purchasePrice, setPurchasePrice] = useState(650000);
  const [downPayment, setDownPayment] = useState(65000);
  const [interestRate, setInterestRate] = useState(4.89);
  const [amortization, setAmortization] = useState(25);
  const [frequency, setFrequency] = useState('monthly');

  // Compare Calculator State
  const [compPrice, setCompPrice] = useState(650000);
  const [compDown, setCompDown] = useState(65000);
  const [compRateA, setCompRateA] = useState(4.89);
  const [compRateB, setCompRateB] = useState(5.29);
  const [compAmortA, setCompAmortA] = useState(25);
  const [compAmortB, setCompAmortB] = useState(25);

  // Affordability Calculator State
  const [annualIncome, setAnnualIncome] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [affordDown, setAffordDown] = useState(80000);
  const [affordRate, setAffordRate] = useState(4.89);

  // HELPER CALCULATIONS
  
  // Down payment limits in Canada:
  // - 5% on first $500,000
  // - 10% on portion between $500,000 and $999,999
  // - 20% on portion over $1,000,000
  const getMinDownPayment = (price) => {
    if (price <= 500000) {
      return price * 0.05;
    } else if (price < 1000000) {
      return (500000 * 0.05) + ((price - 500000) * 0.10);
    } else {
      return price * 0.20;
    }
  };

  // CMHC Mortgage Insurance Premium rate table (Canada)
  const getCMHCRate = (downPayment, price) => {
    const ratio = downPayment / price;
    if (ratio >= 0.20) return 0; // Conventional mortgage
    if (ratio >= 0.15) return 0.0280; // 2.8%
    if (ratio >= 0.10) return 0.0310; // 3.1%
    if (ratio >= 0.05) return 0.0400; // 4.0%
    return 0.0400;
  };

  // Exact Canadian compounding mortgage calculator formula:
  // Canadian mortgage rates are compounded semi-annually by law.
  const calculatePayment = (principal, annualRate, years, freq) => {
    if (principal <= 0 || annualRate <= 0) return 0;
    
    let frequencyPerYear = 12;
    if (freq === 'bi-weekly') frequencyPerYear = 26;
    if (freq === 'weekly') frequencyPerYear = 52;

    const rCompounded = Math.pow(1 + (annualRate / 100) / 2, 2 / frequencyPerYear) - 1;
    const totalPayments = years * frequencyPerYear;
    
    const payment = (principal * rCompounded) / (1 - Math.pow(1 + rCompounded, -totalPayments));
    return isNaN(payment) ? 0 : payment;
  };

  // CALCULATE PURCHASE PAYMENTS
  const minDown = getMinDownPayment(purchasePrice);
  const currentDown = Math.max(downPayment, minDown);
  const cmhcRate = getCMHCRate(currentDown, purchasePrice);
  const baseLoan = purchasePrice - currentDown;
  const cmhcPremium = baseLoan * cmhcRate;
  const totalLoan = baseLoan + cmhcPremium;
  const rawPayment = calculatePayment(totalLoan, interestRate, amortization, frequency);

  // CALCULATE COMPARE SCENARIOS
  const minCompDown = getMinDownPayment(compPrice);
  const actualCompDown = Math.max(compDown, minCompDown);
  const cmhcCompRate = getCMHCRate(actualCompDown, compPrice);
  const compBaseLoan = compPrice - actualCompDown;
  const compCmhcPremium = compBaseLoan * cmhcCompRate;
  const compTotalLoan = compBaseLoan + compCmhcPremium;

  const paymentA = calculatePayment(compTotalLoan, compRateA, compAmortA, 'monthly');
  const paymentB = calculatePayment(compTotalLoan, compRateB, compAmortB, 'monthly');
  
  const totalPaidA = paymentA * 12 * compAmortA;
  const totalPaidB = paymentB * 12 * compAmortB;

  const totalInterestA = totalPaidA - compTotalLoan;
  const totalInterestB = totalPaidB - compTotalLoan;

  // CALCULATE AFFORDABILITY
  // Using 39% GDS / 44% TDS standard Canadian bank metrics
  const maxMonthlyHousingTDS = ((annualIncome * 0.44) / 12) - monthlyDebts;
  const maxMonthlyHousingGDS = (annualIncome * 0.39) / 12;
  const maxHousingBudget = Math.min(maxMonthlyHousingGDS, maxMonthlyHousingTDS);
  
  // Deduct estimated property taxes ($250/mo) and heating/condo fees ($150/mo)
  const estimatedDeductions = 400;
  const maxMortgagePayment = Math.max(maxHousingBudget - estimatedDeductions, 100);

  // Back-calculate the supported mortgage loan amount
  const getLoanFromPayment = (payment, annualRate, years) => {
    const frequencyPerYear = 12; // Monthly
    const rCompounded = Math.pow(1 + (annualRate / 100) / 2, 2 / frequencyPerYear) - 1;
    const totalPayments = years * frequencyPerYear;
    const loan = (payment * (1 - Math.pow(1 + rCompounded, -totalPayments))) / rCompounded;
    return isNaN(loan) ? 0 : loan;
  };

  const supportedLoan = getLoanFromPayment(maxMortgagePayment, affordRate, 25);
  // Affordability Price = Loan supported + Down Payment
  const maxPurchasePrice = supportedLoan + affordDown;

  return (
    <div>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <span className="section-badge" style={{ color: 'var(--accent)' }}>FINANCIAL TOOLS</span>
          <h1>Mortgage Calculator Hub</h1>
          <p>Estimate your monthly payments, compare rate options side-by-side, and verify your maximum borrowing power.</p>
        </div>
      </section>

      {/* Main Hub Container */}
      <section className="section bg-light">
        <div className="container">
          <div className="calc-hub">
            {/* Tab Controls */}
            <div className="calc-tabs">
              <button 
                className={`calc-tab-btn ${activeTab === 'purchase' ? 'active' : ''}`}
                onClick={() => setActiveTab('purchase')}
              >
                <Calculator size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Purchase Payment Calculator
              </button>
              <button 
                className={`calc-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
                onClick={() => setActiveTab('compare')}
              >
                <Award size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Compare Rate Scenarios
              </button>
              <button 
                className={`calc-tab-btn ${activeTab === 'affordability' ? 'active' : ''}`}
                onClick={() => setActiveTab('affordability')}
              >
                <DollarSign size={16} style={{ display: 'inline', marginRight: '8px' }} />
                Affordability (Max Mortgage)
              </button>
            </div>

            {/* Tab Content */}
            <div className="calc-content">
              {/* TAB 1: PURCHASE CALCULATOR */}
              {activeTab === 'purchase' && (
                <div className="calc-grid">
                  {/* Left inputs */}
                  <div className="calc-inputs">
                    <div className="range-slider-group">
                      <div className="range-header">
                        <label className="form-label" htmlFor="purchasePriceInput">Purchase Price</label>
                        <span className="range-value">${purchasePrice.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        id="purchasePriceInput" 
                        min="150000" 
                        max="2000000" 
                        step="25000"
                        className="range-slider"
                        value={purchasePrice}
                        onChange={(e) => {
                          const newPrice = parseInt(e.target.value, 10);
                          setPurchasePrice(newPrice);
                          // Auto adjust down payment if below new minimum
                          const nextMin = getMinDownPayment(newPrice);
                          if (downPayment < nextMin) setDownPayment(nextMin);
                        }}
                      />
                    </div>

                    <div className="range-slider-group">
                      <div className="range-header">
                        <label className="form-label" htmlFor="downPaymentInput">Down Payment</label>
                        <span className="range-value">
                          ${currentDown.toLocaleString()} ({((currentDown / purchasePrice) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <input 
                        type="range" 
                        id="downPaymentInput" 
                        min={minDown} 
                        max={purchasePrice} 
                        step="5000"
                        className="range-slider"
                        value={currentDown}
                        onChange={(e) => setDownPayment(parseInt(e.target.value, 10))}
                      />
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                        Minimum down payment required by Canadian regulation: ${minDown.toLocaleString()}
                      </span>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="rateSelect">Interest Rate (%)</label>
                        <input 
                          type="number" 
                          id="rateSelect"
                          className="form-control" 
                          step="0.01"
                          min="0.5"
                          max="15"
                          value={interestRate}
                          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="amortizationSelect">Amortization Period</label>
                        <select 
                          id="amortizationSelect"
                          className="form-control"
                          value={amortization}
                          onChange={(e) => setAmortization(parseInt(e.target.value, 10))}
                        >
                          <option value="15">15 Years</option>
                          <option value="20">20 Years</option>
                          <option value="25">25 Years</option>
                          {/* Canada: down payments < 20% cannot exceed 25 yr amortization */}
                          {currentDown / purchasePrice >= 0.20 && <option value="30">30 Years</option>}
                        </select>
                        {currentDown / purchasePrice < 0.20 && (
                          <span style={{ fontSize: '11px', color: 'var(--accent)' }}>
                            *Down payment &lt; 20% limits amortization to max 25 years.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="frequencySelect">Payment Frequency</label>
                      <select 
                        id="frequencySelect"
                        className="form-control"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                      >
                        <option value="monthly">Monthly</option>
                        <option value="bi-weekly">Regular Bi-Weekly</option>
                        <option value="weekly">Regular Weekly</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Results */}
                  <div className="calc-results-card">
                    <div className="results-header">
                      <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>
                        Estimated Payment ({frequency})
                      </span>
                      <h2 className="results-payment">${Math.round(rawPayment).toLocaleString()}</h2>
                    </div>

                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Purchase Price</span>
                        <span className="breakdown-val">${purchasePrice.toLocaleString()}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Down Payment</span>
                        <span className="breakdown-val">-${currentDown.toLocaleString()}</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">
                          <span className="breakdown-dot" style={{ backgroundColor: 'var(--accent)' }}></span>
                          CMHC Insurance Premium
                        </span>
                        <span className="breakdown-val">${Math.round(cmhcPremium).toLocaleString()} ({ (cmhcRate * 100).toFixed(1) }%)</span>
                      </div>
                      <div className="breakdown-item" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', marginTop: '4px' }}>
                        <span className="breakdown-label" style={{ color: '#fff', fontWeight: 'bold' }}>Total Loan Amount</span>
                        <span className="breakdown-val" style={{ color: '#fff', fontWeight: 'bold' }}>${Math.round(totalLoan).toLocaleString()}</span>
                      </div>
                    </div>

                    {cmhcPremium > 0 && (
                      <div style={{ display: 'flex', gap: '8px', padding: '10px', backgroundColor: 'rgba(184, 149, 106, 0.15)', border: '1px solid var(--accent)', borderRadius: '6px', fontSize: '12px', marginBottom: '20px' }}>
                        <ShieldAlert size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                        <span>CMHC Default Insurance is required because your down payment is less than 20%. The premium is rolled into your mortgage loan.</span>
                      </div>
                    )}

                    <Link to="/book-consultation" className="btn btn-primary" style={{ width: '100%' }}>
                      Secure This Rate Consultation
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 2: COMPARE CALCULATOR */}
              {activeTab === 'compare' && (
                <div>
                  <div className="compare-grid">
                    {/* Share inputs */}
                    <div className="card" style={{ padding: '24px' }}>
                      <h3 className="compare-title serif-font">1. Joint Property Details</h3>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="compPriceVal">Property Purchase Price</label>
                        <input 
                          type="number" 
                          id="compPriceVal"
                          className="form-control"
                          value={compPrice}
                          onChange={(e) => {
                            const newPrice = parseInt(e.target.value, 10) || 0;
                            setCompPrice(newPrice);
                            const nextMin = getMinDownPayment(newPrice);
                            if (compDown < nextMin) setCompDown(nextMin);
                          }}
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label" htmlFor="compDownVal">Down Payment ($)</label>
                        <input 
                          type="number" 
                          id="compDownVal"
                          className="form-control"
                          value={compDown}
                          onChange={(e) => setCompDown(parseInt(e.target.value, 10) || 0)}
                        />
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Min down payment: ${minCompDown.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Compare settings */}
                    <div className="card" style={{ padding: '24px' }}>
                      <h3 className="compare-title serif-font">2. Scenario Details</h3>
                      
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label" htmlFor="scenarioARate">Scenario A Rate (%)</label>
                          <input 
                            type="number" 
                            id="scenarioARate"
                            step="0.01"
                            className="form-control"
                            value={compRateA}
                            onChange={(e) => setCompRateA(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="scenarioBRate">Scenario B Rate (%)</label>
                          <input 
                            type="number" 
                            id="scenarioBRate"
                            step="0.01"
                            className="form-control"
                            value={compRateB}
                            onChange={(e) => setCompRateB(parseFloat(e.target.value) || 0)}
                          />
                        </div>
                      </div>

                      <div className="form-row" style={{ margin: 0 }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label" htmlFor="scenarioAAmort">Scenario A Amortization</label>
                          <select 
                            id="scenarioAAmort"
                            className="form-control"
                            value={compAmortA}
                            onChange={(e) => setCompAmortA(parseInt(e.target.value, 10))}
                          >
                            <option value="15">15 Years</option>
                            <option value="20">20 Years</option>
                            <option value="25">25 Years</option>
                            {actualCompDown / compPrice >= 0.20 && <option value="30">30 Years</option>}
                          </select>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label className="form-label" htmlFor="scenarioBAmort">Scenario B Amortization</label>
                          <select 
                            id="scenarioBAmort"
                            className="form-control"
                            value={compAmortB}
                            onChange={(e) => setCompAmortB(parseInt(e.target.value, 10))}
                          >
                            <option value="15">15 Years</option>
                            <option value="20">20 Years</option>
                            <option value="25">25 Years</option>
                            {actualCompDown / compPrice >= 0.20 && <option value="30">30 Years</option>}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Side by side comparison results */}
                  <div className="grid-2" style={{ marginBottom: '32px' }}>
                    <div className="calc-results-card" style={{ backgroundColor: 'var(--primary-light)' }}>
                      <div className="results-header">
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Scenario A Monthly Payment</span>
                        <h2 className="results-payment">${Math.round(paymentA).toLocaleString()}</h2>
                      </div>
                      <div className="breakdown-list" style={{ marginBottom: 0 }}>
                        <div className="breakdown-item">
                          <span>Rate / Amortization</span>
                          <span>{compRateA}% / {compAmortA} Yrs</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Total Mortgage Balance</span>
                          <span>${Math.round(compTotalLoan).toLocaleString()}</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Est. Interest Paid</span>
                          <span>${Math.round(totalInterestA).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="calc-results-card" style={{ backgroundColor: '#1A2338' }}>
                      <div className="results-header">
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Scenario B Monthly Payment</span>
                        <h2 className="results-payment" style={{ color: 'var(--accent)' }}>${Math.round(paymentB).toLocaleString()}</h2>
                      </div>
                      <div className="breakdown-list" style={{ marginBottom: 0 }}>
                        <div className="breakdown-item">
                          <span>Rate / Amortization</span>
                          <span>{compRateB}% / {compAmortB} Yrs</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Total Mortgage Balance</span>
                          <span>${Math.round(compTotalLoan).toLocaleString()}</span>
                        </div>
                        <div className="breakdown-item">
                          <span>Est. Interest Paid</span>
                          <span>${Math.round(totalInterestB).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decision Banner */}
                  {paymentA !== paymentB && (
                    <div className="compare-result-banner">
                      <CheckCircle2 size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                      <span>
                        {paymentA < paymentB ? (
                          <>Scenario A is more cost-effective. It saves you <strong>${Math.round(paymentB - paymentA).toLocaleString()}</strong> per month and <strong>${Math.round(totalInterestB - totalInterestA).toLocaleString()}</strong> in total interest over amortization.</>
                        ) : (
                          <>Scenario B is more cost-effective. It saves you <strong>${Math.round(paymentA - paymentB).toLocaleString()}</strong> per month and <strong>${Math.round(totalInterestA - totalInterestB).toLocaleString()}</strong> in total interest over amortization.</>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: AFFORDABILITY CALCULATOR */}
              {activeTab === 'affordability' && (
                <div className="calc-grid">
                  {/* Left inputs */}
                  <div className="calc-inputs">
                    <div className="range-slider-group">
                      <div className="range-header">
                        <label className="form-label" htmlFor="annualIncomeInput">Gross Annual Household Income</label>
                        <span className="range-value">${annualIncome.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        id="annualIncomeInput" 
                        min="40000" 
                        max="350000" 
                        step="5000"
                        className="range-slider"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <div className="range-slider-group">
                      <div className="range-header">
                        <label className="form-label" htmlFor="monthlyDebtsInput">Monthly Debt Payments (Credit card, car, loan payments)</label>
                        <span className="range-value">${monthlyDebts.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        id="monthlyDebtsInput" 
                        min="0" 
                        max="4000" 
                        step="100"
                        className="range-slider"
                        value={monthlyDebts}
                        onChange={(e) => setMonthlyDebts(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <div className="range-slider-group">
                      <div className="range-header">
                        <label className="form-label" htmlFor="affordDownInput">Available Down Payment</label>
                        <span className="range-value">${affordDown.toLocaleString()}</span>
                      </div>
                      <input 
                        type="range" 
                        id="affordDownInput" 
                        min="10000" 
                        max="500000" 
                        step="5000"
                        className="range-slider"
                        value={affordDown}
                        onChange={(e) => setAffordDown(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" htmlFor="affordRateInput">Estimated Interest Rate (%)</label>
                      <input 
                        type="number" 
                        id="affordRateInput"
                        step="0.01"
                        className="form-control"
                        value={affordRate}
                        onChange={(e) => setAffordRate(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Right Results */}
                  <div className="calc-results-card">
                    <div className="results-header">
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.6)' }}>Max Purchasing Power</span>
                      <h2 className="results-payment" style={{ fontSize: '38px' }}>${Math.round(maxPurchasePrice).toLocaleString()}</h2>
                    </div>

                    <div className="breakdown-list">
                      <div className="breakdown-item">
                        <span>Max Supported Mortgage</span>
                        <span className="breakdown-val">${Math.round(supportedLoan).toLocaleString()}</span>
                      </div>
                      <div className="breakdown-item">
                        <span>Available Down Payment</span>
                        <span className="breakdown-val">+${affordDown.toLocaleString()}</span>
                      </div>
                      <div className="breakdown-item">
                        <span>Est. Qualifying Monthly Payment</span>
                        <span className="breakdown-val">${Math.round(maxMortgagePayment).toLocaleString()}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '6px', fontSize: '12px', marginBottom: '20px' }}>
                      <FileText size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <span>Calculation includes a GDS boundary of 39%, TDS boundary of 44%, and deducts $400/month for municipal taxes and utility estimates.</span>
                    </div>

                    <Link to="/book-consultation" className="btn btn-primary" style={{ width: '100%' }}>
                      Get Pre-Approved for This Amount
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
