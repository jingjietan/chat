
## Start the app

cd to backend and run 
```
  pnpm run build:frontend
  pnpm start
```
to run the app.

### Environment varaibles

Frontend
- VITE_BASE_URL: localhost or url of site hosted (include http/https) appended with (/api)

Backend
- DATABASE_URL: postgres url
- REDIS_URL: redis url
- SECRET: for hashing password/session
- BASE_URL: to prevent CORS
- PORT: port to host

