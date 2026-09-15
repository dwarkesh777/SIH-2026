# 🌾 FarmeVerse AI (AgriSmart AI)

### Intelligent Agriculture & Precision Farming Decision-Support Ecosystem

*Transforming smallholder and commercial agriculture through Deep Learning, IoT Telemetry, Agro-Hydrological Science, and Multilingual Agentic AI.*

---

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django 4.2](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TensorFlow 2.12+](https://img.shields.io/badge/TensorFlow-2.12%2B-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://tensorflow.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Macro-F1 Score](https://img.shields.io/badge/Macro--F1-0.9184-brightgreen?style=for-the-badge&logo=ai&logoColor=white)](farmeverse-main/report/model_report.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Value Proposition](#-key-value-proposition)
3. [Ecosystem Portals & User Roles](#-ecosystem-portals--user-roles)
4. [Comprehensive Feature Matrix](#-comprehensive-feature-matrix)
5. [Core Deep Learning & Science Models](#-core-deep-learning--science-models)
6. [System Architecture & Data Flow](#-system-architecture--data-flow)
7. [Tech Stack](#-tech-stack)
8. [Repository Directory Structure](#-repository-directory-structure)
9. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
10. [Quick Start & Local Setup Guide](#-quick-start--local-setup-guide)
11. [Environment Variables Configuration](#-environment-variables-configuration)
12. [Verification & Test Suite](#-verification--test-suite)
13. [API Endpoints Reference](#-api-endpoints-reference)
14. [Deployment Guide](#-deployment-guide)
15. [Limitations & Roadmap](#-limitations--roadmap)
16. [Contributing & License](#-contributing--license)

---

## 🌟 Project Overview

**FarmeVerse AI** (also recognized as **AgriSmart AI**) is a modern, unified precision agriculture and farm management platform engineered to tackle critical challenges faced by farmers in India and developing agricultural economies. By integrating **Computer Vision foliar diagnostics**, **Machine Learning crop suitability analysis**, **FAO-56 Penman-Monteith scientific irrigation modeling**, **real-time agrometeorological forecasting**, **IoT telemetry streaming**, and **Multilingual Generative AI with voice recognition (STT/TTS)**, FarmeVerse empowers farmers with end-to-end, actionable intelligence from seed to sale.

Whether accessed via smartphone, tablet, or desktop in local languages (**Gujarati, Hindi, English**), the platform provides real-time decision-support to maximize crop yields, prevent disease outbreaks, conserve freshwater resources, minimize chemical inputs, and optimize harvest profitability.

---

## 💡 Key Value Proposition

- 🔬 **High-Accuracy Disease Detection**: MobileNetV2 deep learning model with **92.40% Accuracy** and **0.9184 Macro-F1** across 21 foliar disease categories with organic and chemical remedies.
- 💧 **Water Conservation by Science**: FAO-56 Penman-Monteith evapo-transpiration water balance model that computes exact water deficit and pump runtimes, curbing over-irrigation.
- 🌾 **Hyper-Localized Crop Recommendations**: Machine learning model trained on regional Indian/Gujarat agricultural data recommending optimal crops based on soil nutrients, pH, rainfall, temperature, and season.
- 🗣️ **Accessible Multilingual GenAI & Voice Assistant**: Voice-enabled conversational AI supporting **Gujarati (`gu`)**, **Hindi (`hi`)**, and **English (`en`)** powered by Google Gemini, grounded in live farm telemetry.
- 📡 **Real-Time IoT Sensor Integration**: Simulated and hardware-ready ESP32/Raspberry Pi telemetry feeds tracking soil moisture, temperature, electrical conductivity, pH, and ambient humidity.
- 🤖 **Autonomous Agentic Advisory**: An automated **Observe $\rightarrow$ Reason $\rightarrow$ Decide $\rightarrow$ Act / Notify** loop delivering auditable, transparent recommendations.
- 📊 **Real Mandi Price Intelligence**: Live APMC market price tracking and trend analytics sourced from Agmarknet.
- 🏛️ **Government Subsidies & Schemes Directory**: Comprehensive central and state (e.g., i-Khedut, PM-KISAN) scheme navigator with eligibility filters and application walkthroughs.

---

## 👥 Ecosystem Portals & User Roles

FarmeVerse AI features a role-based architecture with distinct interfaces tailored to key stakeholders:

```
                               ┌────────────────────────────────┐
                               │   FarmeVerse AI Unified Auth   │
                               └───────────────┬────────────────┘
                                               │
               ┌───────────────────────────────┼───────────────────────────────┐
               ▼                               ▼                               ▼
     ┌───────────────────┐           ┌───────────────────┐           ┌───────────────────┐
     │   Farmer Portal   │           │   Expert Portal   │           │   Admin Portal    │
     │  (Field Decision) │           │ (Agronomy Support)│           │ (System & Audit)  │
     └───────────────────┘           └───────────────────┘           └───────────────────┘
```

### 1. 👨‍🌾 Farmer Portal
- **Interactive Dashboard**: Farm metrics, weather snapshot, quick-action shortcuts, and health summaries.
- **Disease Diagnosis**: Instant leaf image upload/capture with instant pathology classification and prescription.
- **Smart Irrigation**: Real-time soil moisture and pump runtime recommendations.
- **Crop Planning & Records**: Digital farm field mapping, sowing logs, expense ledgers, and harvest estimates.
- **Crop Recommendation**: Soil and climate-informed crop suitability selector.
- **Mandi Prices**: APMC market price tracking across districts and commodities.
- **Profit Calculator**: Production cost vs. expected market realization estimator.
- **Sustainability Score**: Eco-rating benchmark ($0-100$) with water and carbon footprint indicators.
- **Voice Assistant**: Gujarati/Hindi/English conversational bot with microphone STT and audio TTS.
- **Expert Consultations**: Direct chat with certified agronomists and extension specialists.

### 2. 🧑‍🔬 Agriculture Expert Portal
- **Consultation Inbox**: Queue of farmer queries categorized by urgency and crop category.
- **Case Review & Diagnosis**: View high-resolution leaf images, farmer field metadata, and historical records.
- **Prescription & Advisory**: Submit expert responses, chemical/biological treatment plans, and cultural practices.
- **Availability Management**: Toggle consultation availability and view ratings/feedback.

### 3. 🛡️ Admin Portal
- **Analytics & Telemetry**: Farm telemetry logs, regional crop distribution, system utilization rates.
- **User & Role Administration**: Manage farmer accounts, verify agricultural expert credentials.
- **Government Schemes CMS**: Add, update, and manage state and national welfare schemes.
- **Export Reports**: Generate downloadable telemetry and performance reports (CSV/JSON).

---

## 🧩 Comprehensive Feature Matrix

| Module | Classification | Description & Capabilities | Status |
| :--- | :---: | :--- | :---: |
| **Foliar Disease Detection** | **Core Computer Vision** | 21-class leaf disease classifier trained on PlantVillage and PlantDoc field benchmarks. Outputs diagnosis, confidence score, organic remedies, chemical treatments, and prevention guidelines. | ✅ Production Ready |
| **Crop Recommendation Engine** | **Machine Learning** | Random Forest algorithm predicting optimal crops based on N-P-K, soil type, pH, rainfall, temperature, humidity, season, and district (with specialized Gujarat datasets). | ✅ Production Ready |
| **Smart Irrigation Advisor** | **Agro-Hydrology (FAO-56)** | Computes root-zone water balance, reference evapotranspiration ($ET_0$), water deficit (mm), and precise pump run times (hrs/mins) taking rainfall forecast into account. | ✅ Production Ready |
| **Weather Intelligence & Spray Windows** | **Agrometeorology** | 5-day / 3-hour agrometeorological forecast feeds via OpenWeatherMap, extreme weather alerts (frost, heatwave, storm), and optimal chemical spraying windows. | ✅ Production Ready |
| **Sustainability & Eco-Score** | **Environmental Science** | Transparent reproducible formula ($0-100$) evaluating Water Efficiency (40%), Soil & Bio-Input Health (35%), and IPM Practices (25%). Quantifies annual liters saved and $CO_2$ offset. | ✅ Production Ready |
| **Multilingual GenAI Assistant** | **Conversational AI** | LLM-backed agronomist assistant (Google Gemini) supporting Gujarati, Hindi, and English with voice speech-to-text (STT) and text-to-speech (TTS) synthesis. Grounded in user's farm records. | ✅ Production Ready |
| **IoT Sensor Telemetry Stream** | **Hardware / IoT Simulation** | Live sensor telemetry stream (Soil Moisture, Soil Temp, Humidity, pH, N-P-K) mimicking ESP32/Raspberry Pi gateway with 24-hour historical logging. | ✅ Production Ready |
| **Autonomous Agentic Advisor** | **Agentic AI** | Closed-loop **Observe $\rightarrow$ Reason $\rightarrow$ Decide $\rightarrow$ Act / Notify** pipeline generating priority-ranked interventions with a step-by-step reasoning audit trail. | ✅ Production Ready |
| **Mandi Market Prices** | **Market Intelligence** | Live APMC mandi price tracking and price analytics across agricultural commodities and districts via Agmarknet data ingestion. | ✅ Production Ready |
| **Farm & Crop Records** | **Farm Management** | Multi-plot farm registration, crop life-cycle stages (sowing, vegetative, flowering, maturity), input cost tracking, and harvest logging. | ✅ Production Ready |
| **Profit & Yield Calculator** | **Agri-Economics** | Cultivation cost vs. yield and market rate calculator providing projected net margin and break-even analysis. | ✅ Production Ready |
| **Government Schemes Directory** | **Policy & Welfare** | Curated catalog of national and Gujarat state agricultural schemes (PM-KISAN, PMFBY, i-Khedut, Solar Pump, Micro Irrigation) with eligibility checkers. | ✅ Production Ready |
| **Farmer-Expert Tele-Consultation** | **Collaborative Care** | Two-way communication thread between farmers and certified agronomists with photo attachments, prescriptions, and rating system. | ✅ Production Ready |

---

## 🧠 Core Deep Learning & Science Models

### 1. Foliar Disease Classification Model
- **Architecture**: `MobileNetV2` / `MobileNetV3` transfer learning backbone pretrained on ImageNet.
- **Custom Classification Head**:
  $$\text{Input (224}\times\text{224}\times\text{3)} \rightarrow \text{MobileNetV2} \rightarrow \text{GlobalAveragePooling2D} \rightarrow \text{BatchNorm} \rightarrow \text{Dropout(0.3)} \rightarrow \text{Dense(256, ReLU)} \rightarrow \text{Dropout(0.2)} \rightarrow \text{Dense(21, Softmax)}$$
- **Target Classes (21 foliar states)**:
  - **Apple**: Scab, Black Rot, Healthy
  - **Bell Pepper**: Bacterial Spot, Healthy
  - **Corn (Maize)**: Common Rust, Grey Leaf Spot, Healthy
  - **Grape**: Black Rot, Leaf Blight (Isariopsis), Healthy
  - **Potato**: Early Blight, Late Blight, Healthy
  - **Tomato**: Bacterial Spot, Early Blight, Late Blight, Leaf Mould, Septoria Leaf Spot, Yellow Leaf Curl Virus (TYLCV), Healthy
- **Performance Benchmarks**:
  - **Macro-F1 Score**: `0.9184` *(+17.4% relative gain over baseline `0.7820`)*
  - **Overall Accuracy**: `92.40%`
  - **Macro Precision**: `0.9215` | **Macro Recall**: `0.9162`
  - **Inference Latency**: ~45 ms on CPU / ~12 ms on GPU

### 2. Smart Irrigation Engine (FAO-56 Penman-Monteith)
Root-zone soil water balance is modeled following the internationally validated Food and Agriculture Organization (FAO-56) guidelines:

$$ET_c = K_c \times ET_0$$

$$\text{Deficit (mm)} = (\text{Field Capacity} - \text{Current Soil Moisture}) \times \text{Root Depth} \times \text{Soil Bulk Density}$$

- Takes into account: Crop growth stage coefficient ($K_c$), soil type hydraulic conductivity, upcoming 24-hour rainfall forecast, and irrigation method efficiency (Drip: 90%, Sprinkler: 75%, Flood: 60%).
- Outputs: Decision status (`IRRIGATE_NOW`, `MONITOR`, `RAIN_DELAY`), recommended water volume ($m^3$/acre), and pump runtime (hours).

### 3. Sustainability Score Formula
A deterministic, reproducible scoring framework ($0 - 100$) evaluating agricultural stewardship:

$$\text{Sustainability Score} = 0.40 \times S_{\text{water}} + 0.35 \times S_{\text{soil/inputs}} + 0.25 \times S_{\text{IPM/biodiversity}}$$

- **Water Efficiency ($40\%$)**: Drip/micro-irrigation, sensor scheduling, rainwater harvesting.
- **Resource Stewardship ($35\%$)**: Organic manure percentage, Soil Health Card adherence, crop rotation.
- **IPM & Crop Health ($25\%$)**: Bio-pesticides adoption, early AI disease screening, reduced chemical spray counts.
- **Quantified Impact Outputs**: Estimated annual water savings (liters) and greenhouse gas offset ($\text{kg CO}_2\text{e}$).

---

## 🏗️ System Architecture & Data Flow

```
   ┌──────────────────────────────┐                ┌──────────────────────────────┐
   │     Physical Farm Layer      │                │       Agro Data Feeds        │
   │  ESP32 / LoRa / Soil Sensors │                │  Agmarknet / OpenWeather API │
   └──────────────┬───────────────┘                └──────────────┬───────────────┘
                  │ Telemetry Stream                              │ REST Ingestion
                  ▼                                               ▼
   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                      FarmeVerse Django REST Backend API                      │
   │  ┌──────────────────────┬──────────────────────┬──────────────────────────┐  │
   │  │  JWT Authentication  │ Farm & Crop Records  │ Expert Consultation Chat │  │
   │  ├──────────────────────┼──────────────────────┼──────────────────────────┤  │
   │  │ MobileNetV2 Disease  │ FAO-56 Irrigation    │ Multilingual Gemini GenAI│  │
   │  │ Detection Engine     │ Engineering Engine   │ Conversational Agent     │  │
   │  ├──────────────────────┼──────────────────────┼──────────────────────────┤  │
   │  │ Scikit-Learn Crop    │ Sustainability Score │ Agentic Reasoning Loop   │  │
   │  │ Recommendation       │ Formula Engine       │ (Observe-Reason-Act)     │  │
   │  └──────────────────────┴──────────────────────┴──────────────────────────┘  │
   └──────────────────────────────────────┬───────────────────────────────────────┘
                                          │ JSON / REST APIs
                                          ▼
   ┌──────────────────────────────────────────────────────────────────────────────┐
   │                   React 18 + Vite + Tailwind CSS Frontend                    │
   │  ┌─────────────────────────────────┬──────────────────────────────────────┐  │
   │  │ Responsive Mobile-First Design  │ Web Speech API (STT Voice Input)     │  │
   │  ├─────────────────────────────────┼──────────────────────────────────────┤  │
   │  │ Framer Motion & Lucide Visuals  │ Responsive Audio (TTS Gujarati/Hindi)│  │
   │  ├─────────────────────────────────┼──────────────────────────────────────┤  │
   │  │ Farmer Portal Dashboard         │ Expert Review & Prescription Studio  │  │
   │  └─────────────────────────────────┴──────────────────────────────────────┘  │
   └──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Backend & Machine Learning
- **Core Framework**: [Django 4.2](https://www.djangoproject.com/) & [Django REST Framework 3.14](https://www.django-rest-framework.org/)
- **Authentication**: [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/) (JSON Web Tokens) with role-based authorization
- **Deep Learning**: [TensorFlow 2.12+](https://tensorflow.org/) & [Keras](https://keras.io/)
- **Machine Learning**: [Scikit-Learn](https://scikit-learn.org/), [Pandas](https://pandas.pydata.org/), [NumPy](https://numpy.org/)
- **Image Processing**: [Pillow (PIL)](https://pillow.readthedocs.io/)
- **Generative AI**: [Google Generative AI (Gemini SDK)](https://ai.google.dev/)
- **Database**: SQLite3 (Development) / PostgreSQL (Production ready)
- **Web Server**: [Gunicorn](https://gunicorn.org/) (WSGI)

### Frontend & Client Applications
- **Framework**: [React 18.2](https://reactjs.org/) (Single Page Application)
- **Build Tool**: [Vite 5.4](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.3](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **UI Animations**: [Framer Motion 12](https://www.framer.com/motion/) & [GSAP 3.15](https://greensock.com/gsap/)
- **3D Visuals**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/) with JWT interceptors
- **Routing**: [React Router DOM 6.14](https://reactrouter.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)

---

## 📁 Repository Directory Structure

```text
farmeverse-main/
│
├── farmeverse-main/                     # Main project directory
│   ├── backend/                         # Django REST Framework Backend
│   │   ├── adminpanel/                  # Admin management & system analytics
│   │   ├── agentic_advisor/             # Autonomous Observe-Reason-Act loop
│   │   ├── analytics/                   # Platform telemetry & user reports
│   │   ├── authentication/              # Multi-role JWT register/login/OTP
│   │   ├── common/                      # Shared utilities & response formatters
│   │   ├── config/                      # Django project settings & URLs
│   │   ├── consultation/                # Farmer-Expert consultation threads
│   │   ├── crop_management/             # Plot & planting lifecycle tracking
│   │   ├── crop_recommendation/         # ML crop suitability engine
│   │   ├── disease_detection/           # MobileNetV2 leaf disease detection
│   │   ├── expert/                      # Expert profile & dashboard services
│   │   ├── farm_records/                # Farm plots, crops, expenses & yields
│   │   ├── farmer/                      # Farmer profile & dashboard endpoints
│   │   ├── farmer_assistant/            # Multilingual GenAI & voice services
│   │   ├── government_schemes/          # Schemes & subsidies directory
│   │   ├── iot_sensors/                 # Simulated & hardware IoT gateway
│   │   ├── market_prices/               # Mandi price scraper & analytics
│   │   ├── smart_irrigation/            # FAO-56 irrigation balance engine
│   │   ├── sustainability/              # Eco-score & carbon/water impact
│   │   ├── users/                       # Custom user model & profile logic
│   │   ├── weather/                     # OpenWeather API integration
│   │   ├── manage.py                    # Django management script
│   │   ├── requirements.txt             # Python backend dependencies
│   │   └── .env.example                 # Sample environment configuration
│   │
│   ├── frontend/                        # React 18 + Vite Frontend
│   │   ├── src/
│   │   │   ├── assets/                  # Images, illustrations, and logos
│   │   │   ├── components/              # Reusable UI components (Navbar, Modal, etc.)
│   │   │   ├── context/                 # AuthContext & LanguageContext
│   │   │   ├── locales/                 # English, Hindi, and Gujarati translations
│   │   │   ├── pages/
│   │   │   │   ├── Admin/               # Admin dashboard, schemes CMS, analytics
│   │   │   │   ├── Authentication/      # Login, Register, Forgot Password flows
│   │   │   │   ├── Expert/              # Expert inbox, availability, thread viewer
│   │   │   │   ├── Farmer/              # 12+ Farmer modules & tools
│   │   │   │   ├── LandingPage.jsx      # High-conversion public homepage
│   │   │   │   └── Public/              # Terms of service, privacy policy
│   │   │   ├── services/                # Axios API service callers
│   │   │   ├── utils/                   # Formatting, date, and crop utilities
│   │   │   ├── App.jsx                  # Main route declaration
│   │   │   └── main.jsx                 # React root mount
│   │   ├── package.json                 # Node dependencies & npm scripts
│   │   ├── tailwind.config.js           # Tailwind configuration
│   │   ├── vite.config.js               # Vite bundler configuration
│   │   └── .env.example                 # Frontend environment sample
│   │
│   ├── model/                           # Disease detection model inference
│   │   ├── classes.py                   # 21 target disease classes & descriptions
│   │   ├── predict.py                   # Standalone inference function & CLI
│   │   ├── evaluate_model.py            # Evaluation & metric calculation script
│   │   └── train_disease_model.py       # Transfer learning training pipeline
│   │
│   ├── trained_models/                  # Serialized weights & encoders
│   │   ├── crop_model.pkl               # Trained Crop Recommendation model
│   │   ├── farmverse_cotton_model.keras # Keras leaf disease model weights
│   │   └── *.pkl                        # District, soil, season encoders
│   │
│   ├── report/                          # Technical documentation & reports
│   │   └── model_report.md              # 1-Page verified Model Evaluation Report
│   │
│   ├── evaluation_summary.json          # Machine-readable per-class metrics
│   ├── run_verification.py              # End-to-end verification test suite
│   ├── schemes.json                     # Database of verified government schemes
│   └── vercel.json                      # Vercel deployment configuration
│
├── .gitignore                           # Git ignore rules
├── first.mp4                            # Video demonstration part 1
├── secound.mp4                          # Video demonstration part 2
├── make_part__gwr_video_mvp.mp4         # Walkthrough MVP demo
└── README.md                            # Primary documentation (this file)
```

---

## ⚙️ Prerequisites & System Requirements

Ensure you have the following software installed on your development machine:

- **Python**: `3.10.x` or `3.11.x` (64-bit)
- **Node.js**: `18.x` or `20.x` (LTS recommended)
- **Package Managers**: `pip` (Python) and `npm` or `yarn` (Node.js)
- **Operating System**: Windows 10/11, Ubuntu 20.04+, or macOS
- **RAM**: Minimum 4 GB (8 GB+ recommended for TensorFlow model loading)

---

## 🚀 Quick Start & Local Setup Guide

Follow these steps to set up and run the entire platform locally in **under 10 minutes**:

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/farmeverse.git
cd farmeverse/farmeverse-main
```

---

### Step 2: Backend Setup (Django REST API)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment**:
   - **On Windows (PowerShell / Command Prompt)**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **On Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Create a `.env` file inside `backend/` (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```

5. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

6. **(Optional) Create a superuser or populate schemes**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django development server**:
   ```bash
   python manage.py runserver 127.0.0.1:8000
   ```
   The backend API will be live at: **`http://127.0.0.1:8000/`**

---

### Step 3: Frontend Setup (React 18 + Vite)

1. **Open a new terminal window** and navigate to `frontend/`:
   ```bash
   cd farmeverse/farmeverse-main/frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Configure frontend environment variables**:
   Create a `.env` file inside `frontend/`:
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000/api
   ```

4. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser and visit: **`http://localhost:5173/`**

---

### Step 4: Standalone Inference via CLI (One-Liner)

You can run foliar disease prediction on any leaf image without starting the backend web server:

```bash
cd farmeverse/farmeverse-main

# Run inference and print formatted JSON
python model/predict.py --image path/to/leaf_image.jpg --json
```

Or call it directly in Python:
```python
from model.predict import predict

result = predict("path/to/leaf_image.jpg", return_dict=True)
print(f"Disease: {result['prediction']}")
print(f"Confidence: {result['confidence']:.2%}")
print(f"Organic Remedy: {result['organic_remedy']}")
```

---

## 🔐 Environment Variables Configuration

### Backend `.env` (`backend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DEBUG` | Enables Django debug mode | `True` (Dev) / `False` (Prod) |
| `SECRET_KEY` | Django cryptographic secret key | `your-long-random-secret-string` |
| `ALLOWED_HOSTS` | Comma-separated allowed hostnames | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins | `http://localhost:5173,http://127.0.0.1:5173` |
| `OPENWEATHER_API_KEY` | OpenWeatherMap API key for live forecasts | `your_openweather_api_key_here` |
| `GEMINI_API_KEY` | Google AI Studio Gemini API Key | `your_gemini_api_key_here` |
| `JWT_SECRET_KEY` | Secret key used for signing JWT tokens | `jwt-secret-string` |
| `ACCESS_TOKEN_LIFETIME_MINUTES` | Lifetime of JWT Access Token | `60` |
| `EMAIL_HOST` | SMTP server for OTP emails | `smtp.gmail.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_HOST_USER` | Email username for notification dispatch | `your-email@gmail.com` |
| `EMAIL_HOST_PASSWORD` | App-specific password for SMTP | `your-app-password` |

### Frontend `.env` (`frontend/.env`)

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base endpoint URL of the backend API | `http://127.0.0.1:8000/api` |

---

## 🧪 Verification & Test Suite

FarmeVerse includes an automated verification test suite (`run_verification.py`) that executes end-to-end integration tests across all core and bonus modules:

```bash
cd farmeverse/farmeverse-main
python run_verification.py
```

### What `run_verification.py` Validates:
1. **[TEST 1/6] Core Disease Prediction CLI & Module**: Evaluates image tensor loading, model inference, and output dictionary consistency.
2. **[TEST 2/6] Smart Irrigation Engine**: Validates FAO-56 soil water deficit calculation, irrigation status (`IRRIGATE_NOW`), and pump runtime estimates.
3. **[TEST 3/6] Sustainability Score Engine**: Tests scoring logic, tier categorization, water savings, and carbon offset quantification.
4. **[TEST 4/6] IoT Telemetry Gateway**: Simulates ESP32 node readings (Moisture, Temp, pH, N-P-K) and historical time-series retrieval.
5. **[TEST 5/6] Agentic Autonomous Advisor**: Executes an **Observe-Reason-Decide-Act** cycle and verifies the auditable reasoning chain.
6. **[TEST 6/6] GenAI Farmer Assistant**: Tests multilingual conversation generation in **Gujarati (`gu`)** and **English (`en`)**.

---

## 📡 API Endpoints Reference

All endpoints are prefixed with `/api/`. Authentication is performed via `Authorization: Bearer <access_token>`.

### Authentication & Users (`/api/auth/` & `/api/users/`)
- `POST /api/auth/register/` — Register new user (Farmer, Expert, Admin)
- `POST /api/auth/login/` — Authenticate and receive JWT access/refresh tokens
- `GET /api/auth/profile/` — Fetch authenticated user profile
- `POST /api/auth/forgot-password/` — Request password reset OTP
- `POST /api/auth/verify-otp/` — Verify OTP for password recovery
- `POST /api/auth/reset-password/` — Set new password with verified OTP

### Disease Detection (`/api/disease-detection/`)
- `POST /api/disease-detection/upload/` — Upload leaf image for analysis
- `POST /api/disease-detection/predict/` — Execute prediction on uploaded leaf image
- `GET /api/disease-detection/history/` — List past diagnosis records for logged-in farmer
- `GET /api/disease-detection/history/<id>/` — Retrieve full pathology report and remedies

### Crop Recommendation (`/api/crop-recommendation/`)
- `POST /api/crop-recommendation/predict/` — Predict optimal crops based on N-P-K, soil, pH, rainfall, temperature, and district

### Smart Irrigation (`/api/smart-irrigation/`)
- `POST /api/smart-irrigation/predict/` — Calculate FAO-56 root-zone water balance, deficit (mm), and pump runtimes

### Weather & Agrometeorology (`/api/weather/`)
- `GET /api/weather/current/?lat=<lat>&lon=<lon>` — Get live weather, spray window advisory, and 5-day forecasts

### Sustainability Score (`/api/sustainability/`)
- `POST /api/sustainability/calculate/` — Calculate farm eco-score ($0-100$), water savings (L), and $CO_2$ offset
- `GET /api/sustainability/formula/` — Retrieve mathematical formulation documentation

### Multilingual Farmer Assistant (`/api/farmer-assistant/`)
- `POST /api/farmer-assistant/chat/` — Converse with GenAI assistant (supports `language: "gu" | "hi" | "en"`)

### IoT Sensor Telemetry (`/api/iot/`)
- `GET /api/iot/live-telemetry/` — Fetch real-time simulated/hardware node telemetry
- `GET /api/iot/history/?hours=24` — Retrieve historical sensor metrics

### Agentic Advisor (`/api/agentic-advisor/`)
- `POST /api/agentic-advisor/run-loop/` — Trigger autonomous Observe-Reason-Decide-Act cycle
- `GET /api/agentic-advisor/insights/` — Retrieve prioritized farm actions and reasoning trail

### Mandi Market Prices (`/api/market-prices/`)
- `GET /api/market-prices/latest/` — Fetch latest APMC mandi commodity rates
- `GET /api/market-prices/by-crop/?crop=<crop>` — Filter rates by commodity
- `GET /api/market-prices/districts/` — List all monitored districts

### Government Schemes (`/api/government-schemes/` & `/api/schemes/`)
- `GET /api/schemes/` — Public listing of agricultural welfare schemes
- `GET /api/schemes/<id>/` — Scheme detail, eligibility criteria, and application links

### Expert Consultation (`/api/consultation/`)
- `POST /api/consultation/` — Create new consultation request with image attachments
- `GET /api/consultation/farmer/` — List consultations initiated by logged-in farmer
- `GET /api/consultation/expert/` — List consultation requests queued for the expert
- `POST /api/consultation/<id>/reply/` — Send response or prescription in consultation thread

---

## 🚢 Deployment Guide

### Frontend Deployment (Vercel)
The frontend includes a pre-configured `vercel.json` for seamless deployment:
1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com).
3. Set the **Root Directory** to `farmeverse-main/frontend`.
4. Add the environment variable:
   - `VITE_API_BASE_URL` = `https://your-production-backend.com/api`
5. Click **Deploy**.

### Backend Deployment (Render / Railway / Ubuntu VPS)
1. **Production Settings**:
   - Set `DEBUG=False` in your production `.env`.
   - Set `ALLOWED_HOSTS` to your production domain (e.g., `api.farmeverse.com`).
   - Configure `CORS_ALLOWED_ORIGINS` to include your Vercel frontend URL.
2. **Collect Static Files**:
   ```bash
   python manage.py collectstatic --noinput
   ```
3. **Run with Gunicorn**:
   ```bash
   gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 3
   ```

---

## 🔍 Limitations & Roadmap

### Known Limitations
1. **Extreme Lighting Variations**: Very low-light or severe lens flare images can reduce leaf disease classification confidence.
2. **Multi-Infection Co-occurrence**: When early fungal lesions and bacterial spots coincide on the same leaf surface, secondary infections may exhibit lower confidence scores.
3. **Severe Leaf Occlusion**: Leaves heavily occluded by dirt clods or dense overlapping foliage benefit from multi-angle photo capture.

### Future Roadmap
- [ ] Edge AI inference deployment on mobile devices using TensorFlow Lite (`.tflite`).
- [ ] Integration with ISRO Bhuvan satellite remote sensing for vegetative index (NDVI) tracking.
- [ ] Direct WhatsApp / SMS alert dispatch for severe frost and pest outbreak warnings.
- [ ] Drone spray path optimization integration with autonomous spray controllers.

---

## 🤝 Contributing & License

Contributions, issues, and feature requests are welcome! Feel free to check the issues tab or submit a Pull Request.

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>🌾 FarmeVerse AI (AgriSmart AI)</b> — <i>Empowering Farmers with Precision Intelligence for a Sustainable Tomorrow.</i>
</p>