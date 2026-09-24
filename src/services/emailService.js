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
  // Helper for fast fetch with timeout
  const fetchWithTimeout = async (url, options, timeoutMs = 3000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      throw err;
    }
  };

  // --- TIER 1: Fast Node / Vercel / Express Backend (/api/send-email) ---
  try {
    const nodeEndpoint = `${API_BASE_URL}/api/send-email`;
    const res = await fetchWithTimeout(nodeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ formType, formData })
    }, 4000);

    if (res.ok) {
      const result = await res.json().catch(() => null);
      if (result && result.success) {
        return { success: true, data: result, provider: 'node-smtp' };
      }
    }
  } catch (err) {
    console.warn('[Tier 1 fast mailer skipped, attempting direct fallback]:', err.name || err.message);
  }

  // --- TIER 2: Fast Browser Direct Mailer (Instant static delivery) ---
  try {
    const directRes = await fetchWithTimeout('https://formsubmit.co/ajax/eveswebworks@gmail.com', {
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
    }, 4000);

    if (directRes.ok) {
      const directResult = await directRes.json().catch(() => null);
      return { success: true, data: directResult, provider: 'browser-direct' };
    }
  } catch (err) {
    console.warn('[Tier 2 direct mailer failed]:', err.name || err.message);
  }

  // --- TIER 3: PHP Mailer on Apache / cPanel (/api/send-email.php) ---
  try {
    const phpEndpoint = `${API_BASE_URL}/api/send-email.php`;
    const phpRes = await fetchWithTimeout(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ formType, formData })
    }, 3000);

    if (phpRes.ok) {
      const phpResult = await phpRes.json().catch(() => null);
      if (phpResult && phpResult.success) {
        return { success: true, data: phpResult, provider: 'php-mail' };
      }
    }
  } catch (err) {
    console.error('[All email delivery tiers failed]:', err);
  }

  return {
    success: false,
    error: 'Could not deliver form. Please contact 647-222-7071 directly.'
  };
}

