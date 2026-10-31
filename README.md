# PahadiTokri

HTML, CSS, and JavaScript storefront for Himalayan produce with a Node.js API and Razorpay payments (UPI, cards, net banking, wallets).

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   npm install --prefix server
   ```

2. **Configure the store admin account**

   Copy `server/.env.example` to `server/.env`. The admin email is `rosey232chauhan@gmail.com`; set a unique `ADMIN_PASSWORD` of at least 12 characters and a random `AUTH_TOKEN_SECRET` of at least 32 characters. Keep `server/.env` private.

3. **Configure payments (optional for COD)**

   Add [Razorpay test API keys](https://dashboard.razorpay.com/app/keys) to `server/.env`.

4. **Start the API** (terminal 1)

   ```bash
   npm run dev:server
   ```

5. **Start the frontend** (terminal 2)

   ```bash
   npm run dev
   ```

   Vite proxies `/api` to `http://localhost:3001`.

## Store admin dashboard

Open `/admin` on the storefront and sign in with the configured admin email and password. The dashboard can update product names, descriptions, prices, and availability; add or remove custom homepage photo stories; and replace or restore the site logo, background, product and category images, Home walnut image, Farm Stories images, and About page images. Upload a JPEG, PNG, WebP, or GIF (up to 2 MB); removing a custom image restores the built-in image. Product prices and availability are also checked by the order API.

Admin credentials are provided only through server environment variables; there is no public admin registration endpoint. The only allowed admin email defaults to `rosey232chauhan@gmail.com`. On Netlify, set `ADMIN_EMAIL` to that address, choose a unique `ADMIN_PASSWORD` of at least 12 characters, and set a random `AUTH_TOKEN_SECRET` of at least 32 characters in **Site configuration > Environment variables**, then redeploy. Never share or commit the password or token secret. For local development, set these values in `server/.env`. Local image and catalog data is stored under `DATA_DIR` (default: the system temporary directory); on Netlify, it is stored in Netlify Blobs.

## Deploy to Netlify

Connect this repository to Netlify. The included `netlify.toml` builds the Vite site to `dist`, deploys `netlify/functions/api.mjs` as the API, routes `/api/*` requests to that function, and sends other paths to the single-page app.

Set these in **Site configuration > Environment variables** before deploying:

- `AUTH_TOKEN_SECRET`: a random secret of at least 32 characters used to sign account tokens and enable admin authentication.
- `ADMIN_EMAIL`: use `rosey232chauhan@gmail.com` for the store admin account.
- `ADMIN_PASSWORD`: a unique password of at least 12 characters; required to enable `/admin`.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`: optional; required to enable online checkout. Cash on Delivery works without them.
- `RAZORPAY_WEBHOOK_SECRET` is not used by a webhook endpoint in this version; payment completion is verified through `/api/payments/verify`.

The API uses Netlify Blobs for accounts, orders, contact form messages, admin-managed images, and product overrides when deployed. Netlify provides the Blobs environment to deployed functions; local standalone development continues to use JSON files. `VITE_API_URL` should normally be unset so the frontend calls the same-origin `/api` routes. Do not set `CLIENT_ORIGIN` for the same-origin Netlify deployment.

Use Razorpay test keys first, then configure live keys before accepting real payments. UPI and Google Pay availability depend on the Razorpay account and the customer's device/account.

## API overview

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/products` | Product catalog |
| POST | `/api/admin/login` | Sign in with the configured admin account |
| GET | `/api/admin/images` | List storefront images (admin token required) |
| POST | `/api/admin/images?target=product:<sku>` | Upload a product or category image (admin token required) |
| DELETE | `/api/admin/images/:target` | Remove a custom image and restore the built-in image (admin token required) |
| GET | `/api/admin/products` | List editable products (admin token required) |
| PUT | `/api/admin/products/:sku` | Update a product's name, description, price, or availability (admin token required) |
| GET | `/api/admin/photo-stories` | List custom homepage photo stories (admin token required) |
| POST | `/api/admin/photo-stories?title=...&label=...&description=...` | Add a photo story with an image body (admin token required) |
| DELETE | `/api/admin/photo-stories/:id` | Remove a custom photo story and its image (admin token required) |
| GET | `/api/media/:imageId` | Serve an uploaded image |
| POST | `/api/orders` | Create COD or online (Razorpay) order |
| POST | `/api/payments/verify` | Verify Razorpay payment signature |
| GET | `/api/orders/history?phone=` | Orders for a phone number |
| POST | `/api/contact` | Contact form submissions |

On Netlify, accounts, orders, contact submissions, product overrides, and uploaded images persist in Netlify Blobs. The standalone local API uses JSON files in the configured `DATA_DIR` (defaults to the system temporary directory).
