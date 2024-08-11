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
