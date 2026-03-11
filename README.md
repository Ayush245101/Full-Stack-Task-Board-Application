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