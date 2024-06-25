import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { PencilIcon } from '../ui/icons';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

type ModalDescriptionProps = {
  setDescription: Dispatch<SetStateAction<string>>;
};

function ModalDescription({setDescription}: ModalDescriptionProps) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const handleEditProduct = () => {
      setIsEditModalOpen(false)
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newDescription = formData.get('description') as string;
    if (newDescription) {
      setDescription(newDescription);
    }
    handleEditProduct()
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
    <DialogTrigger asChild>
      <PencilIcon/>
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
            onChange={(e:any) => {
              setDescription(e.target.value)
              const characterCount = e.target.value.length
              const charactersRemaining = 600 - characterCount
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
          <Button variant="outline"onClick={()=>{handleEditProduct()}}>Close</Button>
        </div>
        <Button type="submit">Save Description</Button>
      </DialogFooter>
      </form>     
    </DialogContent>
  </Dialog>
  )
}

export default ModalDescription