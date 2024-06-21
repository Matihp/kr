import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilIcon } from "../ui/icons";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

function ModalInfo() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files ?? []);
    setFiles([...files, ...uploadedFiles]);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent className="w-full max-w-none">
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
            <div className="space-y-2 ">
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
            <div className="space-y-2 ">
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
            <div className="border border-dashed border-green-500 p-4 rounded-md flex flex-col items-center">
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 cursor-pointer"
              >
                <ImageIcon className="text-green-500 w-6 h-6" />
                <VideoIcon className="text-green-500 w-6 h-6" />
                <TextIcon className="text-green-500 w-6 h-6" />
                <LinkIcon className="text-green-500 w-6 h-6" />
                <Music2Icon className="text-green-500 w-6 h-6" />
                <span className="text-green-500">Add content</span>
              </label>
              <div className="mt-4 space-y-2 w-full">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span className="text-sm">{file.name}</span>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 ">
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
  );
}

function ImageIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function LinkIcon(props: any) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function Music2Icon(props: any) {
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
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  );
}

function TextIcon(props: any) {
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
      <path d="M17 6.1H3" />
      <path d="M21 12.1H3" />
      <path d="M15.1 18H3" />
    </svg>
  );
}

function VideoIcon(props: any) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}

export default ModalInfo;
