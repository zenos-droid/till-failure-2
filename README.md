# Till Failure 2 Gym Management SaaS

Full-stack monorepo for the Till Failure gym management app.

## Structure

- `frontend/` - preserved Vite/React frontend
- `backend/` - Express, TypeScript, Prisma, JWT, RBAC API
- `docs/` - analysis and API notes
- `deployment/` - Render deployment blueprint

## Local Setup

1. Configure `backend/.env` from `backend/.env.example`.
2. Run `npm install` in `frontend` and `backend`.
3. Run `npm run prisma:generate --prefix backend`.
4. Run `npm run prisma:migrate --prefix backend`.
5. Run `npm run db:seed --prefix backend`.
6. Start both apps with `npm run dev`.

Frontend: http://localhost:3000
Backend: http://localhost:4010
