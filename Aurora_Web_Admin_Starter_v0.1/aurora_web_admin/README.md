# Aurora Web + Admin Starter

This starter includes:

- Public marketing website
- Admin dashboard shell
- PostgreSQL database schema via Prisma
- Seed script with demo users, merchants, transactions, and risk events
- API route handlers for admin overview and lead capture

## Run locally

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
npm run dev
```

Open:

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin
- Prisma Studio: `npm run prisma:studio`

## Database

Use a local PostgreSQL database or Docker. Example:

```bash
docker run --name aurora-postgres -e POSTGRES_USER=aurora -e POSTGRES_PASSWORD=aurora -e POSTGRES_DB=aurora -p 5432:5432 -d postgres:16
```

## Notes

This is a founder MVP scaffold, not production fintech infrastructure. Before production, add real auth, session management, audit controls, KYC/payment provider integrations, secrets management, logging, monitoring, vulnerability scanning, and penetration testing.
