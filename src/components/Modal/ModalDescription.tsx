import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';

function ModalDescription() {
  return (
    <Dialog>
    <DialogTrigger asChild>
        <Icon className="cursor-pointer h-6" path={mdiPencilCircle} />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Profile Description</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter your profile description (max 600 characters)"
            maxLength={600}
            className="min-h-[200px]"
            onChange={(e:any) => {
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
          <Button variant="outline">Close</Button>
        </div>
        <Button type="submit">Save Description</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}

export default ModalDescription