import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { google } from "googleapis";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Partnership Form Submission
  app.post("/api/partnership-submit", async (req, res) => {
    try {
      const formData = req.body;

      // 1. Google Sheets Integration
      if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          },
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        
        // Prepare row data based on your form data
        // Adjust the order to match your sheet's columns
        const rowData = [
          new Date().toISOString(),
          formData.companyName || '',
          formData.yourName || '',
          formData.designation || '',
          formData.workEmail || '',
          formData.phoneNumber || '',
          formData.websiteUrl || '',
          formData.selectedRoles ? formData.selectedRoles.join(', ') : '',
          formData.monthlyVolume || '',
          formData.biggestChallenge || '',
          formData.vendorsFailed || '',
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'Sheet1!A:K', // Adjust range if needed
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [rowData],
          },
        });
      } else {
        console.warn("Google Sheets API keys missing. Skipping sheet append.");
      }

      // 2. Email Response Integration
      if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS) {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT, 10),
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"Jovese Partnerships" <partnerships@jovese.com>`, 
          to: formData.workEmail,
          subject: 'We have received your Jovese Partnership Audit',
          html: `
            <p>Hi ${formData.yourName},</p>
            <p>Thank you for submitting your partnership audit. We have received your details for <strong>${formData.companyName}</strong>.</p>
            <p>Our team will review your application and hiring requirements. If your needs align with our current capacity and scope, we will reach out within 24-48 hours to schedule a deep-dive call.</p>
            <p>We appreciate your interest in partnering with Jovese.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Jovese Team</strong></p>
          `,
        };

        if (formData.workEmail) {
          await transporter.sendMail(mailOptions);
        }
      } else {
        console.warn("SMTP credentials missing. Skipping email send.");
      }

      res.status(200).json({ success: true, message: "Submission successful" });
    } catch (error) {
      console.error("Submission error:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
