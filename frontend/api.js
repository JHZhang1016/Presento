
const BASE_URL = 'http://localhost:5001/api/account';

export const loginApi = async (data) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed.');
  }
  const token = await response.json();
  localStorage.setItem('token', token.token);
  localStorage.setItem('isLoggedIn', true);
}

export const registerApi = async (data) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'register failed.');
  }
  const token = await response.json();
  localStorage.setItem('token', token.token);
  localStorage.setItem('isLoggedIn', true);
}

export const logoutApi = async () => {
  const token = localStorage.getItem('token');
  await fetch(`${BASE_URL}/admin/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  localStorage.removeItem('token');
  localStorage.removeItem('isLoggedIn');
}

export const getStoreApi = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/store`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Get information failed.');
  }
  const data = await response.json();
  return data.store;
}

export const setStoreApi = async (data) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/store`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ store: data })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Set information failed.');
  }
  return await response.json();
}