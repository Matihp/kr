import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/lib/store/useOnboarding';

const useProtectedRoute = () => {
  const { isAuthenticated, checkAuth } = useAuth();
  const { isCompleted} = useOnboarding();
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
        } else if( isMounted && !isCompleted) {
          router.push('/onboarding');
          console.log('no completado');
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


