"use client"
import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "../ui/icons"
import SkillsTagsInput from "../TagsInput/SkillsTagsInput"

const skillsData = ["Java", "JavaScript", "Python", "C++", "Ruby", "Swift", "Go", "Rust", "PHP", "TypeScript"];

interface ModalSkillsProps {
  skills: string[]
  onSkillsUpdate: (updatedSkills: string[]) => void
}

export default function ModalSkills({ skills, onSkillsUpdate }: ModalSkillsProps) {
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills)
  const [isOpen, setIsOpen] = useState(false)

  const handleSkillsChange = (newSkills: string[]) => {
    setCurrentSkills(newSkills)
  }

  const handleSave = () => {
    onSkillsUpdate(currentSkills)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setCurrentSkills(skills)
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel()
    }
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <PencilIcon onClick={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Editar Habilidades</DialogTitle>
          <DialogDescription>Modifica tus habilidades y guarda los cambios.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <SkillsTagsInput
            value={currentSkills}
            onChange={handleSkillsChange}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSave}>Guardar</Button>
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