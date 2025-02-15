import { AppDataSource } from '../config/data-source';
import { User } from '../models/userModel';
import { Onboarding, UserType } from '../models/onboardingModel';

export const seedOnboarding = async () => {
    const userRepository = AppDataSource.getRepository(User);
    const onboardingRepository = AppDataSource.getRepository(Onboarding);

    const users = await userRepository.find();

    for (const user of users) {
        const existingOnboarding = await onboardingRepository.findOne({
            where: { user: { id: user.id } }
        });

        if (!existingOnboarding) {
            const onboarding = onboardingRepository.create({
                user,
                isCompleted: true,
                currentStep: 3,
                userType: UserType.FREELANCER,
                // Puedes añadir más campos según necesites
                professionalSummary: "Existing user - automatically completed onboarding",
                yearsOfExperience: 1,
                preferredWorkTypes: ["remote"]
            });

            await onboardingRepository.save(onboarding);
        }
    }
};

// Para ejecutarlo:
if (require.main === module) {
    AppDataSource.initialize().then(async () => {
        await seedOnboarding();
        console.log("Onboarding seeding completed");
        process.exit(0);
    }).catch(error => {
        console.log(error);
        process.exit(1);
    });
}