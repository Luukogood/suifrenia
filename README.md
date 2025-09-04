## SuiFrenia – MERN Card Battle Game (Sui Inspired)

An interactive card battle game built with the MERN stack (MongoDB, Express.js, React, Node.js), inspired by Sui/SuiFrens aesthetics. The app features card evolution, PvP-style battles, a world/battle map, and Google authentication. Frontend is Vite + React + Tailwind; backend is Express + MongoDB with a REST API.

[![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-404d59?style=for-the-badge&logo=express&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-green?style=for-the-badge)](https://suifrenia.netlify.app/)
[![Telegram](https://img.shields.io/badge/Telegram-@lorine93s-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/lorine93s)

### Features
- **Card Evolution**: Level up cards to unlock stats and abilities
- **Battle System**: Turn-based card battles (PvP-style experience)
- **Battle Map**: Navigate a dynamic map to discover challenges
- **Google Authentication**: Simple sign-in for players
- **MERN Architecture**: React + Vite frontend, Express + MongoDB backend
- **Asset-rich UI**: Optimized images, SFX, and themed visuals

### Repository Structure
```
staking-platfom-sui/
  ├─ front-end/            # Vite + React + Tailwind app
  │  ├─ src/
  │  │  ├─ pages/          # Game pages (BattleGround, Map, Market, Login, etc.)
  │  │  ├─ components/     # UI components (Nav, etc.)
  │  │  └─ utils/          # API helpers, zk login setup
  │  └─ public/            # Images, audio, and static assets
  └─ backend/              # Express REST API + MongoDB models
     ├─ models/            # Mongoose schemas (user, card, collections)
     ├─ controllers/       # Business logic
     └─ routes/            # API routes (users, cards, collections)
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1) Backend Setup
```bash
cd backend
npm install

# Create .env
copy NUL .env
# Then add the following keys:
# MONGODB_URI=mongodb://localhost:27017/suifrenia
# PORT=4000
# JWT_SECRET=changeme
# CLIENT_URL=http://localhost:5173

# Run dev server
npm run dev
# or
npm start
```

### 2) Frontend Setup
```bash
cd front-end
npm install

# Create .env (Vite)
copy NUL .env
# VITE_API_BASE_URL=http://localhost:4000

npm run dev
# App will run on http://localhost:5173
```

## API Overview (Backend)

Base URL: `http://localhost:4000`

- `POST /api/users/login` – Google login / session creation
- `GET /api/cards` – List cards
- `POST /api/cards` – Create/upgrade card (auth required)
- `GET /api/collections` – List collections
- `POST /api/collections` – Create collection (auth required)

Note: Exact endpoints may vary; see `backend/routes/*.js` and `backend/controllers/*.js` for full details.

## Development Notes
- Frontend uses **Vite** and **Tailwind**; static assets are under `front-end/public`
- Backend uses **Express** + **Mongoose** with a modular folder layout
- A lightweight Node proxy is available under `front-end/node-api/server-api.js` if needed
- Consider adding robust auth middleware and validation for production

## Deployment
- Frontend: Netlify/Vercel (Vite static build)
  - `npm run build` in `front-end`, then upload `dist`
- Backend: Vercel/Render/Fly/Heroku (Express + MongoDB)
  - Ensure environment variables are configured (MongoDB URI, JWT secret)
  - Repo includes `backend/vercel.json` for Vercel deployment hints

## Screenshots
Add gameplay and UI screenshots from `front-end/public` (e.g., `landing1.png`, `battle` views) to showcase features.

## Contributing
PRs and issues are welcome. Please:
- Keep changes small and focused
- Update documentation when adding features
- Add basic tests where reasonable

## License
Unless otherwise stated, this repository is provided under an open-source-friendly license. If you need a specific license, add a `LICENSE` file (MIT/Apache-2.0 recommended).

## Contact
[![Telegram](https://img.shields.io/badge/Telegram-@lorine93s-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/lorine93s)
