// Talks to the /api/store/:key endpoints added in server.ts.
// Every call is wrapped so a missing/offline backend (e.g. a static-only
// preview deploy) never breaks the app — it just silently falls back to
// whatever is already in local React state / localStorage.

export async function fetchStore<T>(key: string): Promise<T | null> {
  try {
    const res = await fetch(`/api/store/${key}`);
    if (res.status === 404) return null; // not seeded yet, use local defaults
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.value ?? null) as T | null;
  } catch {
    // Backend unreachable — caller keeps using local/localStorage data.
    return null;
  }
}

export async function pushStore<T>(key: string, value: T): Promise<boolean> {
  try {
    const res = await fetch(`/api/store/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    // fetch() only throws on a network-level failure — an oversized payload
    // (413) or a server error (5xx) resolves normally and must be checked
    // explicitly, otherwise a rejected save looks identical to a successful
    // one to the caller.
    return res.ok;
  } catch {
    // Backend unreachable — data still safe in localStorage on this device,
    // it just won't be visible to other visitors until the server is back.
    return false;
  }
}
