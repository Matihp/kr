import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { PencilIcon } from '../ui/icons';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type ModalDescriptionProps = {
  setDescription: Dispatch<SetStateAction<string>>;
};

function ModalDescription({ setDescription }: ModalDescriptionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [initialValue, setInitialValue] = useState("");

  const handleEditProduct = () => {
    setIsEditModalOpen(false);
    setTextareaValue(initialValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textareaValue) {
      setDescription(textareaValue);
      setInitialValue(textareaValue);
    }
    setIsEditModalOpen(false);
  };

  const openModal = () => {
    setInitialValue(textareaValue);
    setIsEditModalOpen(true);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <PencilIcon onClick={openModal} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Description</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter your profile description (max 600 characters)"
                maxLength={600}
                minLength={10}
                required
                className="min-h-[200px]"
                value={textareaValue}
                onChange={(e) => {
                  setTextareaValue(e.target.value);
                  const characterCount = e.target.value.length;
                  const charactersRemaining = 600 - characterCount;
                  const characterCountElement = document.getElementById("character-count");
                  if (characterCountElement) {
                    characterCountElement.textContent = String(charactersRemaining);
                  }
                }}
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                <span id="character-count">600</span> characters remaining
              </div>
            </div>
          </div>
          <DialogFooter>
            <div>
              <Button variant="outline" onClick={handleEditProduct}>Close</Button>
            </div>
            <Button type="submit">Save Description</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalDescription;


