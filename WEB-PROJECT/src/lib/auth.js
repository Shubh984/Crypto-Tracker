import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = async (username, email, password, password2) => {
  if (password !== password2) {
    throw new Error('Passwords do not match');
  }
  const response = await axios.post(`${API_URL}/user/register`, { username, email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/user/login`, { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const addFavorite = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    '/api/user/favorites',
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeFavorite = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete('/api/user/favorites', {
    data: { productId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getFavorites = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/user/favorites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};