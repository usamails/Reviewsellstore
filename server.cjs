var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_nodemailer = __toESM(require("nodemailer"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  const smtpUser = process.env.SMTP_USER || "smmbuy2022@gmail.com";
  const smtpPass = process.env.SMTP_PASS || "cozi ibbt kzwp xato";
  const transporter = import_nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });
  app.post("/api/send-order-email", async (req, res) => {
    try {
      const {
        customerEmail,
        telegram,
        whatsapp,
        txNote,
        selectedCrypto,
        orderItems,
        orderTotal
      } = req.body;
      if (!customerEmail || !orderItems || orderItems.length === 0) {
        return res.status(400).json({
          success: false,
          error: "Customer email and order items are required."
        });
      }
      const itemsHtml = orderItems.map(
        (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #1e293b;">
            ${item.title} <span style="color: #64748b; font-size: 12px;">(${item.variantName})</span>
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: center; color: #334155;">
            x${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 700; color: #2563eb;">
            $${(item.price * item.quantity).toFixed(2)} USD
          </td>
        </tr>
      `
      ).join("");
      const adminMailOptions = {
        from: `"ReviewSellStore Orders" <${smtpUser}>`,
        to: smtpUser,
        subject: `\u{1F6D2} NEW ORDER RECEIVED - $${Number(orderTotal).toFixed(2)} USD (${customerEmail})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; color: #38bdf8;">\u{1F525} New Customer Order Alert</h2>
              <p style="margin: 5px 0 0 0; font-size: 13px; color: #94a3b8;">ReviewSellStore Instant Order System</p>
            </div>
            <div style="padding: 24px;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 16px;">Customer Details:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 140px;">Customer Email:</td>
                  <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${customerEmail}</td>
                </tr>
                ${telegram ? `<tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Telegram:</td>
                  <td style="padding: 6px 0; color: #0284c7; font-weight: bold;">${telegram}</td>
                </tr>` : ""}
                ${whatsapp ? `<tr>
                  <td style="padding: 6px 0; color: #64748b; font-weight: bold;">WhatsApp:</td>
                  <td style="padding: 6px 0; color: #16a34a; font-weight: bold;">${whatsapp}</td>
                </tr>` : ""}
              </table>

              <h3 style="margin-top: 20px; color: #0f172a; font-size: 16px;">Payment Information:</h3>
              <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px;">
                <p style="margin: 4px 0;"><strong>Selected Payment:</strong> ${selectedCrypto?.name || "Crypto"} (${selectedCrypto?.symbol || ""} - ${selectedCrypto?.network || ""})</p>
                <p style="margin: 4px 0;"><strong>Deposit Address:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${selectedCrypto?.address || "N/A"}</code></p>
                ${txNote ? `<p style="margin: 4px 0; color: #2563eb;"><strong>Tx Hash / Note:</strong> ${txNote}</p>` : ""}
              </div>

              <h3 style="margin-top: 20px; color: #0f172a; font-size: 16px;">Ordered Items:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <thead>
                  <tr style="background-color: #f1f5f9; text-align: left; font-size: 12px; text-transform: uppercase; color: #475569;">
                    <th style="padding: 10px;">Item & Variant</th>
                    <th style="padding: 10px; text-align: center;">Qty</th>
                    <th style="padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <div style="text-align: right; padding: 12px; background-color: #eff6ff; border-radius: 8px; font-size: 16px; font-weight: bold; color: #1d4ed8;">
                Total Order Amount: $${Number(orderTotal).toFixed(2)} USD
              </div>
            </div>
            <div style="background-color: #f8fafc; padding: 12px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
              Sent automatically from ReviewSellStore Express Server
            </div>
          </div>
        `
      };
      const customerMailOptions = {
        from: `"ReviewSellStore" <${smtpUser}>`,
        to: customerEmail,
        subject: `Order Confirmation & Thank You! - ReviewSellStore`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 22px; color: #38bdf8;">Thank You For Your Order! \u{1F389}</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #cbd5e1;">ReviewSellStore \u2022 Premium Verified Accounts & Reputation Services</p>
            </div>

            <div style="padding: 24px;">
              <p style="font-size: 15px; color: #334155; line-height: 1.6;">
                Hello,
              </p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6;">
                We have received your order request! Our team is verifying your payment details and preparing your credential dispatch. Below is your order summary:
              </p>

              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #0f172a; font-size: 15px; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                  <thead>
                    <tr style="text-align: left; color: #64748b;">
                      <th style="padding: 6px 0;">Item</th>
                      <th style="padding: 6px 0; text-align: center;">Qty</th>
                      <th style="padding: 6px 0; text-align: right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                <div style="border-top: 2px solid #0284c7; margin-top: 12px; padding-top: 10px; text-align: right; font-size: 15px; font-weight: bold; color: #0f172a;">
                  Total Amount: $${Number(orderTotal).toFixed(2)} USD
                </div>
              </div>

              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px;">\u{1F4B3} Payment Details Selected:</h4>
                <p style="margin: 4px 0; font-size: 13px; color: #15803d;">
                  <strong>Currency:</strong> ${selectedCrypto?.name || "Crypto"} (${selectedCrypto?.symbol || ""} - ${selectedCrypto?.network || ""})
                </p>
                <p style="margin: 4px 0; font-size: 12px; color: #334155; word-break: break-all;">
                  <strong>Deposit Address:</strong> <code style="background: #ffffff; padding: 2px 6px; border: 1px solid #cbd5e1; border-radius: 4px;">${selectedCrypto?.address || "N/A"}</code>
                </p>
              </div>

              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                <h4 style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px;">\u{1F4AC} Need Instant Support or Speed Up Dispatch?</h4>
                <p style="margin: 4px 0; font-size: 13px; color: #1e3a8a;">
                  You can contact our 24/7 live team anytime on Telegram or WhatsApp with your order email:
                </p>
                <p style="margin: 8px 0 0 0; font-size: 13px;">
                  \u{1F4F1} <strong>Telegram:</strong> <a href="https://t.me/EgSupport24" style="color: #0284c7; font-weight: bold; text-decoration: underline;">@EgSupport24</a><br/>
                  \u{1F4DE} <strong>WhatsApp:</strong> <a href="https://wa.me/13073939979" style="color: #16a34a; font-weight: bold; text-decoration: underline;">+1 307-393-9979</a><br/>
                  \u{1F4E7} <strong>Official Email:</strong> smmbuy2022@gmail.com
                </p>
              </div>

              <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-top: 24px;">
                Thank you for choosing <strong>ReviewSellStore</strong>! We appreciate your business.
              </p>
            </div>

            <div style="background-color: #0f172a; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
              \xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} ReviewSellStore. All rights reserved.
            </div>
          </div>
        `
      };
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(customerMailOptions)
      ]);
      return res.json({
        success: true,
        message: "Order emails sent successfully!"
      });
    } catch (err) {
      console.error("Error sending order email:", err);
      return res.status(500).json({
        success: false,
        error: err?.message || "Failed to send order email via SMTP."
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
