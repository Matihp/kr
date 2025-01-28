"use client"
import { useState, useEffect } from "react"
import { ProjectCard } from "../../components/Projects/ProjectCard"
import { TagFilter } from "../../components/Projects/TagFilter"
import { Button } from "@/components/ui/button"
import { PaginatedResponse, Project } from "@/types/projects"
import { Skill } from "@/types/user"

export default function Projects() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [projects, setProjects] = useState<Project[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Cargar todas las skills disponibles
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${apiUrl}/skills`);
        const skills = await response.json();
        setAllSkills(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const fetchProjects = async (pageNum: number, skillIds: string[]) => {
    try {
      setLoading(true);
      const skillsQuery = skillIds.length > 0 ? `&skillIds=${skillIds.join(',')}` : '';
      const response = await fetch(`${apiUrl}/projects?page=${pageNum}&pageSize=9${skillsQuery}`);
      const data: PaginatedResponse = await response.json();
      
      if (pageNum === 1) {
        setProjects(data.items);
      } else {
        setProjects(prev => [...prev, ...data.items]);
      }
      
      setHasMore(pageNum < data.totalPages);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchProjects(1, selectedSkillIds);
  }, [selectedSkillIds]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProjects(nextPage, selectedSkillIds);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Proyectos Destacados de Freelancers
        </h1>

        <TagFilter
          allSkills={allSkills}
          selectedSkillIds={selectedSkillIds}
          onSkillChange={setSelectedSkillIds}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              image={project.images[0]}
              description={project.description}
              likes={project.likes}
              freelancer={`${project.user.firstName} ${project.user.lastName}`}
              tags={project.skills.map(skill => skill.name)}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-6 py-2"
            >
              {loading ? "Cargando..." : "Cargar más"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}