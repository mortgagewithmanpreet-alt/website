import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Singleton pooled nodemailer transporter for instant dispatch
let cachedTransporter = null;

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter;

  const user = process.env.EMAIL_USER || 'eveswebworks@gmail.com';
  const rawPass = process.env.EMAIL_PASS || 'pwwgnljgevtuqpmq';
  const pass = rawPass.replace(/\s+/g, '');

  cachedTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS
    family: 4, // FORCE IPv4 to fix ENETUNREACH on Render, Vercel, Heroku, AWS
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 14,
    auth: { user, pass }
  });

  return cachedTransporter;
};


// Generate styled HTML template for emails
export function generateEmailHtml(formType, data) {
  const timestamp = new Date().toLocaleString('en-CA', {
    timeZone: 'America/Toronto',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  let fieldsHtml = '';

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== '') {
      // Format label
      const label = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      
      let displayVal = value;
      if (typeof value === 'number') {
        if (key.toLowerCase().includes('price') || key.toLowerCase().includes('payment')) {
          displayVal = `$${value.toLocaleString()}`;
        } else {
          displayVal = value.toLocaleString();
        }
      }

      fieldsHtml += `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 38%; background-color: #f8fafc;">
            ${label}
          </td>
          <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-size: 15px;">
            ${displayVal}
          </td>
        </tr>
      `;
    }
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f1f5f9; color: #1e293b; }
        .container { max-width: 620px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #0b1e38 0%, #173663 100%); padding: 30px 24px; text-align: center; color: #ffffff; }
        .badge { display: inline-block; background-color: #b8956a; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 4px 14px; border-radius: 20px; margin-bottom: 10px; }
        .title { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; }
        .content { padding: 30px 24px; }
        .info-table { width: 100%; border-collapse: collapse; margin-top: 15px; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
        .cta-box { margin-top: 25px; padding: 18px; background-color: #f8fafc; border-left: 4px solid #b8956a; border-radius: 4px; }
        .cta-box a { color: #0b1e38; font-weight: 700; text-decoration: none; }
        .footer { background-color: #f8fafc; padding: 18px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="badge">NEW WEBSITE LEAD</span>
          <h1 class="title">${formType}</h1>
        </div>
        <div class="content">
          <p style="font-size: 15px; line-height: 1.5; color: #334155; margin-top: 0;">
            A new submission has been received from your website. Details are listed below:
          </p>
          <table class="info-table">
            <tbody>
              ${fieldsHtml}
            </tbody>
          </table>

          <div class="cta-box">
            <p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;">Quick Response Actions:</p>
            ${data.email ? `<a href="mailto:${data.email}" style="margin-right: 15px; display: inline-block; padding: 6px 12px; background: #0b1e38; color: #fff; border-radius: 4px; font-size: 13px; text-decoration: none;">✉ Reply to ${data.email}</a>` : ''}
            ${data.phone ? `<a href="tel:${data.phone}" style="display: inline-block; padding: 6px 12px; background: #b8956a; color: #fff; border-radius: 4px; font-size: 13px; text-decoration: none;">📞 Call ${data.phone}</a>` : ''}
          </div>
        </div>
        <div class="footer">
          Received on: <strong>${timestamp}</strong><br />
          Mortgages with Manpreet • Lead Management System
        </div>
      </div>
    </body>
    </html>
  `;
}

// Serverless Handler (Vercel / Netlify / Node)
export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed. Use POST.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }
    body = body || {};

    const { formType = 'Website Form Submission', formData = {} } = body;

    if (!formData.fullName && !formData.email && !formData.phone) {
      return res.status(400).json({ success: false, message: 'Form data is missing required fields.' });
    }

    // Target Recipients: Supports multiple comma-separated emails
    const defaultRecipients = ['eveswebworks@gmail.com', 'mortgagewithmanpreet@gmail.com'];
    const recipients = process.env.NOTIFICATION_EMAILS
      ? process.env.NOTIFICATION_EMAILS.split(',').map((e) => e.trim()).filter(Boolean)
      : defaultRecipients;

    const sender = process.env.EMAIL_USER || 'eveswebworks@gmail.com';
    const transporter = getTransporter();

    const subject = `[New Lead] ${formType}: ${formData.fullName || 'Website Visitor'}`;
    const html = generateEmailHtml(formType, formData);

    const mailOptions = {
      from: `"Mortgages With Manpreet" <${sender}>`,
      to: recipients,
      replyTo: formData.email || sender,
      subject: subject,
      html: html,
      text: `New Form Submission: ${formType}\n\nName: ${formData.fullName || 'N/A'}\nEmail: ${formData.email || 'N/A'}\nPhone: ${formData.phone || 'N/A'}\n\nDetails:\n${JSON.stringify(formData, null, 2)}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email Sent] Message ID: ${info.messageId} to [${recipients.join(', ')}]`);

    return res.status(200).json({
      success: true,
      message: `Email delivered successfully to ${recipients.join(', ')}`,
      messageId: info.messageId,
      recipients: recipients
    });
  } catch (error) {
    console.error('[Email Delivery Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email: ' + (error.message || 'Unknown error'),
      error: error.toString()
    });
  }
}
