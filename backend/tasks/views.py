from datetime import datetime, timezone
from uuid import uuid4

from django.http import HttpRequest
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .storage import load_tasks, save_tasks


@api_view(['GET'])
@ensure_csrf_cookie
def csrf_token(request: HttpRequest):
	return Response({'detail': 'CSRF cookie set'})


@api_view(['GET', 'POST'])
def tasks_collection(request: HttpRequest):
	tasks = load_tasks()

	if request.method == 'GET':
		return Response(tasks)

	title = (request.data.get('title') or '').strip()
	if not title:
		return Response({'error': 'Task title is required.'}, status=status.HTTP_400_BAD_REQUEST)

	task = {
		'id': str(uuid4()),
		'title': title,
		'completed': False,
		'created_at': datetime.now(timezone.utc).isoformat(),
	}
	tasks.insert(0, task)
	save_tasks(tasks)
	return Response(task, status=status.HTTP_201_CREATED)


@api_view(['PATCH'])
def complete_task(request: HttpRequest, task_id: str):
	tasks = load_tasks()

	for task in tasks:
		if task['id'] == task_id:
			completed = request.data.get('completed')
			if completed is None:
				task['completed'] = True
			else:
				task['completed'] = bool(completed)

			save_tasks(tasks)
			return Response(task)

	return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_task(request: HttpRequest, task_id: str):
	tasks = load_tasks()
	filtered_tasks = [task for task in tasks if task['id'] != task_id]

	if len(filtered_tasks) == len(tasks):
		return Response({'error': 'Task not found.'}, status=status.HTTP_404_NOT_FOUND)

	save_tasks(filtered_tasks)
	return Response(status=status.HTTP_204_NO_CONTENT)
