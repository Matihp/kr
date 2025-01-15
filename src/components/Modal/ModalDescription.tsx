import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { PencilIcon } from '../ui/icons';
import { Dispatch, FormEvent, SetStateAction, useState, useEffect, useRef } from 'react';

type ModalDescriptionProps = {
  setDescription: Dispatch<SetStateAction<string>>;
  description: string;
};

function ModalDescription({ setDescription, description }: ModalDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restablecer el valor cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setValue(description ===  'Bienvenido a tu perfil. Edita esta sección para agregar una descripción personalizada.' ? '' : description);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(description.length, description.length);
        }
      }, 0);
    }
  }, [isOpen, description]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim()) {
      setDescription(value);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setValue(description); // Restaurar al valor original
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose(); // Si se cierra (por la cruz o escape), manejar como cancelar
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar descripción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                ref={textareaRef}
                id="description"
                placeholder="Ingrese la descripción de su perfil (máximo 600 caracteres)"
                maxLength={600}
                minLength={10}
                required
                className="min-h-[200px]"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                {600 - value.length} caracteres restantes
              </div>
            </div>
          </div>
          <DialogFooter className='mxsm:grid mxsm:grid-cols-2 mxsm:gap-4'>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalDescription;


