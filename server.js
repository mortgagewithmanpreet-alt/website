import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import handler from './api/send-email.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure leads backup log directory exists
const leadsFilePath = path.join(__dirname, 'leads.json');
const saveLeadBackup = (entry) => {
  try {
    let list = [];
    if (fs.existsSync(leadsFilePath)) {
      const fileData = fs.readFileSync(leadsFilePath, 'utf8');
      list = JSON.parse(fileData || '[]');
    }
    list.unshift({ ...entry, savedAt: new Date().toISOString() });
    fs.writeFileSync(leadsFilePath, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write backup lead:', err);
  }
};

// API Route for sending form submissions
app.post('/api/send-email', async (req, res) => {
  console.log(`[POST /api/send-email] Received submission:`, req.body?.formType, req.body?.formData?.fullName);
  
  // Save backup immediately
  if (req.body?.formData) {
    saveLeadBackup({
      formType: req.body.formType,
      formData: req.body.formData,
      ip: req.ip || req.headers['x-forwarded-for']
    });
  }

  // Call the shared handler
  await handler(req, res);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', targetEmail: process.env.EMAIL_USER || 'eveswebworks@gmail.com', time: new Date() });
});

// Serve static frontend in production if dist exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Express 5 compatible SPA fallback
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}


app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Email Notification Backend running on port ${PORT}`);
  console.log(`📧 Target Recipient: ${process.env.EMAIL_USER || 'eveswebworks@gmail.com'}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📬 Send API: http://localhost:${PORT}/api/send-email`);
  console.log(`=======================================================`);
});
