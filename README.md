# React + TypeScript + Vite

# ────────────────────────────────────────────────────────────────
# 1. Build the backend image (run this again only after code changes)
docker compose build backend        # builds ./backend/Dockerfile
# ────────────────────────────────────────────────────────────────

# 2. Start all containers in the background
docker compose up -d                # launches postgres + backend

# 3. Run Prisma migrations inside the backend container
docker compose exec backend npx prisma migrate deploy
#   → applies the SQL from /backend/prisma/migrations to the DB

# 4. Seed the database with demo data (users, invoices, …)
docker compose exec backend npx prisma db seed
#   → executes seed.ts and inserts initial records

# 5. (optional) Check that the demo user was created
docker compose exec postgres \
  psql -U testuser -d invoicedb \
  -c 'SELECT email, password FROM "User";'
#   → prints the email + hashed password you can use to log in

# 6. Inspect running containers & ports
docker compose ps                   # status, names, published ports

---------------------------------------------------------------------
cd frontend

# install dependencies once
npm install

# start Vite dev server on http://localhost:5173
npm run dev