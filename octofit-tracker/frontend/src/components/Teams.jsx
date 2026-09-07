import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadTeams() {
      try {
        const data = await fetchCollection('teams')

        if (!ignore) {
          setTeams(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadTeams()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading teams...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">Unable to load teams: {error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Team management</p>
        <h1>Teams</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="panel h-100">
              <h2>{team.name}</h2>
              <p>{team.city}</p>
              <dl className="metric-list">
                <div>
                  <dt>Mascot</dt>
                  <dd>{team.mascot}</dd>
                </div>
                <div>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                </div>
                <div>
                  <dt>Weekly goal</dt>
                  <dd>{team.weeklyGoalMinutes} min</dd>
                </div>
              </dl>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams