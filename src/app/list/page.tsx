"use client"
import ProfilesList from '@/components/ProfilesList/ProfilesList'
import { useEffect, useState } from 'react';


function list() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/`);
        const data = await response.json();
        setUsers(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <ProfilesList user={users}/>
  )
}

export default list