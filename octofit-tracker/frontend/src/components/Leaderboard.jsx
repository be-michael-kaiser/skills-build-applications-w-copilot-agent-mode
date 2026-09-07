import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

const leaderboardEndpoint = '/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard', leaderboardEndpoint)

        if (!ignore) {
          setLeaderboard(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadLeaderboard()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">Unable to load leaderboard: {error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="row g-3">
        {leaderboard.map((entry) => (
          <div className="col-md-4" key={entry._id ?? entry.rank}>
            <article className="panel stat-card h-100">
              <span className="rank">#{entry.rank}</span>
              <h2>{entry.user}</h2>
              <p>{entry.team}</p>
              <strong>{entry.points} pts</strong>
              <small>{entry.activeMinutes} active minutes</small>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard