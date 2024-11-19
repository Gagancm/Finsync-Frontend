// src/services/api.js
const API_URL = 'http://localhost:5000/api'; // Adjust port as needed

// Existing user authentication endpoints
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const signupUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const verifyToken = async (token) => {
  const response = await fetch(`${API_URL}/users/verify-token`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

// New subscription endpoints
export const createSubscription = async (planId, token) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ planId }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getSubscription = async (token) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};