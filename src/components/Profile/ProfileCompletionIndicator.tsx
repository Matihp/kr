import { Progress } from "@/components/ui/progress";

interface ProfileCompletionProps {
  profileCompletion: {
    basicInfo: boolean;
    description: boolean;
    avatar: boolean;
    skills: boolean;
    languages: boolean;
    projects: boolean;
    certifications: boolean;
  };
}

export function ProfileCompletionIndicator({ profileCompletion }: ProfileCompletionProps) {
  // Calcular el porcentaje de completado
  const totalSections = Object.keys(profileCompletion).length;
  const completedSections = Object.values(profileCompletion).filter(Boolean).length;
  const completionPercentage = Math.round((completedSections / totalSections) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-neutral-700">
          Perfil completado
        </span>
        <span className="text-sm font-medium text-neutral-700">
          {completionPercentage}%
        </span>
      </div>
      <Progress
        value={completionPercentage}
        className="h-2"
        currentStep={completedSections}
        totalSteps={totalSections}
      />

      <div className="pt-2 text-xs text-neutral-500">
        {completedSections === totalSections ? (
          <p>¡Perfil completo! Gracias por proporcionar toda la información.</p>
        ) : (
          <p>Completa tu perfil para aumentar tu nivel y desbloquear más funciones.</p>
        )}
      </div>
    </div>
  );
}
