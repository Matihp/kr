"use client"

import { Button } from "@/components/ui/button"
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
import { useAuth } from "@/lib/useAuth";

export function AvatarDropdown() {
  const { logout } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <Button variant="ghost" className="inline-flex items-center justify-center pl-3 pr-9 text-sm font-medium transition-colors border rounded-md text-neutral-700 hover:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none">
          <img src="https://cdn.devdojo.com/images/may2023/adam.jpeg" className="object-cover w-9 border rounded-full border-neutral-200" />
          <div className="flex flex-col items-start flex-shrink-0 ml-2 leading-none translate-y-px">
            <span>Juan Gutierrez</span>
            <span className="text-xs font-light text-neutral-400">@juan.gutierrez</span>
          </div>
          <svg className="absolute right-0 w-5 h-5 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-0 z-50 w-56 -translate-x-1/2 left-1/2">
 
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
