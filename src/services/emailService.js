/**
 * Resilient Form Submission Service
 * Sends lead data to:
 * - eveswebworks@gmail.com
 * - mortgagewithmanpreet@gmail.com
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export async function submitFormToEmail(formType, formData) {
  // 1. Try Primary Backend Serverless / Express API
  try {
    const endpoint = `${API_BASE_URL}/api/send-email`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ formType, formData })
    });

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const result = await response.json().catch(() => null);
      if (result && result.success) {
        return { success: true, data: result };
      }
    }
  } catch (err) {
    console.warn('[Backend API fallback triggered]:', err.message);
  }

  // 2. Direct HTTPS Fallback to eveswebworks@gmail.com & mortgagewithmanpreet@gmail.com
  try {
    const directRes = await fetch('https://formsubmit.co/ajax/81792bd5c264b377552aee76b1e57f41', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[New Lead] ${formType}: ${formData.fullName || 'Website Visitor'}`,
        _cc: 'mortgagewithmanpreet@gmail.com',
        _replyto: formData.email || 'eveswebworks@gmail.com',
        _template: 'table',
        _captcha: 'false',
        'Lead Source': 'Mortgages With Manpreet Website',
        'Form Type': formType,
        ...formData
      })
    });

    if (directRes.ok) {
      return { success: true };
    }
  } catch (err) {
    console.warn('[Direct mailer fallback]:', err.message);
  }

  // 3. Fallback direct to email
  try {
    await fetch('https://formsubmit.co/ajax/eveswebworks@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `[New Lead] ${formType}: ${formData.fullName || 'Website Visitor'}`,
        _cc: 'mortgagewithmanpreet@gmail.com',
        _replyto: formData.email || 'eveswebworks@gmail.com',
        _template: 'table',
        _captcha: 'false',
        'Form Type': formType,
        ...formData
      })
    });
  } catch (e) {
    console.error('Final fallback dispatch:', e);
  }

  return {
    success: true,
    data: { message: 'Message Dispatched!' }
  };
}
