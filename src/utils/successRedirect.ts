import { type SuccessType } from '@/app/success/[type]/page';
import { redirect } from 'next/navigation';

// Función para construir la URL de redirección a la página de éxito

export function buildSuccessUrl(
  type: SuccessType,
  options?: {
    title?: string;
    message?: string;
    ctaLink?: string;
  }
) {
  let url = `/success/${type}`;
  
  //parámetros opcionales como query params
  if (options) {
    const params = new URLSearchParams();
    
    if (options.title) params.append('title', options.title);
    if (options.message) params.append('message', options.message);
    if (options.ctaLink) params.append('ctaLink', options.ctaLink);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
}

export function redirectToRegistrationSuccess(username?: string) {
  let message = undefined;
  
  if (username) {
    message = `¡Bienvenido, ${username}! Tu cuenta ha sido creada correctamente. Ya puedes acceder a todas las funcionalidades de nuestra plataforma.`;
  }
  
  const url = buildSuccessUrl('registration', { message });
  redirect(url);
}

export function redirectToPaymentSuccess(orderId?: string) {
  let message = undefined;
  let ctaLink = undefined;
  
  if (orderId) {
    message = `Tu pago ha sido procesado correctamente. Tu número de pedido es #${orderId}. Recibirás un correo electrónico con los detalles de tu compra.`;
    ctaLink = `/orders/${orderId}`;
  }
  
  const url = buildSuccessUrl('payment', { message, ctaLink });
  redirect(url);
}