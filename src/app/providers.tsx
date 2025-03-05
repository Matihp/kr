'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { useAuth } from '@/lib/useAuth';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
  
    useEffect(() => {
        if(user){
             if(isAuthenticated && !user.userType) {
                router.push('/onboarding');
            }            
        }

    }, [isAuthenticated, user, router]);
  
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    );
  }