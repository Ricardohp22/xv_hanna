/**
 * Producción (Render, etc.): define `VITE_API_BASE_URL` al construir el front
 * (p. ej. `https://tu-api.onrender.com`, sin barra final).
 * Local: deja sin definir y usa `VITE_SERVER_IP` + `VITE_SERVER_PORT` (por defecto localhost:3000).
 */
export function apiBase(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, '')
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
