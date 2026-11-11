# Pooja Boutique — React + Tailwind CSS

## Requirements
- Node.js 20.19+ or 22.12+ recommended for current Vite releases
- Your existing Express backend and MongoDB for saving enquiries

## Install and run
```bash
npm install
cp .env.example .env
npm run dev
```
On Windows PowerShell, copy the environment example with:
```powershell
Copy-Item .env.example .env
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Run the backend separately
From your backend folder:
```bash
npm install
node server.js
```
Use the actual filename of your Express entry file if it is not `server.js`. Make sure MongoDB is running and the backend listens on port 3000. The frontend calls `POST /leads` and expects the documented JSON response with `status: true`.

## Images
Copy your own real boutique photographs into `public/images/`. Suggested filenames:
- `hero-dress.jpg` (optional; hero has a gradient fallback)
- `boutique.jpg`
- `dress1.jpg`
- `dress2.jpg`
- `dress3.jpg`
- `dress4.jpg`
- `dress5.jpg`
- `dress6.jpg`

The project does not invent or include boutique photos. If a gallery photo is missing, a styled fallback tile is displayed.

## API configuration
`.env.example` documents `VITE_API_BASE_URL`. Copy it to `.env` and use:
```env
VITE_API_BASE_URL=https://pooja-boutique-backend-z2se.onrender.com
```
Vite environment variables prefixed with `VITE_` are visible in the browser. Never put database credentials, JWT secrets, or other private secrets in them.

## Production build
```bash
npm run build
npm run preview
```
The production files are generated in `dist/`. Deploy `dist/` to a static hosting provider and configure `VITE_API_BASE_URL` to your deployed backend URL before building. Do not use `localhost` for a live site.

## Backend contract used
- `POST /leads`
- JSON body: `{ name, phone, email, service, message }`
- Success: HTTP 201 and `{ status: true, message: "Lead saved successfully", data: ... }`
- Failure: non-2xx and/or `{ status: false, message: ... }`

## Important backend notes
Your schema currently marks `email` as required, although the form treats email as optional. Remove `required: true` from `email` if email should truly be optional. In `getLead`, change `.sort({ createAt: -1 })` to `.sort({ createdAt: -1 })`, because Mongoose timestamps use `createdAt` by default. In the schema, use `minlength: 10` and `maxlength: 10` rather than `max: 10` if you also want string-length validation; retain the controller regex as the main phone validation.
