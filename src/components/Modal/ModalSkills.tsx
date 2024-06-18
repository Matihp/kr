"use client"
import { useState, ChangeEvent, KeyboardEvent } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilIcon } from "../ui/icons"

const skillsData = ["Java", "JavaScript", "Python", "C++", "Ruby", "Swift", "Go", "Rust", "PHP", "TypeScript"];

export default function ModalSkills() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState<string>("")
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
      setSuggestions([]);
    }
  }

  const removeSkill = (index: number) => {
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    setSkills(updatedSkills)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setNewSkill(userInput);
    const filteredSuggestions = skillsData.filter(skill =>
      skill.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addSkill()
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewSkill(suggestion);
    setSuggestions([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PencilIcon/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Skills</DialogTitle>
          <DialogDescription>Enter your skills and they will be added to the list.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-[1fr_auto] gap-4">
            <div>
              <Input
                value={newSkill}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter a new skill"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button onClick={addSkill}>Add</Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md bg-gray-100 px-4 py-2 dark:bg-gray-800"
              >
                <span>{skill}</span>
                <Button size="icon" variant="ghost" onClick={() => removeSkill(index)}>
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Remove skill</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setSkills([])}>
            Clear
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}