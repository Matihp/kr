'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Gig {
  _id: string
  title: string
  description: string
  budget: number
  status: string
  createdBy: string
}

export default function GigDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [gig, setGig] = useState<Gig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [proposalData, setProposalData] = useState({
    coverLetter: '',
    bidAmount: '',
  })

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const response = await fetch(`http://localhost:4000/gigs/${params.id}`)
        if (!response.ok) throw new Error('Error fetching gig')
        const data = await response.json()
        setGig(data)
      } catch (err) {
        setError('Failed to load gig')
      } finally {
        setLoading(false)
      }
    }

    fetchGig()
  }, [params.id])

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gigId: params.id,
          coverLetter: proposalData.coverLetter,
          bidAmount: Number(proposalData.bidAmount)
        }),
      })

      if (!response.ok) throw new Error('Error submitting proposal')
      router.push('/proposals')
    } catch (err) {
      setError('Failed to submit proposal')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!gig) return <div>Gig not found</div>

  return (
    <div className="px-6 py-24 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{gig.title}</h1>
      <div className="mb-8">
        <p className="text-gray-600 mb-4">{gig.description}</p>
        <p className="text-green-600 font-bold">Budget: ${gig.budget}</p>
        <p className="text-gray-500">Status: {gig.status}</p>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Submit Proposal</h2>
        <form onSubmit={handleSubmitProposal} className="space-y-4">
          <div>
            <label className="block mb-2">Cover Letter</label>
            <textarea
              value={proposalData.coverLetter}
              onChange={(e) => setProposalData(prev => ({...prev, coverLetter: e.target.value}))}
              className="w-full border p-2 rounded"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Bid Amount</label>
            <input
              type="number"
              value={proposalData.bidAmount}
              onChange={(e) => setProposalData(prev => ({...prev, bidAmount: e.target.value}))}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  )
}