# PM Electricals & Electronics · Coimbatore

A premium, mobile-first lead generation website for appliance repair. The experience puts phone calls and service requests first and keeps the brand focused on the service team.

## Project structure

```text
client/                 Angular single-page application
  src/app/              Homepage, responsive sections, booking form
  src/assets/           Local static assets
  angular.json           Angular CLI configuration
server/                 Express REST API
  src/config/            MongoDB connection
  src/models/            Mongoose booking model
  src/routes/            Health, service and booking endpoints
  src/server.js          API bootstrap, security headers and CORS
  .env.example           Local environment template
```

## Run locally

Requirements: Node.js 24.15+ (or 22.22.3+) and MongoDB 7+ (local or hosted).

```powershell
npm install
Copy-Item server/.env.example server/.env
```

Set `MONGODB_URI` in `server/.env`, ensure MongoDB is running, and start both apps from the project root:

```powershell
npm run dev
```

Angular runs at `http://localhost:4201` (4200 is already used by another local project). The API runs at `http://localhost:5000/api`.

## API

- `GET /api/health` — service health
- `GET /api/services` — repair categories
- `POST /api/bookings` — validates and stores a service request in MongoDB

## Before launch

- Confirm the business hours, service coverage and booking preferences.
- Replace the sample images with approved business photography and confirm external image licensing/availability.
- The 4.7 rating and 15-review count match the provided Google listing. The featured review is a short excerpt; confirm permitted use before publishing.
- Add a privacy notice and production domain/CORS settings.
- Configure a production MongoDB URI and deploy the Angular and API applications.

