// Generic GET request
export async function apiGet(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`GET ${url} failed, status: ${response.status}`);
  }
  return response.json();
}

// Generic POST request
export async function apiPost(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`POST ${url} failed, status: ${response.status}`);
  }
  return response.json();
}

// Generic PUT request
export async function apiPut(url: string, data: any) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`PUT ${url} failed, status: ${response.status}`);
  }
  return response.json();
}

// Generic DELETE request
export async function apiDelete(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`DELETE ${url} failed, status: ${response.status}`);
  }
  return response.json();
}

