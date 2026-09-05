# GitHub PR Analyzer

AI-powered GitHub Pull Request analyzer. Paste a PR link, and it fetches the PR's
metadata + diff from GitHub, sends it to **Groq** (LLM API) for review, and stores
the result in **MongoDB**.

## Stack
- **Backend:** Fastify + Mongoose (MongoDB)
- **Frontend:** React (Vite) + plain CSS
- **AI:** Groq API (`groq-sdk`)

## Folder Structure
```
github-pr-analyzer/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── controllers/prController.js
│   │   ├── models/Analysis.js    # Mongoose schema
│   │   ├── routes/prRoutes.js
│   │   ├── services/githubService.js   # fetch PR data from GitHub
│   │   ├── services/groqService.js     # call Groq for AI analysis
│   │   ├── app.js                # Fastify app + plugins
│   │   └── server.js             # entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── PRInput.jsx
    │   │   ├── AnalysisResult.jsx
    │   │   └── Loader.jsx
    │   ├── styles/
    │   │   ├── index.css
    │   │   └── App.css
    │   ├── App.jsx
    │   ├── api.js                # axios calls to backend
    │   └── main.jsx
    ├── index.html
    ├── .env.example
    └── package.json
```

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env      # fill in MONGO_URI, GROQ_API_KEY, GITHUB_TOKEN
npm install
npm run dev                # http://localhost:5000
```

Get a free Groq API key at https://console.groq.com/keys

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

## API Endpoints
| Method | Route              | Description                       |
|--------|--------------------|-----------------------------------|
| POST   | `/api/pr/analyze`  | Body: `{ prUrl }` → analyzes a PR |
| GET    | `/api/pr/history`  | List last 50 analyses             |
| GET    | `/api/pr/:id`      | Get single analysis by id         |
| GET    | `/health`          | Health check                      |

## Next steps / ideas to extend
- Add auth (GitHub OAuth login) so users can analyze private repos
- Add pagination + search on the history page
- Stream the AI response token-by-token to the frontend
- Add a "compare PRs" view
- Rate-limit the `/analyze` endpoint per IP/user
