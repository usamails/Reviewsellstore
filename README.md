# ReviewSellStore - Aged & PVA Social & Developer Accounts Store

Official Repository: [https://github.com/usamails/Reviewsellstore](https://github.com/usamails/Reviewsellstore)

## Overview
**ReviewSellStore** is a high-converting e-commerce web application for purchasing aged USA Gmail accounts, Google Voice virtual numbers, TextNow/Talkatone/TextPlus accounts, aged GitHub developer profiles, and online review management services.

## Key Features
- **Instant Crypto Checkout**: Built-in support for BTC, ETH, USDT (TRC20/ERC20/BEP20), SOL, LTC, TRX, DOGE, and BNB.
- **Automated Order & Thank You Emails**: Express + Nodemailer integration sending real-time order alerts to store admin (`smmbuy2022@gmail.com`) and customer confirmation receipts.
- **Direct Telegram & WhatsApp Support**: One-click deep-link confirmation chats with pre-populated order summaries.
- **Netlify Ready**: Pre-configured with `netlify.toml` and `_redirects` SPA fallback.
- **Full-Stack Express + Vite**: Modular architecture with client-side routing, responsive Tailwind UI, and dark/light modes.

## Installation & Local Setup

```bash
# Clone the repository
git clone https://github.com/usamails/Reviewsellstore.git
cd Reviewsellstore

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Environment Variables (.env)

```env
SMTP_USER="smmbuy2022@gmail.com"
SMTP_PASS="cozi ibbt kzwp xato"
```

## Deployment

### Netlify Deployment
1. Connect `https://github.com/usamails/Reviewsellstore` to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` automatically handles SPA routing redirects.

---
© ReviewSellStore. All rights reserved.
