async function apiRequest(url: string, options: RequestInit) {


  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  if (response.status === 500) {
    throw new Error("Internal server error");
  }
  if (response.status === 204) {
    return;
  }


  const data = await response.json();

  return data;
}

export const apiGet = (url: string) => apiRequest(url, { method: 'GET' });
export const apiPost = (url: string, data: any) =>
  apiRequest(url, { method: 'POST', body: JSON.stringify(data) });
export const apiPut = (url: string, data: any) =>
  apiRequest(url, { method: 'PUT', body: JSON.stringify(data) });
export const apiDelete = (url: string) =>
  apiRequest(url, { method: 'DELETE' });
