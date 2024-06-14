"use client"
import { useState, ChangeEvent } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';

type LanguageLevel = "beginner" | "intermediate" | "advanced"

type Language = {
  language: string
  level: LanguageLevel
}

const languagesData = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Russian", "Arabic"]

export default function ModalLanguages() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const addLanguage = () => {
    if (languages.length < 4 && !languages.some(lang => lang.language === "")) {
      setLanguages([...languages, { language: "", level: "intermediate" }])
    }
  }

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages.splice(index, 1)
    setLanguages(updatedLanguages)
  }

  const updateLanguage = (index: number, field: keyof Language, value: LanguageLevel) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index][field] = value
    setLanguages(updatedLanguages)
  
    if (field === "language") {
      const filteredSuggestions = languagesData.filter(language =>
        language.toLowerCase().startsWith(value.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
    }
  }
  const getLanguageLevel = (value: string): LanguageLevel => {
    switch (value) {
      case "beginner":
        return "beginner"
      case "intermediate":
        return "intermediate"
      case "advanced":
        return "advanced"
      default:
        return "intermediate"
    }
  }

  const handleSuggestionClick = (suggestion: string, index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index].language = suggestion
    setLanguages(updatedLanguages)
    setSuggestions([])
  }

  const clearLanguages = () => {
    setLanguages([])
  }

    function setLang(arg0: { language: string; level: LanguageLevel }) {
        throw new Error("Function not implemented.")
    }

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
                <Input
                    id={`language-${index}`}
                    placeholder="Enter a language"
                    value={lang.language}
                    onChange={(e) => {
                        const newValue = e.target.value as LanguageLevel
                        const updatedLanguages = [...languages]
                        updatedLanguages[index].language = newValue
                        setLanguages(updatedLanguages)
                    }}
                    />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded-md">
                      {suggestions.map((suggestion, i) => (
                        <li
                          key={i}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSuggestionClick(suggestion, index)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeLanguage(index)}>
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
              <RadioGroup
                defaultValue={lang.level}
                onValueChange={(value: LanguageLevel) => updateLanguage(index, "level", value)}
                className="grid grid-cols-3 gap-2"
                >
                <Label
                  htmlFor={`level-beginner-${index}`}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <RadioGroupItem id={`level-beginner-${index}`} value="beginner" className="peer sr-only" />
                  <span className={`peer-checked:font-semibold ${lang.level === "beginner" ? "font-semibold" : ""}`}>Beginner</span>
                </Label>
                <Label
                  htmlFor={`level-intermediate-${index}`}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <RadioGroupItem id={`level-intermediate-${index}`} value="intermediate" className="peer sr-only" />
                  <span className={`peer-checked:font-semibold ${lang.level === "intermediate" ? "font-semibold" : ""}`}>Intermediate</span>
                </Label>
                <Label
                  htmlFor={`level-advanced-${index}`}
                  className="flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                >
                  <RadioGroupItem id={`level-advanced-${index}`} value="advanced" className="peer sr-only" />
                  <span className={`peer-checked:font-semibold ${lang.level === "advanced" ? "font-semibold" : ""}`}>Advanced</span>
                </Label>
              </RadioGroup>
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