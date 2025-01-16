"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Paginations } from "../Pagination/Pagination"
import { SVGProps } from "react";
import { Skill, UserData } from "@/types/user";

interface ProfilesListProps {
  user: UserData;
  skills: Skill[];
  selectedSkills: string[];
  handleSkillChange: (skill: string) => void;
  handleReset: () => void;
  onPageChange: (page: number) => void
}

export default function ProfilesList({ user, skills, selectedSkills, handleSkillChange, handleReset , onPageChange }: ProfilesListProps) {
  return (
    <div className="container mx-auto py-8 md:pt-24">
      <header className="bg-gray-100 dark:bg-gray-800 p-4 mb-6">
        <div className="flex sm:items-center justify-start gap-11 mxsm:flex-col mxsm:gap-5">
          <h1 className="text-2xl font-bold">Perfiles Freelance</h1>
          <div className="md:w-[40vw]">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar palabra clave..."
                className="bg-white dark:bg-gray-950 pl-8 py-2 md:pr-4 rounded-md w-full"
              />
              <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <h2 className="text-lg font-bold mb-4">Filtros</h2>
          <div className="mb-4">
            <details
              open
              className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
              >
                <span className="text-sm font-medium"> Tecnologías </span>
                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> {selectedSkills.length} Seleccionados </span>
                  <button type="button" className="text-sm text-gray-900 underline underline-offset-4" onClick={handleReset}>
                    Reset
                  </button>
                </header>
                <ul className="space-y-1 border-t border-gray-200 p-4">
                  {skills.map((skill) => (
                    <li key={skill.id}>
                      <label htmlFor={`Filter${skill.id}`} className="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`Filter${skill.id}`}
                          className="size-5 rounded border-gray-300"
                          checked={selectedSkills.includes(skill.name)}
                          onChange={() => handleSkillChange(skill.name)}
                        />
                        <span className="text-sm font-medium text-gray-700"> {skill.name} </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user?.users?.map((user) => (
              <div key={user.id} className="bg-white dark:bg-gray-950 rounded-md overflow-hidden shadow-sm">
                <img
                  src={user.avatarSrc}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{user.firstName} {user.lastName}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{user.description}</p>
                  <div className="">
                    <Button className="" variant="outline">Mas info</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Paginations
          currentPage={user.page}
          totalPages={user.pages}
          onPageChange={(page) => {
            onPageChange(page);
          }}
        />
        </div>
      </div>
    </div>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
