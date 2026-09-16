# 🌾 FarmeVerse AI (AgriSmart AI)

### Intelligent Agriculture & Precision Farming Decision-Support Ecosystem (https://sih-2026-one-lovat.vercel.app/)

> Transforming smallholder and commercial agriculture through Deep Learning, IoT Telemetry, Agro-Hydrological Science, and Multilingual Agentic AI.

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Django 4.2](https://img.shields.io/badge/Django-4.2-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite 5](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TensorFlow 2.12+](https://img.shields.io/badge/TensorFlow-2.12%2B-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Macro-F1](https://img.shields.io/badge/Macro--F1-0.9184-brightgreen?style=for-the-badge)](#-model-performance)
[![License MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](#-license)

---

## 📖 Table of Contents

- [🌟 Project Overview](#-project-overview)
- [🎥 Demo Video](#-demo-video)
- [💡 Key Value Proposition](#-key-value-proposition)
- [👥 User Roles & Portals](#-user-roles--portals)
- [🧩 Feature Matrix](#-feature-matrix)
- [🧠 Core AI & Scientific Models](#-core-ai--scientific-models)
- [🏗️ System Architecture](#️-system-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Repository Structure](#-repository-structure)
- [💻 Prerequisites](#-prerequisites)
- [🚀 Local Setup](#-local-setup)
- [🔐 Environment Variables](#-environment-variables)
- [🗄️ Database Configuration](#️-database-configuration)
- [🔑 Authentication](#-authentication)
- [🔌 API Endpoints](#-api-endpoints)
- [🧪 Testing & Verification](#-testing--verification)
- [🚢 Deployment](#-deployment)
- [🔒 Security](#-security)
- [⚠️ AI & Agricultural Safety](#️-ai--agricultural-safety)
- [🛣️ Limitations & Roadmap](#️-limitations--roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgements](#-acknowledgements)
- [🌱 Vision](#-vision)

---

## 🌟 Project Overview

**FarmeVerse AI**, also known as **AgriSmart AI**, is an intelligent agriculture and precision-farming platform designed to provide actionable decision support to farmers, agricultural experts, and administrators.

The platform brings multiple agricultural technologies together in one ecosystem:

- 🤖 Artificial Intelligence
- 🧠 Deep Learning
- 📷 Computer Vision
- 🌾 Machine Learning
- 💧 Agro-Hydrological Modeling
- 📡 IoT Telemetry
- 🌦️ Weather Intelligence
- 🗣️ Multilingual Generative AI
- 📊 Agricultural Market Intelligence
- 🏛️ Government Scheme Discovery
- 🧑‍🔬 Farmer–Expert Consultation
- 🌱 Sustainability Analytics

FarmeVerse AI is designed for smartphone, tablet, and desktop experiences and supports:

- 🇬🇺 Gujarati (`gu`)
- 🇮🇳 Hindi (`hi`)
- 🌐 English (`en`)

### 🎯 Main Objective

The goal is to help farmers make better decisions throughout the agricultural lifecycle:

```text
Crop Planning
     ↓
Soil & Climate Analysis
     ↓
Crop Selection
     ↓
Cultivation Monitoring
     ↓
Disease Detection
     ↓
Smart Irrigation
     ↓
Weather & Market Intelligence
     ↓
Harvest & Profit Analysis
```

---

## 🎥 Demo Video

### ▶️ FarmeVerse AI — Complete Platform Demo

Watch the demonstration of the FarmeVerse AI platform, including the major farmer, expert, AI, irrigation, IoT, market, and advisory features.

**[🎬 Watch the FarmeVerse AI Demo Video on Google Drive](https://drive.google.com/file/d/11fxDEKGKWRZ_HDj79dI3J_0VXmJzxOC7/view?usp=drivesdk)**

> **Note:** Make sure the Google Drive file permission is set to **Anyone with the link → Viewer** so GitHub visitors can access the video.

---

## 💡 Key Value Proposition

| Capability | What It Provides |
|---|---|
| 📷 AI Disease Detection | Detects crop leaf diseases using deep learning |
| 🌾 Crop Recommendation | Recommends suitable crops using soil and climate parameters |
| 💧 Smart Irrigation | Estimates irrigation requirements using FAO-56 methodology |
| 🌦️ Weather Intelligence | Forecasts, alerts, and agricultural spray-window guidance |
| 📡 IoT Telemetry | Monitors farm sensor data and historical trends |
| 🗣️ Multilingual AI | Agricultural assistance in Gujarati, Hindi, and English |
| 🤖 Agentic Advisor | Observe → Reason → Decide → Act / Notify workflow |
| 📊 Mandi Intelligence | Agricultural market-price tracking and analytics |
| 💰 Profit Calculator | Cultivation cost, revenue, margin, and break-even analysis |
| 🏛️ Government Schemes | Agricultural subsidy and scheme discovery |
| 🧑‍🔬 Expert Consultation | Farmer-to-expert communication |
| 🌱 Sustainability Score | Water, soil/input, and IPM-based sustainability assessment |

---

## 👥 User Roles & Portals

FarmeVerse AI uses role-based access with three primary portals.

```text
                         ┌────────────────────────────┐
                         │   FarmeVerse AI Auth       │
                         └─────────────┬──────────────┘
                                       │
               ┌───────────────────────┼───────────────────────┐
               ▼                       ▼                       ▼
      ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
      │  Farmer Portal  │     │  Expert Portal  │     │  Admin Portal   │
      │                 │     │                 │     │                 │
      │ Field Decisions │     │ Agronomy Support│     │ System & Audit  │
      └─────────────────┘     └─────────────────┘     └─────────────────┘
```

### 👨‍🌾 Farmer Portal

- Interactive dashboard
- Farm and plot management
- Crop planning and lifecycle tracking
- AI leaf-disease diagnosis
- Smart irrigation recommendations
- Weather intelligence
- IoT sensor monitoring
- Crop recommendation
- Mandi market prices
- Profit and yield calculator
- Sustainability score
- Government schemes
- Multilingual AI assistant
- Voice input and text-to-speech
- Expert consultation

### 🧑‍🔬 Expert Portal

- Consultation inbox
- Farmer query management
- Crop and farm-history review
- High-resolution image review
- Disease diagnosis support
- Treatment and prescription recommendations
- Cultural-practice recommendations
- Availability management
- Farmer feedback and ratings

### 🛡️ Admin Portal

- User and role management
- Farmer account administration
- Expert verification
- Platform analytics
- IoT telemetry monitoring
- Government scheme CMS
- Market-data management
- System auditing
- CSV/JSON report export

---

## 🧩 Feature Matrix

| Module | Classification | Description | Status |
|---|---|---|---|
| **Foliar Disease Detection** | Computer Vision / Deep Learning | 21-class leaf disease classifier with treatment and prevention guidance | ✅ |
| **Crop Recommendation** | Machine Learning | Soil, climate, season, and regional crop suitability | ✅ |
| **Smart Irrigation** | Agro-Hydrology | ET₀, ETc, water deficit, irrigation volume, and pump runtime | ✅ |
| **Weather Intelligence** | Agrometeorology | Forecasts, extreme-weather alerts, and spray windows | ✅ |
| **Sustainability Score** | Environmental Science | 0–100 sustainability assessment | ✅ |
| **Multilingual AI Assistant** | Generative AI | Gujarati, Hindi, and English agricultural assistant | ✅ |
| **IoT Telemetry** | IoT | Sensor telemetry with simulated/hardware-ready architecture | ✅ |
| **Agentic Advisor** | Agentic AI | Observe → Reason → Decide → Act / Notify | ✅ |
| **Mandi Prices** | Market Intelligence | APMC market-price tracking and trend analytics | ✅ |
| **Farm Records** | Farm Management | Farms, plots, crops, expenses, and harvest records | ✅ |
| **Profit Calculator** | Agri-Economics | Cost, revenue, profit, ROI, and break-even calculations | ✅ |
| **Government Schemes** | Policy / Welfare | Agricultural schemes, subsidies, and eligibility information | ✅ |
| **Expert Consultation** | Collaboration | Two-way farmer–agronomist communication | ✅ |

---

# 🧠 Core AI & Scientific Models

## 1. 📷 Foliar Disease Detection

The disease-detection module uses transfer learning with a **MobileNetV2 / MobileNetV3** backbone.

### Model Architecture

```text
Input Image
    │
    ▼
224 × 224 × 3
    │
    ▼
MobileNetV2 / MobileNetV3
    │
    ▼
Global Average Pooling
    │
    ▼
Batch Normalization
    │
    ▼
Dropout (0.3)
    │
    ▼
Dense (256, ReLU)
    │
    ▼
Dropout (0.2)
    │
    ▼
Dense (21, Softmax)
    │
    ▼
Disease Prediction
```

### Supported Classes

**🍎 Apple**
- Scab
- Black Rot
- Healthy

**🌶️ Bell Pepper**
- Bacterial Spot
- Healthy

**🌽 Corn / Maize**
- Common Rust
- Grey Leaf Spot
- Healthy

**🍇 Grape**
- Black Rot
- Leaf Blight (Isariopsis)
- Healthy

**🥔 Potato**
- Early Blight
- Late Blight
- Healthy

**🍅 Tomato**
- Bacterial Spot
- Early Blight
- Late Blight
- Leaf Mould
- Septoria Leaf Spot
- Yellow Leaf Curl Virus (TYLCV)
- Healthy

---

## 📊 Model Performance

| Metric | Result |
|---|---:|
| Overall Accuracy | **92.40%** |
| Macro-F1 | **0.9184** |
| Macro Precision | **0.9215** |
| Macro Recall | **0.9162** |
| CPU Inference | ~45 ms |
| GPU Inference | ~12 ms |
| Number of Classes | **21** |

> These metrics describe the reported evaluation results. Real-world field performance can vary with crop variety, lighting, image quality, disease stage, and environmental conditions.

---

## 2. 🌾 Crop Recommendation Engine

The crop recommendation engine uses machine learning to estimate suitable crops from agricultural and environmental parameters.

### Example Inputs

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Soil pH
- Soil type
- Temperature
- Humidity
- Rainfall
- Season
- District / region

### Processing Pipeline

```text
Soil Data
   +
Climate Data
   +
Season
   +
Region
   ↓
ML Crop Recommendation Model
   ↓
Crop Suitability
   ↓
Recommended Crop
```

The implementation uses **Scikit-Learn**, with Random Forest specified as the primary recommendation approach.

---

## 3. 💧 Smart Irrigation — FAO-56

The Smart Irrigation Engine uses the **FAO-56 Penman-Monteith** framework for reference evapotranspiration and crop water management.

### Crop Evapotranspiration

```text
ETc = Kc × ET₀
```

Where:

- `ETc` = Crop evapotranspiration
- `Kc` = Crop coefficient
- `ET₀` = Reference evapotranspiration

### Water Deficit

```text
Deficit =
(Field Capacity - Current Soil Moisture)
× Root Depth
× Soil Bulk Density
```

The engine considers:

- Current soil moisture
- Field capacity
- Root depth
- Crop growth stage
- Crop coefficient
- Weather forecast
- Expected rainfall
- Irrigation method
- Soil characteristics

### Irrigation Efficiency

| Irrigation Method | Efficiency |
|---|---:|
| Drip | 90% |
| Sprinkler | 75% |
| Flood | 60% |

### Decision States

```text
IRRIGATE_NOW
MONITOR
RAIN_DELAY
```

### Outputs

- Water deficit
- Recommended water volume
- Irrigation status
- Pump runtime
- Rain-delay recommendation

---

## 4. 🌱 Sustainability Score

FarmeVerse AI uses a deterministic scoring framework from **0 to 100**.

```text
Sustainability Score =
    0.40 × Water Efficiency
  + 0.35 × Soil / Input Health
  + 0.25 × IPM / Biodiversity
```

### Weight Distribution

| Category | Weight |
|---|---:|
| 💧 Water Efficiency | 40% |
| 🌱 Soil / Input Health | 35% |
| 🐞 IPM / Biodiversity | 25% |

Possible indicators include:

- Drip / micro-irrigation
- Sensor-based irrigation
- Rainwater harvesting
- Organic manure usage
- Soil Health Card practices
- Crop rotation
- Bio-pesticides
- Early AI disease screening
- Reduced chemical spraying

---

## 5. 🤖 Agentic AI Advisor

The Agentic Advisor follows a closed-loop decision-support process:

```text
┌──────────────┐
│   OBSERVE    │
│              │
│ Sensors      │
│ Weather      │
│ Crop Status  │
│ Farm Records │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    REASON    │
│              │
│ AI + Rules   │
│ Scientific   │
│ Models       │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    DECIDE    │
│              │
│ Prioritize   │
│ Interventions│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ ACT / NOTIFY │
│              │
│ Advisory     │
│ Alerts       │
│ Actions      │
└──────────────┘
```

The objective is to convert farm observations into prioritized, explainable, and auditable recommendations.

---

## 6. 📡 IoT Sensor Telemetry

The IoT module supports simulated telemetry and a hardware-ready architecture for ESP32 / Raspberry Pi gateways.

### Supported Parameters

- Soil moisture
- Soil temperature
- Ambient humidity
- Soil pH
- Electrical conductivity
- Nitrogen
- Phosphorus
- Potassium

### Data Flow

```text
ESP32 / Raspberry Pi
        │
        ▼
Sensors
        │
        ▼
IoT Gateway
        │
        ▼
Django REST API
        │
        ▼
Database
        │
        ▼
React Dashboard
```

Telemetry can support:

- Irrigation decisions
- Historical trend analysis
- Crop monitoring
- Anomaly detection
- AI recommendations

---

## 7. 🌦️ Weather Intelligence

The weather module integrates external weather data for agricultural decision support.

Features include:

- 5-day forecasts
- 3-hour forecast intervals
- Rainfall prediction
- Temperature
- Humidity
- Wind information
- Extreme-weather alerts
- Spray-window recommendations

Weather information can be used by the irrigation, disease-risk, and advisory modules.

---

## 8. 🗣️ Multilingual AI Assistant

The AI assistant is designed for agricultural conversations in:

| Language | Code |
|---|---|
| English | `en` |
| Hindi | `hi` |
| Gujarati | `gu` |

### Capabilities

- Agricultural Q&A
- Crop guidance
- Disease explanations
- Irrigation guidance
- Weather-aware responses
- Farm-record context
- Voice input
- Text-to-speech

The implementation uses the Google Gemini ecosystem for generative AI.

---

## 9. 📊 Mandi Market Intelligence

The market module provides agricultural commodity and APMC market information.

Features:

- Commodity price tracking
- Market filtering
- District-wise information
- Price trends
- Market comparison
- Historical analysis

Market information depends on the availability and reliability of the configured external data source.

---

## 10. 🏛️ Government Schemes

The Government Schemes module provides a searchable agricultural-scheme directory.

Example schemes/categories include:

- PM-KISAN
- PMFBY
- i-Khedut
- Solar Pump schemes
- Micro-Irrigation schemes
- Central agricultural schemes
- State agricultural schemes

The system can organize:

- Scheme description
- Benefits
- Eligibility
- Required documents
- Application information

---

## 11. 💰 Profit & Yield Calculator

The financial module estimates cultivation economics.

```text
Expected Yield
      ×
Selling Price
      ↓
Expected Revenue
      ↓
Revenue - Total Cost
      ↓
Net Profit / Loss
```

### Basic Formulas

```text
Revenue = Expected Yield × Selling Price

Net Profit = Revenue − Total Cultivation Cost
```

The module can also support:

- Break-even price
- Break-even yield
- ROI
- Cost per acre
- Expected margin

---

# 🏗️ System Architecture

```text
┌───────────────────────────────┐
│       PHYSICAL FARM           │
│                               │
│ ESP32 / Raspberry Pi / LoRa  │
│ Soil & Environment Sensors    │
└───────────────┬───────────────┘
                │
                │ Telemetry
                ▼
┌──────────────────────────────────────────────────────────────┐
│                   DJANGO REST BACKEND                        │
│                                                              │
│ ┌───────────────┐ ┌───────────────┐ ┌─────────────────────┐ │
│ │ Authentication│ │ Farm Records  │ │ Expert Consultation │ │
│ └───────────────┘ └───────────────┘ └─────────────────────┘ │
│                                                              │
│ ┌───────────────┐ ┌───────────────┐ ┌─────────────────────┐ │
│ │ Disease AI    │ │ FAO-56 Engine │ │ Crop ML             │ │
│ │ MobileNet     │ │ Irrigation    │ │ Recommendation      │ │
│ └───────────────┘ └───────────────┘ └─────────────────────┘ │
│                                                              │
│ ┌───────────────┐ ┌───────────────┐ ┌─────────────────────┐ │
│ │ Gemini AI     │ │ Agentic AI    │ │ Sustainability      │ │
│ └───────────────┘ └───────────────┘ └─────────────────────┘ │
│                                                              │
│ ┌───────────────┐ ┌───────────────┐ ┌─────────────────────┐ │
│ │ Weather       │ │ Mandi Prices  │ │ Government Schemes  │ │
│ └───────────────┘ └───────────────┘ └─────────────────────┘ │
└──────────────────────────────┬───────────────────────────────┘
                               │
                               │ REST / JSON
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND                            │
│                                                              │
│ Farmer Portal │ Expert Portal │ Admin Portal                 │
│                                                              │
│ Dashboard │ AI │ IoT │ Weather │ Market │ Reports            │
└──────────────────────────────────────────────────────────────┘
```

---

# 🛠️ Technology Stack

## Backend & AI

| Technology | Purpose |
|---|---|
| **Python 3.10+** | Backend and AI development |
| **Django 4.2** | Backend web framework |
| **Django REST Framework** | REST APIs |
| **SimpleJWT** | JWT authentication |
| **TensorFlow 2.12+** | Deep learning |
| **Keras** | Neural-network development |
| **Scikit-Learn** | Machine learning |
| **Pandas** | Data processing |
| **NumPy** | Numerical computation |
| **Pillow** | Image processing |
| **Google Gemini** | Generative AI |
| **Gunicorn** | Production WSGI server |

## Frontend

| Technology | Purpose |
|---|---|
| **React 18.2** | User interface |
| **Vite 5.4** | Build tooling |
| **Tailwind CSS 3.3** | Styling |
| **Framer Motion** | UI animations |
| **GSAP** | Advanced animations |
| **Three.js** | 3D visualization |
| **Lucide React** | Icons |
| **React Icons** | Icons |
| **Axios** | HTTP client |
| **React Router DOM** | Routing |
| **React Hook Form** | Form management |

## Database

### Development

```text
SQLite3
```

### Production

```text
PostgreSQL
```

---

# 📁 Repository Structure

```text
farmeverse-main/
│
├── backend/
│   ├── adminpanel/
│   ├── agentic_advisor/
│   ├── analytics/
│   ├── authentication/
│   ├── common/
│   ├── config/
│   ├── consultation/
│   ├── crop_management/
│   ├── crop_recommendation/
│   ├── disease_detection/
│   ├── expert/
│   ├── farm_records/
│   ├── farmer/
│   ├── farmer_assistant/
│   ├── government_schemes/
│   ├── iot_sensors/
│   ├── market_prices/
│   ├── smart_irrigation/
│   ├── sustainability/
│   ├── users/
│   ├── weather/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── report/
│   └── model_report.md
│
├── README.md
└── LICENSE
```

---

# 💻 Prerequisites

Install the following before running the project:

- **Python 3.10+**
- **Node.js 18+**
- **npm**
- **Git**

### Recommended Hardware

- 8 GB+ RAM
- SSD storage
- Modern Chrome / Edge / Firefox browser
- NVIDIA GPU for faster deep-learning inference (optional)

---

# 🚀 Local Setup

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd farmeverse-main
```

---

## 2. Backend Setup

```bash
cd backend
```

Create a Python virtual environment.

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create:

```text
backend/.env
```

Example:

```env
DEBUG=True

SECRET_KEY=your-secret-key

ALLOWED_HOSTS=localhost,127.0.0.1

DATABASE_URL=sqlite:///db.sqlite3

GEMINI_API_KEY=your-gemini-api-key

OPENWEATHER_API_KEY=your-openweather-api-key

AGMARKNET_API_KEY=your-agmarknet-api-key
```

> Do not commit the real `.env` file to GitHub.

---

## 4. Run Database Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

Create an admin user:

```bash
python manage.py createsuperuser
```

Start Django:

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

## 5. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Start Vite:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

# 🔐 Environment Variables

The main environment variables are:

| Variable | Purpose |
|---|---|
| `DEBUG` | Django development/production mode |
| `SECRET_KEY` | Django security key |
| `ALLOWED_HOSTS` | Allowed backend hosts |
| `DATABASE_URL` | Database connection |
| `GEMINI_API_KEY` | Google Gemini API access |
| `OPENWEATHER_API_KEY` | Weather data access |
| `AGMARKNET_API_KEY` | Market-data integration, if applicable |

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Restart the Vite server after changing environment variables.

---

# 🗄️ Database Configuration

## Development

SQLite is suitable for local development:

```text
SQLite3
```

## Production

For production workloads, use:

```text
PostgreSQL
```

Recommended production practices:

- Database connection pooling
- Proper indexes
- Automated backups
- Restricted database access
- Strong credentials
- TLS where applicable

---

# 🔑 Authentication

FarmeVerse AI uses JWT-based authentication with role-based authorization.

```text
Register / Login
       ↓
JWT Access Token
       +
JWT Refresh Token
       ↓
Authenticated API Request
       ↓
Role Validation
       ↓
Protected Resource
```

### Roles

```text
FARMER
EXPERT
ADMIN
```

---

# 🔌 API Endpoints

> Endpoint paths below represent the intended API structure. Confirm the exact paths against the project's current Django `urls.py` configuration.

## Authentication

```http
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/token/refresh/
POST /api/auth/logout/
```

## Farmer

```http
GET  /api/farmer/profile/
PUT  /api/farmer/profile/
GET  /api/farmer/dashboard/
```

## Farm Records

```http
GET    /api/farms/
POST   /api/farms/
GET    /api/farms/{id}/
PUT    /api/farms/{id}/
DELETE /api/farms/{id}/
```

## Disease Detection

```http
POST /api/disease/predict/
```

```text
Leaf Image
    ↓
Image Preprocessing
    ↓
TensorFlow Model
    ↓
Prediction
    ↓
Disease + Confidence
    ↓
Treatment / Prevention Guidance
```

## Crop Recommendation

```http
POST /api/crop-recommendation/predict/
```

## Smart Irrigation

```http
POST /api/irrigation/calculate/
GET  /api/irrigation/status/
```

## IoT

```http
POST /api/iot/telemetry/
GET  /api/iot/telemetry/
GET  /api/iot/latest/
```

## Weather

```http
GET /api/weather/
GET /api/weather/forecast/
```

## Market Prices

```http
GET /api/market-prices/
```

## Government Schemes

```http
GET /api/schemes/
GET /api/schemes/{id}/
```

## Consultation

```http
GET  /api/consultations/
POST /api/consultations/
POST /api/consultations/{id}/messages/
```

---

# 🧪 Testing & Verification

Run Django checks:

```bash
python manage.py check
```

Run backend tests:

```bash
python manage.py test
```

Build the frontend:

```bash
npm run build
```

Preview the production frontend:

```bash
npm run preview
```

### Recommended Test Cases

**Authentication**
- Registration
- Login
- JWT refresh
- Logout
- Role authorization

**Disease Detection**
- Valid image
- Invalid image
- Unsupported format
- Large image
- Low-quality image

**Crop Recommendation**
- Valid soil parameters
- Missing parameters
- Invalid parameter ranges
- Different seasons
- Different regions

**Irrigation**
- Low soil moisture
- High soil moisture
- Rain forecast
- Different crop stages
- Different irrigation methods

**IoT**
- Valid telemetry
- Missing sensor data
- Invalid sensor values
- Historical telemetry
- Sensor connectivity

---

# 🚢 Deployment

A recommended production architecture is:

```text
                         Internet
                            │
                            ▼
                       Cloudflare
                            │
                            ▼
                     Reverse Proxy
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
        React Frontend              Django API
                                          │
                           ┌──────────────┼──────────────┐
                           ▼              ▼              ▼
                      PostgreSQL       Redis          Storage
```

### Backend Production Stack

```text
Django
  +
Gunicorn
  +
PostgreSQL
```

Example:

```bash
gunicorn config.wsgi:application
```

Set production configuration:

```env
DEBUG=False
```

Configure:

- HTTPS
- Secure `SECRET_KEY`
- Production `ALLOWED_HOSTS`
- CORS
- CSRF
- Database credentials
- API keys
- Logging
- Backups

---

# 🐳 Docker Deployment

The application can be containerized using Docker.

Suggested services:

```text
docker-compose
│
├── frontend
├── backend
├── postgres
├── redis
└── nginx
```

This structure supports reproducible environments and easier deployment.

---

# 🔒 Security

Production deployments should implement:

- HTTPS
- Secure JWT handling
- Strong Django `SECRET_KEY`
- Environment-based secrets
- CORS restrictions
- CSRF protection
- Rate limiting
- Input validation
- File-upload validation
- Image-size limits
- Role-based authorization
- Database backups
- Audit logging
- Monitoring

### Never Commit Secrets

Do not upload:

```text
.env
API keys
Database passwords
Private keys
Cloud credentials
Production secrets
```

Use:

```text
.env.example
```

for documenting required variables.

---

# ⚠️ AI & Agricultural Safety

FarmeVerse AI is a **decision-support system** and should not be treated as a replacement for qualified agricultural professionals.

AI predictions may be affected by:

- Image quality
- Lighting
- Camera quality
- Crop variety
- Disease stage
- Environmental conditions
- Dataset limitations

Chemical recommendations should always be checked against:

- Product labels
- Local regulations
- Application rates
- Pre-harvest intervals
- Local agricultural guidance
- Qualified agronomist recommendations

Irrigation recommendations should also be validated against actual field conditions, sensor calibration, soil properties, and local agricultural practices.

---

# ⚠️ Limitations & Roadmap

## Current Limitations

- Real-world disease performance can differ from benchmark results.
- IoT telemetry may run in simulation mode without physical hardware.
- Weather functionality depends on external weather providers.
- Market-price functionality depends on external data availability.
- AI-generated responses may contain errors.
- Sensors require appropriate calibration.
- Agricultural conditions vary by location, soil, crop variety, and season.

## Roadmap

### Phase 1 — Core Platform

- [x] Farmer portal
- [x] Expert portal
- [x] Admin portal
- [x] Authentication
- [x] Farm management
- [x] Disease detection
- [x] Crop recommendation

### Phase 2 — Smart Agriculture

- [x] Smart irrigation
- [x] Weather intelligence
- [x] IoT telemetry
- [x] Sustainability score
- [x] Mandi price intelligence

### Phase 3 — AI Ecosystem

- [x] Multilingual AI assistant
- [x] Voice interaction
- [x] Agentic advisory
- [x] Expert consultation

### Future Improvements

- [ ] Real ESP32 sensor deployment
- [ ] LoRaWAN connectivity
- [ ] Satellite crop monitoring
- [ ] NDVI analysis
- [ ] Pest outbreak prediction
- [ ] Computer-vision yield estimation
- [ ] Automated irrigation hardware control
- [ ] Farm digital twin
- [ ] Offline-first mobile application
- [ ] Android / iOS application
- [ ] Additional Indian languages
- [ ] Advanced agricultural forecasting
- [ ] Explainable AI dashboards

---

# 📈 Scalability Strategy

For large-scale deployment, the platform can evolve toward horizontally scalable services.

```text
                       Load Balancer
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          API Server     API Server     API Server
             │              │              │
             └──────────────┼──────────────┘
                            │
                          Redis
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
         PostgreSQL     AI Workers     IoT Workers
                            │
                            ▼
                       ML Inference
```

Recommended scaling components:

- PostgreSQL
- Redis
- Celery
- Background workers
- Object storage
- CDN
- Load balancing
- Database indexing
- API rate limiting
- Horizontal scaling
- Centralized logging
- Model-serving infrastructure

---

# 📊 Observability

Production monitoring should track:

### Application

- API latency
- Error rate
- Request volume
- CPU utilization
- Memory utilization

### AI

- Inference latency
- Model confidence
- Prediction distribution
- Model failures

### IoT

- Sensor connectivity
- Telemetry frequency
- Missing readings
- Abnormal values

### Platform

- Active farmers
- Active farms
- Disease diagnoses
- Irrigation recommendations
- AI assistant usage
- Expert consultations

---

# 🤝 Contributing

Contributions are welcome.

## 1. Create a Feature Branch

```bash
git checkout -b feature/new-feature
```

## 2. Make Your Changes

Follow the existing project structure and coding conventions.

## 3. Test

```bash
python manage.py check
python manage.py test
npm run build
```

## 4. Commit

```bash
git add .
git commit -m "Add new agriculture feature"
```

## 5. Push

```bash
git push origin feature/new-feature
```

## 6. Open a Pull Request

Include:

- What changed
- Why it changed
- How it was tested
- Known limitations
- Screenshots for UI changes, when applicable

---

# 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for complete license information.

---

# 🙏 Acknowledgements

FarmeVerse AI builds upon technologies, scientific methodologies, datasets, and open-source ecosystems including:

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TensorFlow](https://www.tensorflow.org/)
- [Keras](https://keras.io/)
- [Scikit-Learn](https://scikit-learn.org/)
- [Pandas](https://pandas.pydata.org/)
- [NumPy](https://numpy.org/)
- [Pillow](https://pillow.readthedocs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- FAO-56 Penman-Monteith methodology
- PlantVillage
- PlantDoc
- Agricultural market-data sources
- Weather-data providers
- Google Gemini

---

# 🌱 Vision

> **Empowering every farmer with intelligent, accessible, and sustainable agricultural decision support.**

FarmeVerse AI aims to bridge the gap between **traditional farming knowledge and modern technology** by bringing AI, scientific models, IoT, weather intelligence, market information, and agricultural expertise into one unified platform.

```text
                    🌱 FARMER
                        │
          ┌─────────────┼─────────────┐
          │             │             │
         🤖 AI          📡 IoT       🔬 SCIENCE
          │             │             │
          └─────────────┼─────────────┘
                        │
                        ▼
                🌾 FARMEVERSE AI
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       INSIGHT        ACTION        PROFIT
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                 🌍 SUSTAINABLE
                    FARMING
```

---

## ⭐ FarmeVerse AI

### AI + IoT + Agriculture + Science + Sustainability

**Built to help farmers make better decisions — from seed to sale. 🌾🤖**
