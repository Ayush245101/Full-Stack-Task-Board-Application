# Full-Stack Task Board Application

Functional task management app built for a time-boxed full-stack challenge.

It includes:
- Python backend with Django REST Framework
- Frontend UI with Vue 3 + Tailwind (served from Django template)
- Frontend-backend integration through REST APIs
- Runtime persistence using a JSON file
- Creative feature: Momentum Streak tracker

## Demo Scope

Core user actions supported:
- Add a task
- View all tasks
- Mark task as complete or incomplete
- Delete a task
- See completion progress as a percentage and progress bar
- Track daily perfect-completion streak

## Process Followed

1. Set up Django project and created a dedicated `tasks` app.
2. Configured DRF and URL routing for clean API structure.
3. Implemented runtime persistence with a JSON storage helper.
4. Built API endpoints for add, list, complete, and delete operations.
5. Created a polished frontend page with Vue + Tailwind.
6. Integrated frontend actions with backend APIs using async fetch calls.
7. Added a creative feature (Momentum Streak) to go beyond baseline requirements.
8. Validated by running migrations, Django checks, and full UI/API flow.

## Working Flow

1. User opens the app at `/`.
2. Frontend loads tasks by calling `GET /api/tasks/`.
3. When user adds a task, frontend calls `POST /api/tasks/`.
4. Backend validates input, writes to JSON, and returns created task.
5. When user toggles completion, frontend calls `PATCH /api/tasks/{id}/complete/`.
6. Backend updates task status in JSON and returns updated object.
7. When user deletes a task, frontend calls `DELETE /api/tasks/{id}/`.
8. Progress bar and streak update in UI after each successful operation.

## Flow Diagram

```text
+----------------------------+
| Start: User opens app      |
+----------------------------+
		  |
		  v
+----------------------------+
| Frontend loads task list   |
| GET /api/tasks/            |
+----------------------------+
		  |
		  v
+----------------------------+
| Backend reads JSON store   |
| runtime_tasks.json         |
+----------------------------+
		  |
		  v
+----------------------------+
| Frontend renders tasks +   |
| progress bar               |
+----------------------------+
		  |
		  v
	+------------------+
	| User Action?     |
	+------------------+
	 /        |        \
	v         v         v
+----------------+ +----------------------+ +----------------------+
| Add Task       | | Toggle Complete      | | Delete Task          |
| POST /api/...  | | PATCH /api/...       | | DELETE /api/...      |
+----------------+ +----------------------+ +----------------------+
	|                    |                          |
	v                    v                          v
+----------------+ +----------------------+ +----------------------+
| Validate title | | Update task status   | | Remove task          |
| Save to JSON   | | Save to JSON         | | Save to JSON         |
+----------------+ +----------------------+ +----------------------+
	|                    |                          |
	+---------+----------+--------------+-----------+
		    |                         |
		    v                         |
     +--------------------------+         |
     | Return API response      |<--------+
     +--------------------------+
		    |
		    v
     +--------------------------+
     | Update UI + Progress     |
     | Recalculate Streak       |
     +--------------------------+
		    |
		    v
     +--------------------------+
     | End                      |
     +--------------------------+
```

## What I Did

- Designed and implemented full backend API with Django REST Framework.
- Added clean separation between API logic and storage logic.
- Built a responsive task UI with add, complete, delete, and progress indicator.
- Connected frontend and backend with real API calls.
- Implemented JSON-based runtime persistence.
- Added unique feature: Momentum Streak with completion celebration effect.
- Prepared project with clear documentation and deployment notes.

## Tech Stack

- Backend: Django 6, Django REST Framework
- Frontend: Vue 3 (CDN), Tailwind CSS (CDN)
- Storage: JSON file at backend/runtime_tasks.json

## Project Structure

- [backend](backend)
: Django project root
- [backend/backend](backend/backend)
: Django settings and project URL routing
- [backend/tasks](backend/tasks)
: App with API views, URL routes, storage layer, and UI template
- [backend/tasks/templates/tasks/index.html](backend/tasks/templates/tasks/index.html)
: Main frontend page
- [backend/tasks/views.py](backend/tasks/views.py)
: API endpoint logic
- [backend/tasks/storage.py](backend/tasks/storage.py)
: JSON runtime persistence utilities

## API Endpoints

Base URL: http://127.0.0.1:8000

1. Add New Task
- Method: POST
- Path: /api/tasks/
- Body JSON:
  { "title": "Prepare submission" }

2. List All Tasks
- Method: GET
- Path: /api/tasks/

3. Mark Task Complete
- Method: PATCH
- Path: /api/tasks/{task_id}/complete/
- Body JSON:
  { "completed": true }

4. Remove Task
- Method: DELETE
- Path: /api/tasks/{task_id}/

## Creative Feature

Momentum Streak:
- The app tracks consecutive days where all existing tasks are completed.
- The streak is saved in browser local storage.
- A small celebration effect appears when a perfect day is achieved.

## Local Setup

Prerequisites:
- Python 3.11+ (tested with 3.13)

Install and run:

1. Create and activate a virtual environment (optional if already present).
2. Install dependencies:
	pip install django djangorestframework django-cors-headers
3. Apply migrations:
	python backend/manage.py migrate
4. Start server:
	python backend/manage.py runserver 127.0.0.1:8000
5. Open:
	http://127.0.0.1:8000/

Windows command used in this workspace:
C:/Users/ayush/Documents/boad management/.venv/Scripts/python.exe backend/manage.py runserver 127.0.0.1:8000

## Replit Deployment Notes

1. Create a new Python Repl and import this repository.
2. Install dependencies:
	pip install django djangorestframework django-cors-headers
3. Run migrations:
	python backend/manage.py migrate
4. Start on Replit port:
	python backend/manage.py runserver 0.0.0.0:3000
5. Use the generated Replit Preview Link.

## Evaluation Readiness

This submission demonstrates:
- Clean backend architecture with separated storage and API layers
- Clear REST endpoint design for full CRUD-like task flow
- Tight frontend-backend integration with async API calls
- Polished responsive UI and progress visibility
- A distinct creative enhancement beyond baseline requirements