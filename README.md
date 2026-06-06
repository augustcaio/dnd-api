# D&D 5e — Guia do Mestre API

A RESTful API for Dungeon Masters running D&D 5e campaigns. Provides quick access to deities, planes of existence, treasures, NPCs, dungeons, and other essential game information.

## Tech Stack

- **Runtime:** Node.js 24
- **Framework:** Express 5
- **Database:** PostgreSQL (Neon serverless)
- **ORM:** Prisma 7 (with `@prisma/adapter-pg`)
- **Validation:** Zod
- **Deployment:** Vercel

## Current Endpoints

### Status

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | API health check |

### Mundo (World)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/deities` | List all deities (25 seeded) |
| GET | `/api/deities/:id` | Get a deity by ID |
| GET | `/api/planes` | List all planes of existence (18 seeded) |
| GET | `/api/planes/:id` | Get a plane by ID |

### Documentation

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/docs` | Swagger UI documentation |

## Running Locally

### Prerequisites

- Node.js 22+
- PostgreSQL database (or Neon account for serverless)

### Setup

```bash
# Clone the repository
git clone https://github.com/augustcaio/dnd-api.git
cd dnd-api

# Install dependencies (use npm.cmd on Windows if npm is behind a Volta shim)
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Run database migrations
npx prisma migrate dev

# Seed the database
node prisma/seed.js

# Start the development server
npm run dev
```

The server will start at `http://localhost:3000`.

## Project Structure

```
dnd-api/
  controllers/      # Request handlers
  middleware/        # Error handler, validation
  models/           # Data models
  prisma/
    schema.prisma   # Database schema (48 models + 5 enums)
    seed.js         # Database seed script
  public/           # Frontend (API explorer)
  routes/           # Express route definitions
  services/         # Business logic layer
  utils/            # Prisma client singleton
  server.js         # Application entry point
  vercel.json       # Vercel deployment config
  prisma.config.ts  # Prisma v7 datasource config
```

## Sprint Roadmap

| Sprint | Focus | Status |
|--------|-------|--------|
| 1 | Infrastructure (Express, Prisma, Neon, Vercel, health + docs) | Done |
| 2 | Deities and Planes endpoints | Done |
| 3 | Adventures (objectives, villains, allies, patrons, introductions, climaxes, generate) | Pending |
| 4 | NPCs and Villains | Pending |
| 5 | Dungeons and Environments | Pending |
| 6 | Treasures (gems, art objects, individual and hoard tables) | Pending |
| 7 | Magic Items (tables A-I, artifacts, intelligent items) | Pending |
| 8 | Poisons, Diseases, and Madness | Pending |
| 9 | Rules (ability checks, DCs, saving throws, chase, siege, XP) | Pending |
| 10 | Monster creation workshop | Pending |
| 11 | Downtime activities and campaign events | Pending |
| 12 | Global search, tests, and CI/CD | Pending |

## Deployment

The API is deployed on Vercel and available at:

https://dnd-api-three.vercel.app

A micro frontend (API explorer) is served at the root URL with search, JSON syntax highlighting, generator forms, and request history.

## License

ISC
