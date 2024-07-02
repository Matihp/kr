"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

import Dropzone from "../ui/file-input";
import { Button } from "../ui/button";

export function DropdownProject() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const handleEditProduct = () => {
      setIsEditModalOpen(true)
    }
    const handleSaveProduct = () => {
      setIsEditModalOpen(false)
    }
  return (
    <>
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Icon className="cursor-pointer h-12 md:h-6" path={mdiPencilCircle}  />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
            <DropdownMenuLabel >My Project</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEditProduct}>Edit</DropdownMenuItem>
            <DropdownMenuItem>
                Eliminar
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
                Compartir
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
        </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="w-full max-w-none max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add a new portfolio project</DialogTitle>
              <DialogDescription>
                All fields are required unless otherwise indicated.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="project-title"
                    className="block text-sm font-medium"
                  >
                    Project title
                  </label>
                  <Input
                    id="project-title"
                    placeholder="Enter a brief but descriptive title"
                  />
                  <p className="text-xs text-gray-500">70 characters left</p>
                </div>
                <div>
                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium">
                      Your role (optional)
                    </label>
                    <Input
                      id="role"
                      placeholder="e.g., Front-end engineer or Marketing analyst"
                    />
                    <p className="text-xs text-gray-500">100 characters left</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium"
                  >
                    Project description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe the project's goals, your solution and the impact you made here"
                  />
                  <p className="text-xs text-gray-500">600 characters left</p>
                </div>
                <div className="space-y-2">
                  <label htmlFor="skills" className="block text-sm font-medium">
                    Skills and deliverables
                  </label>
                  <Input
                    id="skills"
                    className="h-20"
                    placeholder="Type to add skills relevant to this project"
                  />
                  <p className="text-xs text-gray-500">5 skills left</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Add content</label>
                {/* <Dropzone /> */}
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="website" className="block text-sm font-medium">
                    Website
                  </label>
                  <Input
                    id="website"
                    placeholder="Enter the project's website URL"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="repository" className="block text-sm font-medium">
                    Repository
                  </label>
                  <Input
                    id="repository"
                    placeholder="Enter the project's repository URL"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <Button variant="ghost">Save as draft</Button>
              <Button variant="default">Next: Preview</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}
