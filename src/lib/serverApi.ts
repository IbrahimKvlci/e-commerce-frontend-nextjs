import { cookies } from 'next/headers';
import { getCookies, TmpCookiesObj } from 'cookies-next/server'



async function apiRequest(url: string, options: RequestInit) {

  const allCookies: TmpCookiesObj = await getCookies({ cookies })
  const headerCookies = Object.entries(allCookies)
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");


  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'cookie': headerCookies, ...(options.headers || {}) },
    ...options,
  });

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