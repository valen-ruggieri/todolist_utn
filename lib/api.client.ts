const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"

type ApiSuccess<T> = { success: true; data: T; meta?: unknown }
type ApiError = { success: false; error: { message: string; code?: string; details?: unknown } }
type ApiResponse<T> = ApiSuccess<T> | ApiError

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: unknown
  requireAuth?: boolean
  retries?: number
  timeoutMs?: number
  headers?: Record<string, string>
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

function getAuthToken(): string | null {
  try {
    if (typeof window === "undefined") return null
    return localStorage.getItem("todolist_token")
  } catch {
    return null
  }
}

async function fetchWithTimeout(input: RequestInfo, init: RequestInit, timeoutMs: number) {
  return new Promise<Response>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("TIMEOUT")), timeoutMs)
    fetch(input, init)
      .then((res) => {
        clearTimeout(timer)
        resolve(res)
      })
      .catch((err) => {
        clearTimeout(timer)
        reject(err)
      })
  })
}

export async function request<T = unknown>(path: string, opts: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    body,
    requireAuth = false,
    retries = 1,
    timeoutMs = 8000,
    headers = {},
  } = opts

  const url = path.startsWith("http") ? path : `${API_BASE.replace(/\/$/, "")}/${path.replace(/^\//, "")}`

  const finalHeaders: Record<string, string> = {
    ...headers,
  }

  if (body && !(body instanceof FormData)) {
    finalHeaders["Content-Type"] = "application/json"
  }

  if (requireAuth) {
    const token = getAuthToken()
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`
  }

  let attempt = 0
  let lastError: unknown

  while (attempt <= retries) {
    try {
      const init: RequestInit = {
        method,
        headers: finalHeaders,
        body: body && !(body instanceof FormData) ? JSON.stringify(body) : (body as any),
      }

      const res = await fetchWithTimeout(url, init, timeoutMs)

      const text = await res.text()
      let json: ApiResponse<T> | null = null
      try {
        json = text ? (JSON.parse(text) as ApiResponse<T>) : null
      } catch {
        // not JSON
      }

      if (!res.ok) {
        // prefer structured API error when available
        if (json && !json.success) {
          throw new Error(json.error?.message || `API ERROR ${res.status}`)
        }
        throw new Error(`HTTP Error ${res.status}`)
      }

      if (json) {
        if (!json.success) throw new Error(json.error?.message || "API returned an error")
        return json.data as T
      }

      // if no JSON wrapper, try to parse raw
      try {
        return JSON.parse(text) as T
      } catch {
        // return empty as unknown
        return (text as unknown) as T
      }
    } catch (err) {
      lastError = err
      attempt += 1
      // retry on network errors or timeout, not on 4xx
      const isNetwork = !(err instanceof Error) || err.message === "Failed to fetch" || err.message === "TIMEOUT"
      if (attempt > retries || !isNetwork) break
      await sleep(200 * attempt)
    }
  }

  throw lastError
}

export const api = {
  get: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method">) => request<T>(path, { ...(opts || {}), method: "GET" }),
  post: <T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(opts || {}), method: "POST", body }),
  put: <T = unknown>(path: string, body?: unknown, opts?: Omit<RequestOptions, "method" | "body">) =>
    request<T>(path, { ...(opts || {}), method: "PUT", body }),
  del: <T = unknown>(path: string, opts?: Omit<RequestOptions, "method">) => request<T>(path, { ...(opts || {}), method: "DELETE" }),
}

