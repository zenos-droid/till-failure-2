# Production Notes

- Use Neon PostgreSQL and set `DATABASE_URL` in Render.
- Set strong `JWT_SECRET` and `REFRESH_TOKEN_SECRET`.
- Set frontend `VITE_API_URL` to the Render backend `/api` URL.
- Run Prisma deploy before starting the backend.
- WhatsApp providers are abstracted; configure provider credentials through environment variables before enabling queue workers.
