import { useState } from 'react'
import { useOnboarding } from '@/lib/store/useOnboarding'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export const FreelancerProfileForm = () => {
  const { setStep ,currentStep } = useOnboarding()
  const [formData, setFormData] = useState({
    fullName: '',
    title: '',
    hourlyRate: '',
    bio: '',
    location: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí irías la lógica para guardar los datos
    setStep(3)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Complete Your Freelancer Profile</h2>
        <p className="text-gray-500">Tell us more about yourself and your work</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Professional Title
          </label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Senior Web Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium">
            Hourly Rate (USD)
          </label>
          <Input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            min="0"
            value={formData.hourlyRate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium">
            Professional Bio
          </label>
          <Textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">
          Continue to Skills
        </Button>
      </div>
    </form>
  )
}