import { AppDataSource } from '../config/data-source';
import { Onboarding, UserType } from '../models/onboardingModel';
import { User } from '../models/userModel';
import { NotFoundError } from '../utils/errorUtils';

const onboardingRepository = AppDataSource.getRepository(Onboarding);
const userRepository = AppDataSource.getRepository(User);

export class OnboardingService {
  async initializeOnboarding(userId: string): Promise<Onboarding> {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const onboarding = onboardingRepository.create({
      user,
      currentStep: 1,
      isCompleted: false
    });

    return onboardingRepository.save(onboarding);
  }

  async updateOnboardingStep(
    userId: string,
    step: number,
    data: Partial<Onboarding>
  ): Promise<Onboarding> {
    const onboarding = await onboardingRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user']
    });

    if (!onboarding) {
      throw new NotFoundError('Onboarding not found');
    }

    Object.assign(onboarding, data);
    onboarding.currentStep = step;

    if (step === this.getMaxSteps(onboarding.userType)) {
      onboarding.isCompleted = true;
    }

    return onboardingRepository.save(onboarding);
  }

  private getMaxSteps(userType?: UserType): number {
    return userType === UserType.FREELANCER ? 3 : 2;
  }

  async getOnboardingStatus(userId: string) {
    const onboarding = await onboardingRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user']
    });
  
    if (!onboarding) {
      // Si no existe, crear uno nuevo
      return this.initializeOnboarding(userId);
    }
  
    return onboarding;
  }
}