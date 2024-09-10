"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";
import { PencilIcon } from "../ui/icons";
import { Alert, AlertDescription } from "../ui/alert";

type LanguageLevel = "Principiante" | "Intermedio" | "Avanzado" | string;

type Language = {
  language: string;
  level: LanguageLevel;
};

const languagesData = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Japanese",
  "Chinese",
];

type ModalLanguagesProps = {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
};

export default function ModalLanguages({
  languages,
  setLanguages,
}: ModalLanguagesProps) {
  const [localLanguages, setLocalLanguages] = useState<Language[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    setLocalLanguages(languages);
  }, [languages]);

  const addLanguage = () => {
    if (localLanguages.length < 4) {
      setLocalLanguages([...localLanguages, { language: "", level: "" }]);
    }
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = [...localLanguages];
    updatedLanguages.splice(index, 1);
    setLocalLanguages(updatedLanguages);
  };

  const updateLanguage = (
    index: number,
    field: keyof Language,
    value: LanguageLevel | string
  ) => {
    const updatedLanguages = [...localLanguages];

    if (field === "language") {
      updatedLanguages[index].language = value as string;
    } else if (field === "level") {
      updatedLanguages[index].level = value as LanguageLevel;
    }

    setLocalLanguages(updatedLanguages);
    setError(null); 
  };

  const availableLanguages = languagesData.filter(
    (lang) => !localLanguages.some((l) => l.language === lang)
  );

  const clearLanguages = () => {
    setLocalLanguages([]);
    setError(null);
  };

  const validateLanguages = (): boolean => {
    if (localLanguages.length === 0) {
      setError("Por favor, agregue al menos un idioma.");
      return false;
    }

    for (const lang of localLanguages) {
      if (!lang.language || !lang.level) {
        setError("Por favor, complete todos los campos de idioma y nivel.");
        return false;
      }
    }

    return true;
  };

  const saveLanguages = () => {
    if (validateLanguages()) {
      setLanguages(localLanguages);
      setIsEditModalOpen(false);
      setError(null);
    }
  };

  const openModal = () => {
    setIsEditModalOpen(true);
    setError(null);
  };

  const cancelChanges = () => {
    setLocalLanguages(languages);
    setIsEditModalOpen(false);
    setError(null);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <PencilIcon onClick={openModal} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Idiomas</DialogTitle>
          <DialogDescription>
            Selecciona tu idioma y elige tu nivel de competencia.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {localLanguages.map((lang, index) => (
            <div key={index} className="grid gap-2">
              <div className="flex items-center justify-between ">
                <div className="relative">
                  <Select
                    value={lang.language}
                    onValueChange={(value: string) =>
                      updateLanguage(index, "language", value)
                    }
                    onOpenChange={setIsSelectOpen}
                  >
                    <SelectTrigger className="w-[165px] sm:w-[190px]">
                      {lang.language || "Seleccionar idioma"}
                    </SelectTrigger>
                    <SelectContent side="top">
                      <SelectGroup>
                        {availableLanguages.map((language, i) => (
                          <SelectItem key={i} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Select
                  value={lang.level}
                  onValueChange={(value: LanguageLevel) =>
                    updateLanguage(index, "level", value)
                  }
                  onOpenChange={setIsSelectOpen}
                >
                  <SelectTrigger className="w-[140px]">
                    {lang.level || "Elegir nivel"}
                  </SelectTrigger>
                  <SelectContent side="top">
                    <SelectGroup>
                      <SelectItem value="Principiante">Principiante</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            onClick={addLanguage}
            className="flex items-center gap-2"
            style={{ pointerEvents: isSelectOpen ? "none" : "auto" }}
          >
            <PlusIcon className="h-4 w-4" />
            Agregar Idioma
          </Button>
        </div>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter className='mxsm:grid mxsm:grid-cols-2 mxsm:gap-4'>
          <Button
            variant="outline"
            onClick={cancelChanges}
            style={{ pointerEvents: isSelectOpen ? "none" : "auto" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={saveLanguages}
            style={{ pointerEvents: isSelectOpen ? "none" : "auto" }}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
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
  );
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
  );
}
