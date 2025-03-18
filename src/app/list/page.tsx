"use client"
import { useEffect, useState } from 'react';
import ProfilesList from '@/components/ProfilesList/ProfilesList';
import { Skill, UserData } from '@/types/user';
import { debounce } from 'lodash';
import { fetchFreelancers, fetchSkills } from '@/api/usersApi';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUsers = async (page: number) => {
    try {
      setIsLoading(true);
      const data = await fetchFreelancers(page, selectedSkills);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const debouncedLoadUsers = debounce(loadUsers, 300);
  
  const loadSkills = async () => {
    try {
      const data = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    loadUsers(1); 
    loadSkills();
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
    loadUsers(page);
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
