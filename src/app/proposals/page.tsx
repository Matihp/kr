'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Proposal {
  _id: string
  gigId: string
  coverLetter: string
  bidAmount: number
  status: string
  createdBy: string
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch('http://localhost:4000/proposals')
        if (!response.ok) throw new Error('Error fetching proposals')
        const data = await response.json()
        setProposals(data)
      } catch (err) {
        setError('Failed to load proposals')
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Proposals</h1>
      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <div key={proposal._id} className="border p-4 rounded">
            <p className="text-gray-600">{proposal.coverLetter}</p>
            <p className="text-green-600 font-bold">Bid Amount: ${proposal.bidAmount}</p>
            <p className="text-gray-500">Status: {proposal.status}</p>
            <Link 
              href={`/proposals/${proposal._id}`}
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}