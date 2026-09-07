import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts', workoutsEndpoint)

        if (!ignore) {
          setWorkouts(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadWorkouts()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading workouts...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">Unable to load workouts: {error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Workout suggestions</p>
        <h1>Workouts</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-lg-4" key={workout._id ?? workout.title}>
            <article className="panel h-100">
              <span className="badge text-bg-success mb-3">{workout.level}</span>
              <h2>{workout.title}</h2>
              <p>{workout.focus} - {workout.durationMinutes} min</p>
              <ul className="exercise-list">
                {(workout.exercises ?? []).map((exercise) => (
                  <li key={exercise}>{exercise}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts