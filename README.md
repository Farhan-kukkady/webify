# Webify & Co — Modern Marketing Website

> High-converting, fully responsive marketing website and API for **Webify & Co**, a digital services agency specializing in modern website design and development, and social media management.

---

## 🚀 Features

- **Modern Angular 17+ Architecture**: Standalone components, reactive forms, signals, and typed routing.
- **Tailwind CSS Styling**: Custom design tokens (deep navy palette, electric blue accents, responsive typography, custom animations).
- **Light & Dark Theme**: Persistent system/toggle with smooth transitions.
- **High-Converting Single-Page Flow**:
  - **Hero**: Value proposition headline, dual CTAs ("Get a Free Quote" & "View Our Work"), browser mockup preview, and trust badges.
  - **Services**: Featured Website Development showcase (corporate, e-commerce, landing pages, portfolio, redesigns, maintenance) + Social Media Management & SEO cards.
  - **Why Choose Us**: 6 benefit cards (speed, tech, mobile, SEO, pricing, support).
  - **Our Process**: 5-step collaborative timeline from Discovery to Launch.
  - **Portfolio**: 6 project showcase cards with category filtering and hover effects.
  - **Pricing**: 3 fixed-price tiers (Starter, Business, Premium) with highlighted popular plan + Social media add-on options.
  - **Testimonials**: Interactive review carousel with client avatars and ratings.
  - **FAQ**: Smooth expandable accordion answering common client questions.
  - **Contact**: Reactive inquiry form with full client-side validation, direct API submission, and WhatsApp quick chat.
  - **Sticky Navbar & Footer**: Logo, smooth-scroll anchor navigation, theme switch, mobile hamburger menu, social icons.
  - **Floating WhatsApp Button**: Persistent one-click direct communication channel.
- **Node.js / Express Backend**:
  - Secure `POST /api/contact` endpoint with rate limiting (`express-rate-limit`), security headers (`helmet`), CORS, and input validation (`express-validator`).
  - Optional transactional email delivery via Nodemailer with fallback mock delivery.

---

## 📁 Project Structure

```text
c:\Webify\
├── client/                     # Angular 17 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Services (ContactService, ThemeService)
│   │   │   ├── sections/       # Page sections (Hero, Services, WhyUs, Process, Portfolio, Pricing, Testimonials, FAQ, Contact)
│   │   │   ├── shared/         # Shared UI (Navbar, Footer, WhatsApp Button)
│   │   │   ├── app.component.* # Shell component & smooth scroll reveal
│   │   │   └── app.config.ts   # Client providers (HttpClient, Router, Animations)
│   │   ├── assets/             # Generated visuals and mockups
│   │   ├── styles.css          # Tailwind base, utilities, design tokens
│   │   └── index.html          # SEO meta tags, Open Graph tags, Fonts
│   ├── tailwind.config.js      # Custom theme, colors, shadows, and animations
│   ├── package.json
│   └── tsconfig.json
│
├── server/                     # Node.js + Express Backend API
│   ├── src/
│   │   ├── middleware/         # Rate limiting, error handler
│   │   ├── routes/             # Contact route (POST /api/contact)
│   │   └── index.ts            # Express app entry point
│   ├── .env.example            # Environment variables configuration template
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                   # Setup, build, and run instructions
```

---

## 🛠️ Prerequisites

- **Node.js**: v18+ or v20+ recommended (Node v22 tested)
- **npm**: v9+

---

## ⚙️ Environment Configuration

### Backend Configuration (`/server/.env`)

Copy the `.env.example` file to create `.env`:

```bash
cd server
cp .env.example .env
```

Default `.env` values:

```env
PORT=3000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:4200
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10

# Optional SMTP Settings for Nodemailer
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL_TO=hello@webifyco.com
```

---

## 🏃 Getting Started

### 1. Install Dependencies

In the root directory or respective subfolders:

```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 2. Run the Development Servers

#### Backend API (Port 3000):
```bash
cd server
npm run dev
```
API will be running at `http://localhost:3000` (Health check at `http://localhost:3000/api/health`).

#### Frontend Application (Port 4200):
```bash
cd client
npm start
```
Open your browser at `http://localhost:4200`.

---

## 📦 Production Build

### Build Backend:
```bash
cd server
npm run build
npm start
```

### Build Frontend:
```bash
cd client
npm run build
```
Production output is located in `client/dist/client`.

---

## 🧪 Testing the Contact Form Endpoint

You can test the backend API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Morgan",
    "email": "alex@example.com",
    "service": "website-design",
    "projectDetails": "We need a complete company website redesign with 10 pages and contact forms.",
    "budget": "3k-5k"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for reaching out! We have received your inquiry and will contact you within 24 hours.",
  "inquiryId": "INQ-..."
}
```

---

## 🎨 Design Tokens

- **Navy 950 (Background Dark)**: `#050B14`
- **Navy 900 (Surface Dark)**: `#0B132B`
- **Navy 800 (Card Dark)**: `#111E38`
- **Electric 500 (Primary Accent)**: `#2563EB`
- **Cyan 500 (Secondary Accent)**: `#06B6D4`
- **Text White / Slate 400**: High contrast, accessible typography

