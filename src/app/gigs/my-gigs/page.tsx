'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { fetchMyGigs } from '@/api/gigsApi'
import { Gig } from '@/types/gig'

export default function MyGigsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && user.userType !== 'recruiter') {
      router.push('/gigs')
      return
    }
    const fetchGigsData = async () => {
        try {
          const data = await fetchMyGigs();
          setGigs(data);
        } catch (err) {
          setError('Failed to load your gigs');
        } finally {
          setLoading(false);
        }
      };
    if (user) {
      fetchGigsData()
    }
  }, [user, router])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis trabajos</h1>
        <Link href="/gigs/create">
          <Button>Crear nuevo trabajo</Button>
        </Link>
      </div>
      {gigs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">You haven't created any gigs yet</h2>
          <p className="text-gray-500 mb-6">Start by creating your first gig to find talented freelancers</p>
          <Link href="/gigs/create">
            <Button size="lg">Crear tu primer trabajo</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <Card key={gig.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{gig.title}</CardTitle>
                  <Badge variant={gig.status === 'active' ? 'default' : 'outline'}>
                    {gig.status}
                  </Badge>
                </div>
                <CardDescription>
                  Creado: {new Date(gig.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>             
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  {gig.currentStage && (
                    <div className="flex justify-between text-sm">
                      <span>Etapa actual:</span>
                      <span className="font-medium">{gig.currentStage.name}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Presupuesto:</span>
                    <span className="font-medium">${gig.budgetMin} - ${gig.budgetMax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Propuestas:</span>
                    <span className="font-medium">{gig.proposalsCount || 0}</span>
                  </div>
                </div>
              </CardContent>             
              <CardFooter className="flex justify-between pt-4 border-t">
                <Link href={`/gigs/${gig.id}`}>
                  <Button variant="outline" size="sm">Ver detalles</Button>
                </Link>
                <div className="flex gap-2">
                  <Link href={`/gigs/${gig.id}/proposals`}>
                    <Button size="sm" variant="secondary">Propuestas</Button>
                  </Link>
                  <Link href={`/gigs/${gig.id}/edit`}>
                    <Button size="sm">Editar</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}