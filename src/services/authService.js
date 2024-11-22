// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || 'Login failed');
    } else {
      throw new Error('An error occurred during login. Please try again later.');
    }
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw new Error(err.response.data.message || 'Signup failed');
    } else {
      throw new Error('An error occurred during signup. Please try again later.');
    }
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
};

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/users/verify`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Token verification error:', error);
    throw error;
  }
};