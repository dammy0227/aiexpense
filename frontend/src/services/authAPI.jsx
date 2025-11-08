import API from "./api";

// Register user
export const registerUser = (userData) => API.post("/auth/register", userData);

// Login user
export const loginUser = (credentials) => API.post("/auth/login", credentials);

// Update user profile
export const updateUserProfile = (userData) => API.put("/auth/profile", userData);
