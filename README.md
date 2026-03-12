# Full-Stack Task Board Application

A clean full-stack task management application with:
- Frontend only in React (Vite)
- Backend only in Django REST Framework APIs
- Runtime persistence with JSON storage
- Creative feature: Momentum Streak

## Final Architecture

- Frontend app: frontend
- Backend API: backend
- Frontend and backend are fully separated
- Frontend consumes backend through REST endpoints only

## Tech Stack

- Frontend: React + Vite + CSS
- Backend: Django + Django REST Framework
- Persistence: JSON file at backend/runtime_tasks.json

## Features Implemented

- Add task
- List all tasks
- Mark task complete/incomplete
- Delete task
- Progress indicator (percentage + progress bar)
- Creative feature: Momentum Streak (stored in browser localStorage)
- Production-ready security baseline:
  - No blanket `@csrf_exempt`
  - CSRF cookie bootstrap endpoint
  - Environment-driven CORS and CSRF trusted origins
  - Environment-driven frontend API configuration

## Project Structure

- backend
  - backend: Django project configuration
  - tasks: API app (views, urls, storage)
- frontend
  - src/App.jsx: React UI logic
  - src/App.css: UI styling
  - vite.config.js: API proxy in dev mode

## Backend API Endpoints

Base URL: http://127.0.0.1:8000

0. CSRF Bootstrap
- Method: GET
- Path: /api/csrf/
- Purpose: Sets CSRF cookie used by unsafe methods (POST/PATCH/DELETE)

1. Create Task
- Method: POST
- Path: /api/tasks/
- Body:
  { "title": "Finish assignment" }

2. List Tasks
- Method: GET
- Path: /api/tasks/

3. Update Completion
- Method: PATCH
- Path: /api/tasks/{task_id}/complete/
- Body:
  { "completed": true }

4. Delete Task
- Method: DELETE
- Path: /api/tasks/{task_id}/

## Security and Configuration

Backend settings are now environment-driven and production-friendly.

Backend env file template: [backend/.env.example](backend/.env.example)
- `DJANGO_ALLOWED_HOSTS`
- `CORS_ALLOWED_ORIGINS`
- `CSRF_TRUSTED_ORIGINS`

Frontend env file template: [frontend/.env.example](frontend/.env.example)
- `VITE_API_BASE_URL`
- `VITE_TASKS_API_PATH`
- `VITE_CSRF_API_PATH`

CSRF flow:
1. Frontend calls `/api/csrf/` once to receive `csrftoken` cookie.
2. Frontend includes `X-CSRFToken` for POST/PATCH/DELETE requests.
3. Backend validates CSRF token via `CsrfViewMiddleware`.
4. CORS is restricted to configured origins and credentials are enabled.

## Working Flow

1. User opens React frontend.
2. Frontend calls `/api/csrf/` to initialize CSRF cookie.
3. Frontend requests existing tasks from backend.
4. Backend reads runtime_tasks.json and returns data.
5. User performs add/toggle/delete actions.
6. Frontend calls corresponding API endpoints with CSRF header.
7. Backend validates CSRF, updates JSON storage, and returns response.
8. Frontend refreshes task list, progress, and streak.

## Flow Diagram (Box and Line)

```text
+------------------------------+
| Start: User opens React app  |
+------------------------------+
               |
               v
+------------------------------+
| GET /api/csrf/               |
| Set csrftoken cookie         |
+------------------------------+
               |
               v
+------------------------------+
| GET /api/tasks/              |
| Load existing tasks          |
+------------------------------+
               |
               v
+------------------------------+
| Backend reads JSON storage   |
| backend/runtime_tasks.json   |
+------------------------------+
               |
               v
+------------------------------+
| Frontend renders list        |
| + progress indicator         |
+------------------------------+
               |
               v
       +-------------------+
       | User action?      |
       +-------------------+
         /       |       \
        v        v        v
+-------------+ +------------------+ +------------------+
| Add Task    | | Toggle Complete  | | Delete Task      |
| POST /api   | | PATCH /api       | | DELETE /api      |
+-------------+ +------------------+ +------------------+
      |                |                    |
      v                v                    v
+----------------------------------------------------------+
| Backend validates CSRF, updates JSON, returns response   |
+----------------------------------------------------------+
               |
               v
+------------------------------+
| Frontend updates UI          |
| Progress + Momentum Streak   |
+------------------------------+
               |
               v
+------------------------------+
| End                          |
+------------------------------+
```

## What I Did

- Converted architecture to strict separation:
  - Frontend logic only in frontend
  - Backend logic only in backend
- Replaced default React starter with full task manager UI.
- Kept backend as API-only (removed template rendering route).
- Added Vite proxy for smooth frontend-backend local integration.
- Implemented and validated all required task operations.
- Added and preserved the creative Momentum Streak feature.

## Run Locally

Prerequisites:
- Python 3.11+
- Node.js 18+

1. Backend setup
- Install Python dependencies:
  pip install django djangorestframework django-cors-headers
- Configure backend environment variables (copy from example):
  backend/.env.example
- Run migrations:
  python backend/manage.py migrate
- Start backend server:
  python backend/manage.py runserver 127.0.0.1:8000

2. Frontend setup
- Open new terminal:
  cd frontend
- Install dependencies:
  npm install
- Configure frontend environment variables (copy from example):
  frontend/.env.example
- Start frontend dev server:
  npm run dev

3. Open app
- Use the URL shown by Vite (usually http://127.0.0.1:5173)

## Evaluation Mapping

- Python backend architecture: API-only, modular storage + views
- API design: clean REST endpoints for task lifecycle
- Frontend-backend integration: React fetch calls to Django APIs
- Security readiness: CSRF-protected unsafe methods and origin-restricted CORS
- UI polish: responsive layout, progress, feedback states
- Code quality: separated concerns and readable structure
- Creative requirement: Momentum Streak feature
