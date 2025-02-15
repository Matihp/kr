import { create } from 'zustand';
import axios from 'axios';
import { UserType } from '@/types/onboarding';

interface OnboardingState {
  currentStep: number;
  userType: UserType | null;
  isCompleted: boolean;
  data: any;
  setStep: (step: number) => void;
  setUserType: (type: UserType) => void;
  updateOnboarding: (stepData: any) => Promise<void>;
}

export const useOnboarding = create<OnboardingState>((set) => ({
  currentStep: 1,
  userType: null,
  isCompleted: false,
  data: {},
  setStep: (step) => set({ currentStep: step }),
  setUserType: (type) => set({ userType: type }),
  updateOnboarding: async (stepData) => {
    try {
      const response = await axios.post('/onboarding/update', stepData);
      set({ data: { ...response.data }, currentStep: response.data.currentStep });
    } catch (error) {
      console.error('Error updating onboarding:', error);
      throw error;
    }
  }
}));