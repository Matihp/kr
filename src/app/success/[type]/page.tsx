'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export type SuccessType = 'registration' | 'payment' | 'order' | 'subscription';

const SUCCESS_CONFIGS = {
  registration: {
    title: '¡Registro Exitoso!',
    message: 'Tu cuenta ha sido creada correctamente. Ya puedes acceder a todas las funcionalidades de nuestra plataforma.',
    ctaText: 'Iniciar sesión',
    ctaLink: '/login',
    secondaryText: 'Volver al inicio',
    secondaryLink: '/',
    icon: CheckCircle,
    colorClass: 'text-green-500'
  },
  payment: {
    title: '¡Pago Realizado!',
    message: 'Tu pago ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.',
    ctaText: 'Ver mi pedido',
    ctaLink: '/orders',
    secondaryText: 'Seguir comprando',
    secondaryLink: '/products',
    icon: CheckCheck,
    colorClass: 'text-emerald-500'
  },
  order: {
    title: '¡Pedido Confirmado!',
    message: 'Tu pedido ha sido confirmado y está siendo procesado. Te notificaremos cuando sea enviado.',
    ctaText: 'Ver detalles del pedido',
    ctaLink: '/orders',
    secondaryText: 'Seguir comprando',
    secondaryLink: '/products',
    icon: CheckCheck,
    colorClass: 'text-green-500'
  },
  subscription: {
    title: '¡Suscripción Activada!',
    message: 'Tu suscripción ha sido activada correctamente. Disfruta de todos los beneficios premium.',
    ctaText: 'Explorar beneficios',
    ctaLink: '/benefits',
    secondaryText: 'Ir al panel',
    secondaryLink: '/dashboard',
    icon: CheckCircle,
    colorClass: 'text-indigo-500'
  }
};

export default function SuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  // Obtener el tipo de la URL o usar 'generic' como fallback
  const type = (params.type as SuccessType);
  
  // Verificar si el tipo es válido
  const isValidType = Object.keys(SUCCESS_CONFIGS).includes(type);
  const successType = isValidType ? type : 'subscription';
  
  // Obtener configuración según el tipo
  const config = SUCCESS_CONFIGS[successType];
  
  // Permitir sobrescribir algunos parámetros mediante query params
  const title = searchParams.get('title') || config.title;
  const message = searchParams.get('message') || config.message;
  const ctaLink = searchParams.get('ctaLink') || config.ctaLink;
  
  // Componente de icono según el tipo
  const SuccessIcon = config.icon;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 animate-circle-in">
      <div className="container max-w-md mx-auto">
        <Card className="glass p-8 flex flex-col items-center text-center">
          <div className={`animate-bounce-in ${config.colorClass} mb-6`}>
            <div className="rounded-full bg-white p-2 shadow-lg animate-pulsate">
              <SuccessIcon className="h-16 w-16" />
            </div>
          </div>      
          <h1 className="text-3xl font-medium tracking-tight animate-fade-in-up-delay-1 mb-3">
            {title}
          </h1>         
          <p className="text-muted-foreground animate-fade-in-up-delay-2 mb-8">
            {message}
          </p>         
          <div className="flex flex-col w-full gap-3 animate-fade-in-up-delay-3">
            <Button asChild className="w-full group" size="lg">
              <Link href={ctaLink}>
                {config.ctaText}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            {config.secondaryText && config.secondaryLink && (
              <Button asChild variant="outline" className="w-full" size="lg">
                <Link href={config.secondaryLink}>
                  {config.secondaryText}
                </Link>
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}