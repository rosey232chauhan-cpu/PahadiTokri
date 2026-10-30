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
   Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a random `AUTH_TOKEN_SECRET` of at least 32 characters in that file to enable admin image management. Never commit `server/.env`.

3. **Start the API** (terminal 1)

   ```bash
   npm run dev:server
   ```

4. **Start the frontend** (terminal 2)

   ```bash
   npm run dev
   ```

   Vite proxies `/api` to `http://localhost:3001`.

## Admin image management

Open `/admin` on the storefront and sign in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured on the API server. The dashboard can upload a JPEG, PNG, WebP, or GIF (up to 2 MB) for any product or product category. Removing a custom image restores the built-in image. Changes are reflected in the storefront, product catalog, and cart.

Admin credentials are provided only through server environment variables; there is no public admin registration endpoint. Use a unique password and a random `AUTH_TOKEN_SECRET` of at least 32 characters. Local image data is stored in `DATA_DIR/images.json` (default: the system temporary directory); on Netlify, image data is stored in Netlify Blobs.

## Deploy to Netlify

Connect this repository to Netlify. The included `netlify.toml` builds the Vite site to `dist`, deploys `netlify/functions/api.mjs` as the API, routes `/api/*` requests to that function, and sends other paths to the single-page app.

Set these in **Site configuration → Environment variables** before deploying:

- `AUTH_TOKEN_SECRET`: a random secret of at least 32 characters used to sign account tokens and enable admin authentication.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: required to enable `/admin` image management.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: optional; required to enable online checkout. Cash on Delivery works without them.
- `RAZORPAY_WEBHOOK_SECRET` is not used by a webhook endpoint in this version; payment completion is verified through `/api/payments/verify`.

The API uses Netlify Blobs for accounts, orders, contact form messages, and admin-managed images when deployed. Netlify provides the Blobs environment to deployed functions; local standalone development continues to use JSON files. `VITE_API_URL` should normally be unset so the frontend calls the same-origin `/api` routes. Do not set `CLIENT_ORIGIN` for the same-origin Netlify deployment.

Use Razorpay test keys first, then configure live keys before accepting real payments. UPI and Google Pay availability depend on the Razorpay account and the customer's device/account.

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Product catalog |
| POST | `/api/admin/login` | Sign in with the configured admin account |
| GET | `/api/admin/images` | List storefront images (admin token required) |
| POST | `/api/admin/images?target=product:<sku>` | Upload a product or category image (admin token required) |
| DELETE | `/api/admin/images/:target` | Remove a custom image and restore the built-in image (admin token required) |
| GET | `/api/media/:imageId` | Serve an uploaded image |
| POST | `/api/orders` | Create COD or online (Razorpay) order |
| POST | `/api/payments/verify` | Verify Razorpay payment signature |
| GET | `/api/orders/history?phone=` | Orders for a phone number |
| POST | `/api/contact` | Contact form submissions |

On Netlify, accounts, orders, contact submissions, and uploaded images persist in Netlify Blobs. The standalone local API uses JSON files in the configured `DATA_DIR` (defaults to the system temporary directory).
