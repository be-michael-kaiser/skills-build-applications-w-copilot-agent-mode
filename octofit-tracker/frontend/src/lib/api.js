const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.[collectionName],
    payload?.results,
    payload?.items,
    payload?.data,
    payload?.docs,
    payload?.data?.[collectionName],
    payload?.data?.results,
    payload?.data?.items,
    payload?.data?.docs,
  ]

  return candidates.find(Array.isArray) ?? []
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/${collectionName}/`)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload, collectionName)
}