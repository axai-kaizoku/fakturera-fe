import { API_URL } from "../consts/index.js";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw { data: error, error: true };
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return { error: true, data: error.message };
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw { data: error, error: true };
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return {
      error: true,
      data: error.message,
    };
  }
};
