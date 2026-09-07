import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadActivities() {
      try {
        const data = await fetchCollection('activities')

        if (!ignore) {
          setActivities(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadActivities()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading activities...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">Unable to load activities: {error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Activity logging</p>
        <h1>Recent Activities</h1>
      </div>
      <div className="table-responsive panel">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Recorded</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.user}-${activity.recordedAt}`}>
                <td>{activity.user}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : 'Not recorded'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities