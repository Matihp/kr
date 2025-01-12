import axios from "axios";
import { ProfileData } from "../../kr-backend/src/types/profileTypes";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Error registering");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error logging in");
    }
    throw new Error("Error logging in");
  }
};

export const googleLogin = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

export const githubLogin = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
};

export const verifyToken = async () => {
  try {
    const response = await api.get("/auth/verify-token");
    return response.data;
  } catch (error) {
    console.error("Error verifying token:", error);
    return { isAuthenticated: false, user: null };
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Error logging out");
  }
};

export const updateProfile = async (
  userId: string,
  profileData: ProfileData
) => {
  try {
    const response = await api.put(`/profile/update-profile/${userId}`, profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Error updating profile");
  }
};