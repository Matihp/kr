"use client"
import { useEffect, useState } from 'react';
import ProfilesList from '@/components/ProfilesList/ProfilesList';
import { Skill, UserData } from '@/types/user';
import { debounce } from 'lodash';

function List() {
  const [users, setUsers] = useState<UserData>({
    users: [],
    total: 0,
    page: 1,
    limit: 18,
    pages: 1
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchUsers = async (page: number) => {
    try {
      const skillsParam = selectedSkills.length > 0 ? selectedSkills.join(',') : '';
      const response = await fetch(`${apiUrl}/users?skillName=${skillsParam}&page=${page}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const debouncedFetchUsers = debounce(fetchUsers, 300);
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${apiUrl}/skills/`);
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUsers(1); 
    fetchSkills();
  }, [selectedSkills]);

  const handleSkillChange = (skill: string): void => {
    setSelectedSkills((prevSkills) => {
      const updatedSkills = prevSkills.includes(skill)
        ? prevSkills.filter((item) => item !== skill)
        : [...prevSkills, skill];
      
      return updatedSkills;
    });
  };

  const handleReset = (): void => {
    setSelectedSkills([]);
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  return (
    <ProfilesList
      user={users}
      skills={skills}
      selectedSkills={selectedSkills}
      handleSkillChange={handleSkillChange}
      handleReset={handleReset}
      onPageChange={handlePageChange}
    />
  );
}

export default List;
