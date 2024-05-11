import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import  webproject from "@/ui/webproject.webp"
import Image from "next/image"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';

function ModalProject() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ver Mas</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center mx-auto">
            <Image className="h-full rounded-lg" src={webproject} alt="" />
        </div>
        
        {/* <DialogFooter>
          
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
    
  )
}

export default ModalProject