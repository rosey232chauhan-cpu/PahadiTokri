# PahadiTokri

HTML, CSS, and JavaScript storefront for Himalayan produce with a Node.js API and Razorpay payments (UPI, cards, net banking, wallets).

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   npm install --prefix server
   ```

2. **Configure payments (optional for COD)**

   Copy `server/.env.example` to `server/.env` and add [Razorpay test API keys](https://dashboard.razorpay.com/app/keys).

3. **Start the API** (terminal 1)

   ```bash
   npm run dev:server
   ```

4. **Start the frontend** (terminal 2)

   ```bash
   npm run dev
   ```

   Vite proxies `/api` to `http://localhost:3001`.

## Deploy to Netlify

Connect this repository to Netlify. The included `netlify.toml` builds the Vite site to `dist`, deploys `netlify/functions/api.mjs` as the API, routes `/api/*` requests to that function, and sends other paths to the single-page app.

Set these in **Site configuration → Environment variables** before deploying:

- `AUTH_TOKEN_SECRET`: a long, random secret used to sign account tokens.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: optional; required to enable online checkout. Cash on Delivery works without them.
- `RAZORPAY_WEBHOOK_SECRET` is not used by a webhook endpoint in this version; payment completion is verified through `/api/payments/verify`.

The API uses Netlify Blobs for accounts, orders, and contact form messages when deployed. Netlify provides the Blobs environment to deployed functions; local standalone development continues to use JSON files. `VITE_API_URL` should normally be unset so the frontend calls the same-origin `/api` routes. Do not set `CLIENT_ORIGIN` for the same-origin Netlify deployment.

Use Razorpay test keys first, then configure live keys before accepting real payments. UPI and Google Pay availability depend on the Razorpay account and the customer's device/account.

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Product catalog |
| POST | `/api/orders` | Create COD or online (Razorpay) order |
| POST | `/api/payments/verify` | Verify Razorpay payment signature |
| GET | `/api/orders/history?phone=` | Orders for a phone number |
| POST | `/api/contact` | Contact form submissions |

On Netlify, accounts, orders, and contact submissions persist in Netlify Blobs. The standalone local API uses JSON files in the configured `DATA_DIR` (defaults to the system temporary directory).
