// src/pages/protected.tsx
import { useEffect, useState } from 'react';
import { getProtectedData } from '@/lib/api';
import { useRouter } from 'next/router';
import { ProtectedDataResponse } from '@/types/api';

const ProtectedPage = () => {
  const [data, setData] = useState<ProtectedDataResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProtectedData();
        setData(response);
      } catch (error) {
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{data.message}</p>
      <p>User ID: {data.userId}</p>
    </div>
  );
};

export default ProtectedPage;

