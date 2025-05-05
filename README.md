# React + TypeScript + Vite + NestJS + Prisma

This full-stack project includes:

-  **Frontend**: React + TypeScript + Vite
-  **Backend**: NestJS + Prisma + PostgreSQL
-  Docker-powered local development

---

## 🚀 Backend Setup (via Docker)

```bash
# 1. Build the backend image (run this again only after code changes)
docker compose build backend
# → builds ./backend/Dockerfile

# 2. Start all containers in the background
docker compose up -d
# → launches PostgreSQL + backend API

# 3. Apply Prisma migrations to the DB
docker compose exec backend npx prisma migrate deploy

# 4. Seed the database with demo data
docker compose exec backend npx prisma db seed
# → runs prisma/seed.ts and inserts initial data

# 5. (Optional) View the seeded user
docker compose exec postgres \
  psql -U testuser -d invoicedb \
  -c 'SELECT email, password FROM "User";'
# → shows login credentials for testing

# 6. Check container status and mapped ports
docker compose ps

Frontend Setup (Vite + React)
bash
Copy
Edit
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev