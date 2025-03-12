'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { fetchParticipatingGigs } from '@/api/gigsApi'
import { Gig } from '@/types/gig'

export default function ParticipatingGigsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [gigs, setGigs] = useState<Gig[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && user.userType !== 'freelancer') {
      router.push('/gigs')
      return
    }
    const fetchGigsData = async () => {
      try {
        const data = await fetchParticipatingGigs();
        setGigs(data);
      } catch (err) {
        setError('Failed to load your participating gigs');
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

  // Separate gigs by proposal status
  const acceptedGigs = gigs.filter(gig => gig.myProposal?.status === 'ACCEPTED')
  const pendingGigs = gigs.filter(gig => gig.myProposal?.status === 'PENDING')
  const rejectedGigs = gigs.filter(gig => gig.myProposal?.status === 'REJECTED')

  return (
    <div className="container mx-auto mt-28 pb-20 px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mis participaciones</h1>
        <Link href="/gigs">
          <Button variant="outline">Explorar trabajos</Button>
        </Link>
      </div>
      {gigs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-medium text-gray-600 mb-4">No estás participando en ningún trabajo</h2>
          <p className="text-gray-500 mb-6">Explora los trabajos disponibles y postúlate para comenzar</p>
          <Link href="/gigs">
            <Button size="lg">Ver trabajos disponibles</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Accepted Gigs Section */}
          {acceptedGigs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Trabajos Activos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {acceptedGigs.map((gig) => (
                  <Card key={gig.id} className="h-full flex flex-col border-green-200 shadow-md">
                    <CardHeader className="bg-green-50 border-b border-green-100">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{gig.title}</CardTitle>
                        <Badge className="bg-green-100 text-green-800">Aceptado</Badge>
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
                          <span>Tu propuesta:</span>
                          <span className="font-medium">${gig.myProposal?.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-4 border-t">
                      <Link href={`/gigs/${gig.id}`}>
                        <Button variant="outline" size="sm">Ver detalles</Button>
                      </Link>
                      <Link href={`/proposals/${gig.myProposal?.id}`}>
                        <Button size="sm">Ver propuesta</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Pending Gigs Section */}
          {pendingGigs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Postulaciones Pendientes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingGigs.map((gig) => (
                  <Card key={gig.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{gig.title}</CardTitle>
                        <Badge variant="outline">Pendiente</Badge>
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
                          <span>Tu propuesta:</span>
                          <span className="font-medium">${gig.myProposal?.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-4 border-t">
                      <Link href={`/gigs/${gig.id}`}>
                        <Button variant="outline" size="sm">Ver detalles</Button>
                      </Link>
                      <Link href={`/proposals/${gig.myProposal?.id}`}>
                        <Button size="sm">Ver propuesta</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Rejected Gigs Section */}
          {rejectedGigs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Postulaciones Rechazadas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedGigs.map((gig) => (
                  <Card key={gig.id} className="h-full flex flex-col opacity-80">
                    <CardHeader className="bg-gray-50">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{gig.title}</CardTitle>
                        <Badge variant="outline" className="text-red-500 border-red-200">Rechazada</Badge>
                      </div>
                      <CardDescription>
                        Creado: {new Date(gig.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Presupuesto:</span>
                          <span className="font-medium">${gig.budgetMin} - ${gig.budgetMax}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Tu propuesta:</span>
                          <span className="font-medium">${gig.myProposal?.price}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between pt-4 border-t">
                      <Link href={`/gigs/${gig.id}`}>
                        <Button variant="outline" size="sm">Ver detalles</Button>
                      </Link>
                      <Link href={`/proposals/${gig.myProposal?.id}`}>
                        <Button variant="outline" size="sm">Ver propuesta</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}