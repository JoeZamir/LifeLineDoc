# LifelineDoc App

**Emergency Help in Seconds** - A medical emergency coordination demo application for filming purposes.

## Overview

LifelineDoc is a frontend-only demo SPA that simulates a real-time medical emergency coordination system. This app is designed for filming purposes and contains no backend - all functionality is simulated using JavaScript.

## Features

### Patient View
- **SOS Emergency Button** - Hold to activate emergency services
- **Medical Profile** - Blood type, allergies, conditions, medications
- **Emergency Contacts** - Quick-dial emergency contacts
- **Live Location Tracking** - Simulated GPS coordinates

### Emergency Flow (State Machine)
1. **INITIATED** - Sending GPS coordinates
2. **SEARCHING_DOCTOR** - Finding nearest available doctor
3. **DOCTOR_FOUND** - Doctor profile displayed
4. **CONNECTING_VIDEO** - Establishing secure video call
5. **VIDEO_CONNECTED** - Live video consultation
6. **DISPATCHING_AMBULANCE** - Notifying nearest ambulance
7. **AMBULANCE_ASSIGNED** - Ambulance details displayed
8. **AMBULANCE_EN_ROUTE** - Live tracking with ETA countdown
9. **SUMMARY_SYNC** - Emergency summary sent to dispatch

### Doctor View
- Incoming emergency notifications
- Patient medical information display
- Simulated video call interface
- Ambulance status tracking

### Ambulance Dashboard
- Emergency dispatch notifications
- Patient location and details
- Live route progress simulation
- Arrival confirmation workflow

## Tech Stack

- **React 18** - Functional components with hooks
- **JavaScript** - No TypeScript
- **Tailwind CSS** - Utility-first styling
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **PWA** - Installable web app

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Server
The app runs on `http://localhost:3000` by default.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SOSButton.jsx
│   ├── DoctorCard.jsx
│   ├── AmbulanceCard.jsx
│   ├── VideoCallUI.jsx
│   ├── StatusLog.jsx
│   ├── MapSimulation.jsx
│   └── ...
├── pages/               # Route pages
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Emergency.jsx
│   ├── Doctor.jsx
│   └── Ambulance.jsx
├── hooks/               # Custom React hooks
│   ├── useAuth.js
│   └── useEmergency.js
├── services/            # Mock API services
│   └── mockEmergencyService.js
├── data/                # Mock data
│   └── mockData.js
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Tailwind styles
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Sign in (patient/doctor/ambulance) |
| `/signup` | Create account |
| `/dashboard` | Patient dashboard with SOS |
| `/emergency` | Active emergency session |
| `/doctor` | Doctor portal |
| `/ambulance` | Ambulance dashboard |

## Demo Credentials

This app uses simulated authentication. Enter any email/password to log in.

**Select role on login:**
- **Patient** - Access dashboard and SOS
- **Doctor** - Receive emergency calls
- **Ambulance** - Receive dispatch requests

## Design Principles

- **Medical-grade UI** - Calm blues, emergency red, confirmation green
- **Mobile-first** - Designed for phone screens
- **Large tap targets** - Easy interaction during emergencies
- **Clear typography** - Information hierarchy
- **Minimal clutter** - Focus on critical information

## Important Notes

⚠️ **This is a DEMO application for FILMING PURPOSES ONLY**

- No real backend or API calls
- No real video streaming
- No real map integration
- No real GPS tracking
- All data is simulated
- Do not use for actual emergencies

## License

Demo application - For filming purposes only.
