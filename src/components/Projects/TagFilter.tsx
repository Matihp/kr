"use client"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

interface Skill {
  id: string;
  name: string;
}

interface TagFilterProps {
  allSkills: Skill[]
  selectedSkillIds: string[]
  onSkillChange: (skillIds: string[]) => void
}

export function TagFilter({ allSkills, selectedSkillIds, onSkillChange }: TagFilterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<Skill[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([])
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      const filteredSuggestions = allSkills.filter(
        (skill) => 
          skill.name.toLowerCase().includes(value.toLowerCase()) && 
          !selectedSkillIds.includes(skill.id)
      )
      setSuggestions(filteredSuggestions.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }

  const addSkill = (skill: Skill) => {
    if (!selectedSkillIds.includes(skill.id)) {
      onSkillChange([...selectedSkillIds, skill.id])
    }
    setSearchTerm("")
    setSuggestions([])
  }

  const removeSkill = (skillId: string) => {
    onSkillChange(selectedSkillIds.filter((id) => id !== skillId))
  }

  const getSkillName = (skillId: string) => {
    return allSkills.find(skill => skill.id === skillId)?.name || skillId
  }

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative" ref={searchRef}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar habilidades..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto">
            {suggestions.map((skill) => (
              <li 
                key={skill.id} 
                onClick={() => addSkill(skill)} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {skill.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedSkillIds.map((skillId) => (
          <span 
            key={skillId} 
            className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full flex items-center"
          >
            {getSkillName(skillId)}
            <button onClick={() => removeSkill(skillId)} className="ml-1 focus:outline-none">
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}