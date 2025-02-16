import { create } from 'zustand';
import axios from 'axios';
import { UserType } from '@/types/onboarding';;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

interface OnboardingState {
  currentStep: number;
  userType: UserType | null;
  isCompleted: boolean;
  data: any;
  setStep: (step: number) => void;
  setUserType: (type: UserType) => void;
  updateOnboarding: (stepData: any, router: any) => Promise<void>;
}

export const useOnboarding = create<OnboardingState>((set) => ({
  currentStep: 1,
  userType: null,
  isCompleted: false,
  data: {},
  setStep: (step) => set({ currentStep: step }),
  setUserType: (type) => set({ userType: type }),
  updateOnboarding: async (stepData, router) => {
    try {
      const response = await api.put(`/onboarding/update/${stepData.step}`, stepData);
      set({ data: { ...response.data }, currentStep: response.data.currentStep });

      if (response.data.isCompleted) {
        router.push('/profile');
      }
    } catch (error) {
      console.error('Error updating onboarding:', error);
      throw error;
    }
  }
}));