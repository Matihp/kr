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

    const onboardingStatus = await api.get("/onboarding/status");
    
    if (!onboardingStatus.data.isCompleted) {
      window.location.href = '/onboarding';
      return;
    }
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error logging in");
    }
    throw new Error("Error logging in");
  }
};

let isAuthenticatingWithGoogleOrGithub = false;
export const googleLogin = async () => {
  try {
    isAuthenticatingWithGoogleOrGithub = true;
    await api.post("/auth/logout");
    localStorage.removeItem('lastAuthCheck');
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  } catch (error) {
    isAuthenticatingWithGoogleOrGithub = false;
    throw error;
  }
};

export const githubLogin = async () => {
  try {
    isAuthenticatingWithGoogleOrGithub = true;
    await api.post("/auth/logout");
    localStorage.removeItem('lastAuthCheck');
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  } catch (error) {
    isAuthenticatingWithGoogleOrGithub = false;
    throw error;
  }
};

export const verifyToken = async () => {
  try {
    if (isAuthenticatingWithGoogleOrGithub) {
      return { isAuthenticated: false, user: null };
    }
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
    isAuthenticatingWithGoogleOrGithub = false;
    localStorage.removeItem('lastAuthCheck');
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