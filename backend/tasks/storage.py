import json
from pathlib import Path
from threading import Lock

from django.conf import settings

_STORAGE_LOCK = Lock()
_STORAGE_PATH = Path(settings.BASE_DIR) / 'runtime_tasks.json'


def load_tasks() -> list[dict]:
    """Read task data from JSON storage, returning an empty list on first run."""
    with _STORAGE_LOCK:
        if not _STORAGE_PATH.exists():
            return []

        with _STORAGE_PATH.open('r', encoding='utf-8') as file:
            payload = json.load(file)

        if isinstance(payload, list):
            return payload

        return []


def save_tasks(tasks: list[dict]) -> None:
    """Persist all tasks to JSON storage for runtime durability."""
    with _STORAGE_LOCK:
        with _STORAGE_PATH.open('w', encoding='utf-8') as file:
            json.dump(tasks, file, indent=2)
