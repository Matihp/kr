import { useOnboarding } from '@/lib/store/useOnboarding';
import { useAuth } from '@/lib/useAuth';
import { UserType } from '@/types/onboarding';
import { FreelancerProfileForm } from './FreelancerProfileForm';
import { RecruiterProfileForm } from './RecruiterProfileForm';
import { SkillsAndExperienceForm } from './SkillsAndExperiencieForm';
import { Progress } from '../ui/progress';

export const OnboardingFlow = () => {
  const { currentStep, userType, setUserType } = useOnboarding();
  const { user } = useAuth();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">¡Bienvenido a Nuestra Plataforma!</h2>
            <p>¿Te unes a nosotros como freelancer o reclutador?</p>
            <div className="space-x-4">
              <button
                onClick={() => setUserType(UserType.FREELANCER)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Soy un Freelancer
              </button>
              <button
                onClick={() => setUserType(UserType.RECRUITER)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Soy un Reclutador
              </button>
            </div>
          </div>
        );
      
      case 2:
        return userType === 'freelancer' ? (
          <FreelancerProfileForm />
        ) : (
          <RecruiterProfileForm />
        );
      
      case 3:
        return userType === 'freelancer' ? (
          <SkillsAndExperienceForm />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <Progress
          currentStep={currentStep} 
          totalSteps={userType === 'freelancer' ? 3 : 2} 
        />
      </div>
      {renderStep()}
    </div>
  );
};