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

    const result = await response.json().catch(() => null);

    if (response.ok && result && result.success) {
      return {
        success: true,
        data: result
      };
    }

    const errorMsg = result?.message || `Server returned status ${response.status}`;
    throw new Error(errorMsg);
  } catch (err) {
    console.error(`[Email Dispatch Error - ${formType}]:`, err);
    return {
      success: false,
      error: err.message || 'Unable to submit form. Please call 647-222-7071 directly.'
    };
  }
}

