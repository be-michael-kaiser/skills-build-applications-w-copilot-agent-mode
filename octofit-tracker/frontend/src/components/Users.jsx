import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

const usersEndpoint = '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      try {
        const data = await fetchCollection('users', usersEndpoint)

        if (!ignore) {
          setUsers(data)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!ignore) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="text-muted">Loading users...</p>
  }

  if (status === 'error') {
    return <div className="alert alert-warning">Unable to load users: {error}</div>
  }

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-4" key={user._id ?? user.email}>
            <article className="panel h-100">
              <h2>{user.displayName}</h2>
              <p>{user.role}</p>
              <dl className="metric-list">
                <div>
                  <dt>Username</dt>
                  <dd>{user.username}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{user.team}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{user.email}</dd>
                </div>
              </dl>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users