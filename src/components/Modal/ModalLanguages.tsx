"use client"
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,SelectLabel } from "../ui/select";
import { PencilIcon } from "../ui/icons";

type LanguageLevel = "beginner" | "intermediate" | "advanced" | string

type Language = {
  language: string
  level: LanguageLevel
}

const languagesData = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Russian", "Arabic"]

export default function ModalLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])

  const addLanguage = () => {
    if (languages.length < 4) {
      setLanguages([...languages, { language: "", level: "" }])
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
        <PencilIcon/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Idioma</DialogTitle>
          <DialogDescription>Selecciona tu idioma y elige tu nivel de competencia.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {languages.map((lang, index) => (
            <div key={index} className="grid gap-2">
              <div className="flex items-center justify-between ">
                <div className="relative">
                  <Select
                    value={lang.language}
                    onValueChange={(value: string) => updateLanguage(index, "language", value)}
                  >
                    <SelectTrigger className="w-[190px]">
                      {lang.language || "Seleccionar idioma"}
                    </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                        {availableLanguages.map((language, i) => (
                          <SelectItem key={i} value={language}>{language}</SelectItem>
                        ))}
                        </SelectGroup>
                      </SelectContent>                
                  </Select>
                </div>
                
                <Select value={lang.level} onValueChange={(value: LanguageLevel) => updateLanguage(index, "level", value)}>
                  <SelectTrigger className="w-[140px]">
                    {lang.level || "Elegir nivel"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectGroup>     
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => removeLanguage(index)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button  onClick={addLanguage} className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Language
          </Button>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={clearLanguages}>Clear</Button>
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