
import { toast } from 'sonner';

// Remove direct API URL reference and use the proxy path instead
// This ensures requests go through the Vite proxy to avoid CORS issues
const API_BASE_URL = '/api';

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  company?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const result = await response.json();
    toast.success('Registration successful!');
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.');
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();
    toast.success('Login successful!');
    return result;
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    toast.success('Logged out successfully');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    toast.error('Logout failed. Please try again.');
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
