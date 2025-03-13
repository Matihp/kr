'use client'
import { useRouter } from 'next/navigation'
import { api } from '@/api/api'
import GigForm from '@/components/GigForm/GigForm'
import { createGig } from '@/api/gigsApi'

export default function CreateGigPage() {
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    console.log('Sending request with data:', formData)
    await createGig(formData)
    router.push('/gigs')
  }

  return (
    <div className="container mx-auto py-8">
      <GigForm onSubmit={handleSubmit} />
    </div>
  )
}