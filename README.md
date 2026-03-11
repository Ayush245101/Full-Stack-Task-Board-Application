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

## Working Flow

1. User opens React frontend.
2. Frontend requests existing tasks from backend.
3. Backend reads runtime_tasks.json and returns data.
4. User performs add/toggle/delete actions.
5. Frontend calls corresponding API endpoints.
6. Backend updates JSON storage and returns response.
7. Frontend refreshes task list, progress, and streak.

## Flow Diagram (Box and Line)

```text
+------------------------------+
| Start: User opens React app  |
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
| Backend updates JSON and returns API response            |
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
- Run migrations:
  python backend/manage.py migrate
- Start backend server:
  python backend/manage.py runserver 127.0.0.1:8000

2. Frontend setup
- Open new terminal:
  cd frontend
- Install dependencies:
  npm install
- Start frontend dev server:
  npm run dev

3. Open app
- Use the URL shown by Vite (usually http://127.0.0.1:5173)

## Evaluation Mapping

- Python backend architecture: API-only, modular storage + views
- API design: clean REST endpoints for task lifecycle
- Frontend-backend integration: React fetch calls to Django APIs
- UI polish: responsive layout, progress, feedback states
- Code quality: separated concerns and readable structure
- Creative requirement: Momentum Streak feature
