import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

const useProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyAuthentication = async () => {
      try {
        await checkAuth();
        if (isMounted && !isAuthenticated) {
          router.push('/login');
          console.log('no autenticado');
        } else {
          console.log('autenticado');
        }
      } catch (error) {
        console.error('Error verifying authentication:', error);
        if (isMounted) {
          router.push('/login');
        }
      } finally {
        if (isMounted) {
          setVerified(true);
        }
      }
    };

    if (!verified) {
      verifyAuthentication();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, checkAuth, router, verified]);

  return isAuthenticated;
};

export default useProtectedRoute;


