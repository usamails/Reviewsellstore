import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // SMTP Transporter configuration
  const smtpUser = process.env.SMTP_USER || "smmbuy2022@gmail.com";
  const smtpPass = (process.env.SMTP_PASS || "cozi ibbt kzwp xato").replace(/\s+/g, "");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Verify Transporter connection on startup
  transporter.verify((error) => {
    if (error) {
      console.error("❌ SMTP Transporter Verification Error:", error);
    } else {
      console.log("✅ SMTP Server is ready to send order notification emails for ReviewSellStore!");
    }
  });

  // API Route: Send Order Email
  app.post("/api/send-order-email", async (req, res) => {
    try {
      const {
        customerEmail,
        telegram,
        whatsapp,
        txNote,
        selectedCrypto,
        orderItems,
        orderTotal,
      } = req.body;

      if (!customerEmail || !orderItems || orderItems.length === 0) {
        return res.status(400).json({
          success: false,
          error: "Customer email and order items are required.",
        });
      }

      // Generate items table HTML
      const itemsHtml = orderItems
        .map(
          (item: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
            ${item.title} <span style="color: #64748b; font-size: 12px;">(${item.variantName || 'Standard'})</span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #334155;">
            x${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #2563eb;">
            $${(Number(item.price) * Number(item.quantity)).toFixed(2)} USD
          </td>
        </tr>
      `
        )
        .join("");

      // 1. Send Notification Email to Store Admin (smmbuy2022@gmail.com)
      const adminMailOptions = {
        from: `"ReviewSellStore Orders" <${smtpUser}>`,
        to: smtpUser,
        replyTo: customerEmail,
        subject: `🛒 NEW ORDER RECEIVED - $${Number(orderTotal).toFixed(2)} USD (${customerEmail})`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
            <!-- Header with Logo -->
            <div style="background-color: #0f172a; padding: 28px 20px; text-align: center; border-bottom: 3px solid #2563eb;">
              <img src="https://reviewsellstore.com/apple-touch-icon.png" alt="ReviewSellStore Logo" width="64" height="64" style="width: 64px; height: 64px; border-radius: 12px; margin-bottom: 10px; display: inline-block;" />
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px;">ReviewSellStore</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: 600;">🔥 New Customer Order Alert</p>
            </div>

            <div style="padding: 28px 24px;">
              <!-- Customer Details Card -->
              <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 700;">👤 Customer Contact Information:</h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Customer Email:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 700;"><a href="mailto:${customerEmail}" style="color: #2563eb; text-decoration: underline;">${customerEmail}</a></td>
                  </tr>
                  ${
                    telegram
                      ? `<tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Telegram:</td>
                    <td style="padding: 6px 0; color: #0284c7; font-weight: 700;">${telegram}</td>
                  </tr>`
                      : ""
                  }
                  ${
                    whatsapp
                      ? `<tr>
                    <td style="padding: 6px 0; color: #64748b; font-weight: 600;">WhatsApp:</td>
                    <td style="padding: 6px 0; color: #16a34a; font-weight: 700;">${whatsapp}</td>
                  </tr>`
                      : ""
                  }
                </table>
              </div>

              <!-- Payment Details -->
              <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 700;">💳 Payment Details:</h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px;">
                <p style="margin: 4px 0;"><strong>Selected Payment:</strong> ${selectedCrypto?.name || "Crypto"} (${selectedCrypto?.symbol || ""} - ${selectedCrypto?.network || ""})</p>
                <p style="margin: 4px 0;"><strong>Deposit Address:</strong> <code style="background: #ffffff; border: 1px solid #cbd5e1; padding: 3px 6px; border-radius: 4px; color: #0f172a;">${selectedCrypto?.address || "N/A"}</code></p>
                ${txNote ? `<p style="margin: 6px 0 0 0; color: #2563eb; font-weight: 700;"><strong>Tx Hash / ID:</strong> ${txNote}</p>` : ""}
              </div>

              <!-- Ordered Items Table -->
              <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 700;">📦 Ordered Items:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <thead>
                  <tr style="background-color: #f8fafc; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 10px;">Item & Variant</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="text-align: right; padding: 14px 18px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; font-size: 16px; font-weight: 800; color: #1e40af; border: 1px solid #bfdbfe;">
                Total Order Amount: $${Number(orderTotal).toFixed(2)} USD
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #020617; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
              Sent automatically from ReviewSellStore Order System to ${smtpUser}
            </div>
          </div>
        `,
      };

      // 2. Send Confirmation & Thank You Email to Customer
      const customerMailOptions = {
        from: `"ReviewSellStore" <${smtpUser}>`,
        to: customerEmail,
        replyTo: smtpUser,
        subject: `✅ Order Confirmation & Receipt - ReviewSellStore`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);">
            <!-- Header with Logo -->
            <div style="background-color: #0f172a; padding: 28px 20px; text-align: center; border-bottom: 3px solid #2563eb;">
              <img src="https://reviewsellstore.com/apple-touch-icon.png" alt="ReviewSellStore Logo" width="64" height="64" style="width: 64px; height: 64px; border-radius: 12px; margin-bottom: 10px; display: inline-block;" />
              <h1 style="margin: 0; font-size: 24px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px;">ReviewSellStore</h1>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: 600;">Premium Verified Accounts & Digital Services</p>
            </div>

            <div style="padding: 28px 24px;">
              <!-- Greeting Banner -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px; text-align: center;">
                <h2 style="margin: 0; font-size: 18px; color: #166534; font-weight: 700;">🎉 Order Received & Confirmed!</h2>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #15803d;">Thank you for shopping with us. Our 24/7 delivery team is preparing your order.</p>
              </div>

              <!-- Order Info Card -->
              <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 700;">🛒 Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <thead>
                  <tr style="background-color: #f8fafc; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0;">
                    <th style="padding: 10px;">Item & Variant</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="text-align: right; padding: 14px 18px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 10px; font-size: 16px; font-weight: 800; color: #1e40af; margin-bottom: 24px; border: 1px solid #bfdbfe;">
                Total Payment: $${Number(orderTotal).toFixed(2)} USD
              </div>

              <!-- Payment Details Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
                <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 15px; font-weight: 700; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">💳 Payment Details</h4>
                <p style="margin: 6px 0; font-size: 13px; color: #334155;">
                  <strong>Payment Method:</strong> ${selectedCrypto?.name || "Crypto"} (${selectedCrypto?.symbol || ""} - ${selectedCrypto?.network || ""})
                </p>
                <p style="margin: 6px 0; font-size: 12px; color: #334155; word-break: break-all;">
                  <strong>Deposit Address:</strong> <code style="background: #ffffff; padding: 3px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 11px; color: #0f172a;">${selectedCrypto?.address || "N/A"}</code>
                </p>
                ${txNote ? `<p style="margin: 6px 0; font-size: 13px; color: #2563eb; font-weight: 600;"><strong>Tx Hash / ID:</strong> ${txNote}</p>` : ""}
              </div>

              <!-- 24/7 Support Box -->
              <div style="background: #0f172a; border-radius: 12px; padding: 20px; color: #ffffff; margin-bottom: 24px;">
                <h4 style="margin: 0 0 10px 0; color: #38bdf8; font-size: 15px; font-weight: 700;">💬 24/7 Instant Live Support</h4>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                  Have questions or need instant delivery status? Reach out to our customer support team directly:
                </p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #f8fafc;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; width: 110px; color: #38bdf8;">📱 Telegram:</td>
                    <td style="padding: 6px 0;"><a href="https://t.me/EgSupport24" style="color: #38bdf8; font-weight: bold; text-decoration: underline;">@EgSupport24</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #4ade80;">📞 WhatsApp:</td>
                    <td style="padding: 6px 0;"><a href="https://wa.me/13073939979" style="color: #4ade80; font-weight: bold; text-decoration: underline;">+1 307-393-9979</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #f43f5e;">📧 Email:</td>
                    <td style="padding: 6px 0;"><a href="mailto:${smtpUser}" style="color: #ffffff; text-decoration: underline;">${smtpUser}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: 600; color: #a855f7;">🌐 Website:</td>
                    <td style="padding: 6px 0;"><a href="https://reviewsellstore.com" style="color: #38bdf8; text-decoration: underline;">https://reviewsellstore.com</a></td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
                Thank you for choosing <strong>ReviewSellStore</strong>! We appreciate your trust.
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #020617; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
              © ${new Date().getFullYear()} ReviewSellStore • All Rights Reserved
            </div>
          </div>
        `,
      };

      let adminMailSent = false;
      let customerMailSent = false;
      let adminErrMessage = "";

      // Send admin notification
      try {
        await transporter.sendMail(adminMailOptions);
        adminMailSent = true;
      } catch (err: any) {
        console.error("❌ Admin Email Failed:", err);
        adminErrMessage = err?.message || "Failed to send admin email";
      }

      // Send customer confirmation
      try {
        await transporter.sendMail(customerMailOptions);
        customerMailSent = true;
      } catch (err: any) {
        console.error("❌ Customer Email Failed:", err);
      }

      if (adminMailSent || customerMailSent) {
        return res.json({
          success: true,
          message: "Order emails processed successfully!",
          adminMailSent,
          customerMailSent,
        });
      } else {
        throw new Error(adminErrMessage || "Failed to send order email.");
      }
    } catch (err: any) {
      console.error("Error sending order email:", err);
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to send order email via SMTP.",
      });
    }
  });

  // API Route: Send Contact Form Email
  app.post("/api/send-contact-email", async (req, res) => {
    try {
      const { name, email, service, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Name, email, and message are required." });
      }

      const contactMailOptions = {
        from: `"ReviewSellStore Contact" <${smtpUser}>`,
        to: smtpUser,
        replyTo: email,
        subject: `📩 NEW CONTACT INQUIRY - ${name} (${service})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 18px; color: #38bdf8;">📬 New Contact Form Message</h2>
            </div>
            <div style="padding: 24px;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Service Requested:</strong> ${service}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 12px; font-size: 14px; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
        `
      };

      await transporter.sendMail(contactMailOptions);
      return res.json({ success: true, message: "Contact message sent successfully!" });
    } catch (err: any) {
      console.error("Contact Email Error:", err);
      return res.status(500).json({ success: false, error: err?.message || "Failed to send contact message." });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
