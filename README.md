# 🚀 NavKalpana‑RICR‑NK‑0016 — VoltPath

A full‑stack electric‑vehicle route and charging optimizer built during the NavKalpana hackathon. VoltPath simulates the entire energy lifecycle of an EV trip, predicts charging stops, cost, battery health impact, and adapts for weather & traffic conditions.

---

## 🔍 Problem Statement

EV owners today struggle with:

- **Range anxiety** – uncertain if the battery will last
- **Finding charging stations** along a route
- **Energy use fluctuations** from weather or HVAC
- **Traffic delays** that consume extra power
- **Long‑term battery degradation** from frequent fast‑charging

VoltPath addresses all of the above by generating an optimized trip plan that includes charging stops, energy consumption, cost, time, and advanced metrics.

---

## 🧱 Architecture & Tech Stack

### Frontend
- **React 18** bootstrapped with Vite
- **Tailwind CSS** for utility‑first styling
- **Leaflet** + Mapbox for route visualization
- **Recharts** for energy/cost charts
- **Framer Motion** for subtle animations

### Backend
- **Node.js** with ES modules
- **Express** API server
- Validation via **zod**
- Route & geocoding via OpenStreetMap/OSRM
- Simulation logic in src/utils

### Database
- **MongoDB** (mongoose models) for stations & saved trips

### Dev Tools
- Prettier, ESLint, Husky (if included), Git for version control

---

## 🚀 Getting Started

1. **Clone repository**
   `ash
   git clone https://github.com/your-username/NavKalpana-RICR-NK-0016.git
   cd NavKalpana-RICR-NK-0016
   `

2. **Configure environment**
   - Copy .env.example to .env in both ackend/ and rontend/ (if present)
   - Set values:
     `ini
     # backend/.env
     PORT=4500
     MONGO_URI=mongodb://localhost:27017/voltpathDb
     CORS_ORIGIN=http://localhost:5173
     DEFAULT_ELECTRICITY_RATE=10
     DEFAULT_SAFETY_FACTOR=0.85
     DEFAULT_TARGET_SOC=80
     DEFAULT_CHARGING_POWER_KW=60

     # frontend/.env (Vite format)
     VITE_API_BASE_URL=http://localhost:4500/api
     `

3. **Seed database** (only once or when adding stations)
   `ash
   cd backend
   npm install
   npm run seed        # populates 1000+ stations
   `

4. **Run backend**
   `ash
   npm run dev         # starts server on http://localhost:4500
   `

5. **Run frontend**
   `ash
   cd ../frontend
   npm install
   npm run dev         # opens http://localhost:5173
   `

6. **Use the app** by visiting http://localhost:5173. Enter start/destination and generate a route.

---

## 🔌 API Reference

| Method | Route           | Description                          | Body Example
|--------|-----------------|--------------------------------------|-------------
| POST   | /api/trips/plan | Generate optimized route & simulation | see RouteForm.jsx payload
| POST   | /api/trips     | Save trip result to DB               | whole planResult object
| GET    | /api/trips     | Retrieve recent trips                | —
| GET    | /api/trips/:id | Get single trip by id                | —

All endpoints return { ok: boolean, ... } with error on failure.

---

## 🗂 Project Structure

`
backend/
  src/
    controllers/
    model/
    routes/
    utils/          # simulation, geo, etc.
    seeders/        # populate charging stations
 frontend/
  src/
    components/     # UI widgets
    pages/          # top‑level views
    context/        # TripContext provider
    config/         # api client
    utils/          # frontend helpers
`

---

## 🛠 Development Notes

- **Changing station data:** modify ackend/src/seeders/seedChargingStations.js and rerun 
pm run seed.
- **Sim engine parameters** (safety factor, target SOC, etc.) controlled via .env or passed from front.
- **Timeouts:** frontend Axios client has 120s timeout for route planning.

---

## 📸 Screenshots

<p align= center>
  <img src=screenshots/inputPage.png width=700 alt=Input Page />
</p>

---

## 🔮 Future Improvements

- Real‑time weather & traffic APIs
- Live station availability/pricing
- Machine‑learning based trip suggestions
- Mobile app version
- Battery health monitoring & alerts
- Internationalization/localization

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch git checkout -b feature/xyz
3. Commit your changes and push
4. Open a pull request with description

Please follow existing code style and test new features where possible.

---

## 🧾 License

MIT License © 2026 VoltPath team

---

## 🙌 Acknowledgements

Built for the NavKalpana Hackathon 2025. Thanks to all mentors, judges and contributors!

