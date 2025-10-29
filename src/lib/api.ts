async function apiRequest(url: string, options: RequestInit) {
  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} ${url} failed, status: ${response.status}`);
  }

  return response.json();
}

export const apiGet = (url: string) => apiRequest(url, { method: 'GET' });
export const apiPost = (url: string, data: any) =>
  apiRequest(url, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (url: string, data: any) =>
  apiRequest(url, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (url: string) =>
  apiRequest(url, { method: 'DELETE' });
