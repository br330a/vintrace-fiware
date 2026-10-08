const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,

    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Erro ${response.status}: ${response.statusText}`,
    )
  }

  return response.json()
}

export const api = {
  get<T>(endpoint: string) {
    return request<T>(endpoint)
  },

  post<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  put<T>(endpoint: string, data: unknown) {
    return request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, {
      method: 'DELETE',
    })
  },
}