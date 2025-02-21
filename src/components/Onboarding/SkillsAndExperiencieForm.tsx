import { useState } from 'react';
import { useOnboarding } from '@/lib/store/useOnboarding';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';

export const SkillsAndExperienceForm = () => {
  const { setStep, updateOnboarding , userType } = useOnboarding();
  const router = useRouter();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState({
    yearsOfExperience: '',
    education: '',
    certifications: '',
    portfolioUrl: ''
  });

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStep = 3;
    updateOnboarding({ step: currentStep, ...experience, skills , userType } ,router);
    setStep(currentStep);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Skills & Experience</h2>
        <p className="text-gray-500">Tell us about your expertise and background</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="skills" className="block text-sm font-medium">
            Skills (Press Enter to add)
          </label>
          <Input
            id="skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Type a skill and press Enter"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium">
            Years of Experience
          </label>
          <Input
            id="yearsOfExperience"
            name="yearsOfExperience"
            type="number"
            min="0"
            value={experience.yearsOfExperience}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="education" className="block text-sm font-medium">
            Education
          </label>
          <Input
            id="education"
            name="education"
            placeholder="e.g. Bachelor's in Computer Science"
            value={experience.education}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="certifications" className="block text-sm font-medium">
            Certifications
          </label>
          <Input
            id="certifications"
            name="certifications"
            placeholder="e.g. AWS Certified Developer"
            value={experience.certifications}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="portfolioUrl" className="block text-sm font-medium">
            Portfolio URL
          </label>
          <Input
            id="portfolioUrl"
            name="portfolioUrl"
            type="url"
            placeholder="https://"
            value={experience.portfolioUrl}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">
          Complete Profile
        </Button>
      </div>
    </form>
  );
};
