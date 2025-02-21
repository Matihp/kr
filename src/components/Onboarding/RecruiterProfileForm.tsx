import { useState } from 'react'
import { useOnboarding } from '@/lib/store/useOnboarding'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation';

export const RecruiterProfileForm = () => {
  const { setStep , updateOnboarding ,userType } = useOnboarding()
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    companySize: '',
    industry: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentStep = 2;
    updateOnboarding({ step: currentStep, ...formData , userType },router);
    setStep(2)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Complete Your Company Profile</h2>
        <p className="text-gray-500">Tell us about your company and recruitment needs</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium">
            Company Name
          </label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium">
            Your Position
          </label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="companySize" className="block text-sm font-medium">
            Company Size
          </label>
          <Input
            id="companySize"
            name="companySize"
            placeholder="e.g. 50-100 employees"
            value={formData.companySize}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium">
            Industry
          </label>
          <Input
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Company Description
          </label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">
          Complete Profile
        </Button>
      </div>
    </form>
  )
}