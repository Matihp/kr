"use client"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { Input } from "../ui/input";

import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

type Option = {
  value: string;
  label: string;
};

type LanguageLevel = "beginner" | "intermediate" | "advanced"

type Language = {
  language: string
  level: LanguageLevel
}

const languagesData = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Russian", "Arabic"]

export default function ModalLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])

  const addLanguage = () => {
    if (languages.length < 4) {
      setLanguages([...languages, { language: "", level: "intermediate" }])
    }
  }

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages.splice(index, 1)
    setLanguages(updatedLanguages)
  }

  const updateLanguage = (index: number, field: keyof Language, value: LanguageLevel | string) => {
    const updatedLanguages = [...languages];

    if (field === "language") {
      updatedLanguages[index].language = value as string;
    } else if (field === "level") {
      updatedLanguages[index].level = value as LanguageLevel;
    }

    setLanguages(updatedLanguages);
  };

  const availableLanguages = languagesData.filter(lang => !languages.some(l => l.language === lang));

  const clearLanguages = () => {
    setLanguages([]);
  };

  return (
    <Dialog defaultOpen={false}>
      <DialogTrigger asChild>
        <Icon className="cursor-pointer h-6" path={mdiPencilCircle} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Language</DialogTitle>
          <DialogDescription>Enter a language and select your proficiency level.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {languages.map((lang, index) => (
            <div key={index} className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Select
                    value={lang.language}
                    onValueChange={(value: string) => updateLanguage(index, "language", value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <Button variant="outline">{lang.language || "Select a language"}</Button>
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map((language, i) => (
                        <SelectItem key={i} value={language}>{language}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Select value={lang.level} onValueChange={(value: LanguageLevel) => updateLanguage(index, "level", value)}>
                  <SelectTrigger className="w-[120px]">
                    <Button variant="outline">{lang.level}</Button>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => removeLanguage(index)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="ghost" onClick={addLanguage} className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Language
          </Button>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={clearLanguages}>Clear</Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
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