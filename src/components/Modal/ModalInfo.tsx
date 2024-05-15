import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import Icon from '@mdi/react';
  import { mdiPencilCircle } from '@mdi/js';

function ModalInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon className="cursor-pointer h-6" path={mdiPencilCircle} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center mx-auto">
            
        </div>
        
        {/* <DialogFooter>
          
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default ModalInfo