/**
 * Email Submission Service
 * Sends lead data to:
 * 1. eveswebworks@gmail.com
 * 2. mortgagewithmanpreet@gmail.com
 * 
 * Includes multi-tier automatic fallbacks:
 * - Tier 1: Local / Vercel / Node backend (/api/send-email)
 * - Tier 2: Apache / cPanel PHP backend (/api/send-email.php)
 * - Tier 3: Browser Direct Mailer (formsubmit.co)
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function submitFormToEmail(formType, formData) {
  // --- TIER 1: Node / Vercel / Express Backend (/api/send-email) ---
  try {
    const nodeEndpoint = `${API_BASE_URL}/api/send-email`;
    const res = await fetch(nodeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ formType, formData })
    });

    if (res.ok) {
      const result = await res.json().catch(() => null);
      if (result && result.success) {
        return { success: true, data: result, provider: 'node-smtp' };
      }
    }
  } catch (err) {
    console.warn('[Tier 1 Mailer failed, trying Tier 2 PHP/Direct]', err.message);
  }

  // --- TIER 2: PHP Mailer on Apache / cPanel (/api/send-email.php) ---
  try {
    const phpEndpoint = `${API_BASE_URL}/api/send-email.php`;
    const phpRes = await fetch(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ formType, formData })
    });

    if (phpRes.ok) {
      const phpResult = await phpRes.json().catch(() => null);
      if (phpResult && phpResult.success) {
        return { success: true, data: phpResult, provider: 'php-mail' };
      }
    }
  } catch (err) {
    console.warn('[Tier 2 PHP Mailer failed, trying Tier 3 Direct]', err.message);
  }

  // --- TIER 3: Universal Browser Direct Mailer (Works on any static live server) ---
  try {
    const directRes = await fetch('https://formsubmit.co/ajax/eveswebworks@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[New Lead] ${formType}: ${formData.fullName || 'Website Lead'}`,
        _cc: 'mortgagewithmanpreet@gmail.com',
        _template: 'table',
        _captcha: 'false',
        'Form Type': formType,
        ...formData
      })
    });

    if (directRes.ok) {
      const directResult = await directRes.json().catch(() => null);
      return { success: true, data: directResult, provider: 'browser-direct' };
    }
  } catch (err) {
    console.error('[All email delivery tiers failed]:', err);
  }

  return {
    success: false,
    error: 'Could not deliver form. Please contact 647-222-7071 directly.'
  };
}

