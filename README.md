# LifelineDoc App

URL: https://lifelinedoc.netlify.app

<div id="app-screenshots" style="display: flex; flex-direction: row;justify-content: center; align-items: center; gap: 10px;">
   <img width="589" height="879" alt="Screenshot 2026-03-04 185823" src="https://github.com/user-attachments/assets/54624f95-fa96-4669-9edc-00f5ab69a7db" />
   <img width="632" height="868" alt="Screenshot 2026-03-04 185848" src="https://github.com/user-attachments/assets/1fac814d-ac42-424d-9d93-374351dda095" />
   <img width="635" height="869" alt="Screenshot 2026-03-04 185650" src="https://github.com/user-attachments/assets/ba3827ad-9cad-4ccd-b53a-4e5356c7acd5" />
   <img width="637" height="870" alt="Screenshot 2026-03-04 185757" src="https://github.com/user-attachments/assets/b1cb3e49-0b61-4624-a271-c87e0d8109a0" />
</div>


**Emergency Help in Seconds** - A medical emergency coordination demo app for filming and prototype walkthroughs.

## Overview

LifelineDoc is a **frontend-only** SPA that simulates medical emergency coordination in real time. There is no backend; all flows use local state and mock data to support demo and filming scenarios.

## Core User Flow

### 1) Entry & Authentication

1. User opens `/` (landing + splash).
2. User either:
   - signs in via `/login` (role selected in the login form), or
   - selects role via `/select-role` and creates account on `/signup`.
3. App stores selected role (`patient`, `doctor`, or `ambulance`) in auth context and redirects to `/dashboard`.

### 2) Role-Based Dashboard Experience

- **Patient** dashboard: SOS button, profile snapshot, emergency contacts, quick access to doctors/ambulances/health.
- **Doctor** dashboard: incoming emergency simulation and quick action to open doctor emergency POV.
- **Ambulance** dashboard: dispatch-oriented overview and quick action into ambulance view.

### 3) Emergency Session Flow (Simulated)

When a patient starts SOS, the emergency session advances through mock states:

1. `INITIATED`
2. `SEARCHING_DOCTOR`
3. `DOCTOR_FOUND`
4. `CONNECTING_VIDEO`
5. `VIDEO_CONNECTED`
6. `DISPATCHING_AMBULANCE`
7. `AMBULANCE_ASSIGNED`
8. `AMBULANCE_EN_ROUTE`
9. `SUMMARY_SYNC`

Supporting pages:
- `/emergency` - patient emergency timeline/session view
- `/doctor/emergency-pov` - doctor perspective
- `/ambulance` - ambulance perspective

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page |
| `/login` | Sign in (role required) |
| `/select-role` | Role selection before signup |
| `/signup` | Account creation using selected role |
| `/dashboard` | Role-aware home dashboard |
| `/emergency` | Active emergency session (patient) |
| `/doctor/emergency-pov` | Emergency handling (doctor) |
| `/ambulance` | Active dispatch view (ambulance) |
| `/doctors` | Registered doctors list |
| `/ambulances` | Available ambulances list |
| `/health` | Patient health & wellness dashboard |
| `/notifications` | Notifications center |

## Updated Project Structure

```text
.
├── public/
│   ├── assets/                  # App logos and static visual assets
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service worker
├── src/
│   ├── components/
│   │   ├── ui/                  # shadcn/ui primitives
│   │   ├── BottomNav.tsx
│   │   ├── PwaInstallManager.tsx
│   │   ├── VideoCallUI.tsx
│   │   ├── StatusLog.tsx
│   │   ├── DoctorCard.tsx
│   │   ├── AmbulanceCard.tsx
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.tsx      # Current role/auth state
│   ├── data/
│   │   └── mockData.ts          # Mock users, doctors, ambulances, patient data
│   ├── hooks/
│   │   ├── useEmergencySession.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Login.tsx
│   │   ├── RoleSelect.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Emergency.tsx
│   │   ├── EmergencyDocPOV.tsx
│   │   ├── AmbulanceView.tsx
│   │   ├── DoctorsList.tsx
│   │   ├── AmbulancesList.tsx
│   │   ├── Health.tsx
│   │   └── notifications.tsx
│   ├── services/
│   │   └── mockEmergencyService.ts
│   ├── types/
│   │   └── emergency.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Tech Stack

- **React 18 + TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui** components
- **React Router 6**
- **TanStack Query**
- **PWA support**

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run locally

```bash
npm install
npm run dev
```

### Build & preview

```bash
npm run build
npm run preview
```

## Demo Notes

- Authentication is simulated (no real backend).
- Emergency progression is mocked for demo predictability.
- Video, maps, and dispatch integrations are visual simulations.

⚠️ **For filming/demo use only — not for real emergency response.**
