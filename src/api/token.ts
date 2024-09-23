// utils/api.ts
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const fetchWithAuth = async (url: string, options?: RequestInit) => {
  const token = getToken();

  const headers: HeadersInit = {
    ...options?.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error('API call failed');
  }
  return response.json();
};
