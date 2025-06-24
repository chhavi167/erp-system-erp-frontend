

const API_URL = "https://erp-system-erp-backend.onrender.com/api/auth";

// Register new user
export const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  department: string;
}) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Registration failed");
  }

  return res.json();
};

// Login existing user and store token
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Login failed");
  }

  const data = await res.json();
  localStorage.setItem("token", data.token); 
  return data;
};


export const getToken = (): string | null => {
  return localStorage.getItem("token");
};


export const logout = () => {
  localStorage.removeItem("token");
};


export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};


