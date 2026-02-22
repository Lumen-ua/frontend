const API_URL = import.meta.env.VITE_API_URL;

export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = {};

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

 if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        message = data.message || JSON.stringify(data);
      } else {
        const text = await res.text();
        if (text) message = text;
      }
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export async function apiRequestFormData(path, { method = "POST", formData, token } = {}) {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: formData,
  });


  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        message = data.message || JSON.stringify(data);
      } else {
        const text = await res.text();
        if (text) message = text;
      }
    } catch (_) {}
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}