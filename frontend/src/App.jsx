import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function App() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(Number(localStorage.getItem('momentum-streak') || 0))
  const [lastPerfectDay, setLastPerfectDay] = useState(localStorage.getItem('last-perfect-day') || '')
  const [error, setError] = useState('')

  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks])
  const progressPercent = useMemo(() => {
    if (!tasks.length) {
      return 0
    }
    return Math.round((completedCount / tasks.length) * 100)
  }, [completedCount, tasks.length])

  const loadTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/tasks/`)
      if (!response.ok) {
        throw new Error('Unable to load tasks.')
      }
      const data = await response.json()
      setTasks(data)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  const maybeUpdateStreak = (nextTasks) => {
    const allComplete = nextTasks.length > 0 && nextTasks.every((task) => task.completed)
    const today = todayKey()

    if (allComplete && lastPerfectDay !== today) {
      const nextStreak = streak + 1
      setStreak(nextStreak)
      setLastPerfectDay(today)
      localStorage.setItem('momentum-streak', String(nextStreak))
      localStorage.setItem('last-perfect-day', today)
    }
  }

  const addTask = async () => {
    const title = newTask.trim()
    if (!title) {
      return
    }

    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error('Could not create task.')
      }

      const created = await response.json()
      const nextTasks = [created, ...tasks]
      setTasks(nextTasks)
      setNewTask('')
      maybeUpdateStreak(nextTasks)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const toggleTask = async (task, completed) => {
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${task.id}/complete/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed }),
      })

      if (!response.ok) {
        throw new Error('Could not update task.')
      }

      const nextTasks = tasks.map((item) => {
        if (item.id === task.id) {
          return { ...item, completed }
        }
        return item
      })

      setTasks(nextTasks)
      maybeUpdateStreak(nextTasks)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  const removeTask = async (taskId) => {
    setError('')
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${taskId}/`, {
        method: 'DELETE',
      })

      if (!response.ok && response.status !== 204) {
        throw new Error('Could not delete task.')
      }

      const nextTasks = tasks.filter((task) => task.id !== taskId)
      setTasks(nextTasks)
      maybeUpdateStreak(nextTasks)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div className="page-shell">
      <main className="board">
        <header className="hero">
          <p className="kicker">Task Management App</p>
          <h1>Momentum Board</h1>
          <p className="subtitle">Frontend lives in React. Backend serves API only.</p>
        </header>

        <section className="composer">
          <input
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addTask()
            }}
            placeholder="Write your next task"
            aria-label="Task title"
          />
          <button type="button" onClick={addTask}>Add Task</button>
        </section>

        <section className="stats">
          <div className="progress-meta">
            <span>Progress {progressPercent}%</span>
            <span>{completedCount}/{tasks.length} complete</span>
          </div>
          <div className="progress-track" aria-label="Task progress">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </section>

        <section className="streak">
          <strong>Creative Feature: Momentum Streak</strong>
          <span>{streak} day{streak === 1 ? '' : 's'} with all tasks completed</span>
        </section>

        {error && <p className="error">{error}</p>}

        <ul className="task-list">
          {!loading && tasks.length === 0 && <li className="empty">No tasks yet. Add one above.</li>}
          {loading && <li className="empty">Loading tasks...</li>}

          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) => toggleTask(task, event.target.checked)}
                />
                <span className={task.completed ? 'done' : ''}>{task.title}</span>
              </label>
              <button type="button" className="delete" onClick={() => removeTask(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
