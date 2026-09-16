# 🚀 Deployment Guide: FarmVerse AI (Vercel Frontend + Railway Backend)

This guide covers step-by-step instructions to deploy your Frontend to **Vercel** and your Django Backend to **Railway**.

---

## 1. 🌐 Frontend Deployment (Vercel)

### Step 1: Import Repository
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** > **"Project"**.
3. Import your GitHub repository: `dwarkesh777/SIH-2026` (or your repo name).

### Step 2: Configure Project Settings
In the configuration screen before deploying:
- **Framework Preset**: `Vite`
- **Root Directory**: Click **Edit** and choose `farmeverse-main/frontend` *(Note: If you leave it at `/`, the root `vercel.json` will also build properly)*
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables
Under **Environment Variables**, add:
| Variable | Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `https://your-backend.up.railway.app/api` | Railway backend API URL (include `/api`) |

### Step 4: Deploy
- Click **"Deploy"**.
- Once deployed, note down your Vercel URL (e.g., `https://farmeverse.vercel.app`).

---

## 2. 🚂 Backend Deployment (Railway)

### Step 1: Create Railway Project
1. Log in to [Railway Dashboard](https://railway.app).
2. Click **"New Project"** > **"Deploy from GitHub repo"**.
3. Select your repository.

### Step 2: Configure Service Settings
1. In the Railway dashboard, click on your service.
2. Go to **Settings**:
   - **Root Directory**: `farmeverse-main/backend` *(Recommended)*
   - **Build Command**: Handled automatically by `railway.json` / `nixpacks.toml`
   - **Start Command**:
     ```bash
     python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 3 --timeout 120
     ```

### Step 3: Add PostgreSQL Database (Optional but Recommended)
1. Click **"+ New"** in your Railway project canvas.
2. Select **"Database"** > **"Add PostgreSQL"**.
3. Railway will automatically inject `DATABASE_URL` into your backend service. Django is already configured to detect and connect to it automatically.

### Step 4: Set Environment Variables
In your Railway backend service **Variables** tab, add:

| Variable | Recommended Value | Notes |
|---|---|---|
| `DEBUG` | `False` | Disables debug mode in production |
| `SECRET_KEY` | *(A long random secret string)* | e.g. `python -c "import secrets; print(secrets.token_urlsafe(50))"` |
| `JWT_SECRET_KEY` | *(A long random secret string)* | For signing JWT tokens |
| `ALLOWED_HOSTS` | `*` or `your-app.up.railway.app` | Allows Railway traffic |
| `CORS_ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` | Your Vercel frontend URL |
| `CSRF_TRUSTED_ORIGINS` | `https://*.railway.app,https://*.vercel.app,https://your-frontend.vercel.app` | Required for Django CSRF |
| `SECURE_SSL_REDIRECT` | `False` | Railway handles SSL termination at edge proxy |
| `GEMINI_API_KEY` | `your_gemini_api_key` | For AI Crop advisor & Farmer assistant |
| `OPENWEATHER_API_KEY` | `your_openweather_key` | For live weather forecasting |

### Step 5: Generate Public Domain
1. In your Backend Service, go to **Settings** > **Networking**.
2. Click **"Generate Domain"** (e.g., `farmeverse-production.up.railway.app`).
3. Copy this domain and update `VITE_API_BASE_URL` in Vercel to:
   `https://farmeverse-production.up.railway.app/api`

---

## 3. 🛡️ Verification Checklist

- [x] **SPA Routing**: `vercel.json` rewrites all client routes (`/(.*)`) to `/index.html` preventing 404 errors on refresh.
- [x] **Asset Caching**: Static assets in `/assets/` have 1-year immutable caching configured in `vercel.json`.
- [x] **WhiteNoise**: Django serves static admin files and DRF styles automatically in production.
- [x] **CORS & Regexes**: Automatically allows `*.vercel.app` preview and production origins.
- [x] **Media Support**: Production fallback route enabled for media uploads (disease detection & avatars).
