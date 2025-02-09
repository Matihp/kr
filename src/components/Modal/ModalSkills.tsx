"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PencilIcon } from "../ui/icons"
import SkillsTagsInput from "../TagsInput/SkillsTagsInput"

interface ModalSkillsProps {
  skills: string[]
  onSkillsUpdate: (updatedSkills: string[]) => void
}

export default function ModalSkills({ skills, onSkillsUpdate }: ModalSkillsProps) {
  const [currentSkills, setCurrentSkills] = useState<string[]>(skills)
  const [isOpen, setIsOpen] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCurrentSkills(skills)
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }, [isOpen, skills])

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
          <DialogTitle>Habilidades</DialogTitle>
          <DialogDescription>Ingresa tus habilidades y guarda los cambios.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        {isReady && (
            <SkillsTagsInput
              value={currentSkills}
              onChange={handleSkillsChange}
            />
          )}
        </div>
        <DialogFooter className='mxsm:grid mxsm:grid-cols-2 mxsm:gap-4'>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}