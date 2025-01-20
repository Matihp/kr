"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useAuth } from "@/lib/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/login'); // o la ruta que prefieras
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

//   if (isLoading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <Loader size={40} className="animate-spin" />
//       </div>
//     );
//   }

  if (!isAuthenticated) {
    return (<div className="h-screen flex justify-center items-center">
                <Loader size={40} className="animate-spin" />
            </div>);
  }

  return <>{children}</>;
}