export function apiBase(): string {
  const ip = import.meta.env.VITE_SERVER_IP || 'localhost'
  const port = import.meta.env.VITE_SERVER_PORT || '3000'
  return `http://${ip}:${port}`
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${apiBase()}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { error?: string }).error || res.statusText)
  }
  return res.json() as Promise<T>
}
