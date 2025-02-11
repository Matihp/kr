"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { User } from "../../../kr-backend/src/types/userTypes";
import avatar from "@/ui/avatar.jpg";
import Image from "next/image";

interface AvatarDropdownProps {
  user: User | null;
  logout: () => void;
}

export function AvatarDropdown({ user, logout }: AvatarDropdownProps) {
  const router = useRouter();

  if (!user) {
    return null; // O maneja el caso donde user es null o undefined
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      >
        <Button
          variant="ghost"
          className="inline-flex items-center justify-center pl-3 pr-9 text-sm font-medium transition-colors border rounded-md text-neutral-700 hover:bg-neutral-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <div className="relative w-10 h-10">
            <Image
              width={80}
              height={80}
              alt="Profile avatar"
              src={user.avatarSrc ? user.avatarSrc : avatar.src}
              className="rounded-full object-cover w-full h-full border border-neutral-200"
            />
          </div>
          <div className="flex flex-col items-start flex-shrink-0 ml-2 leading-none translate-y-px">
            <span>{`${user.firstName} ${user.lastName}`}</span>
            <span className="text-xs font-light text-neutral-400">
              @{user.email.split("@")[0]}
            </span>
          </div>
          <svg
            className="absolute right-0 w-5 h-5 mr-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute top-0 z-50 w-56 -translate-x-1/2 left-1/2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/profile");
            }}
          >
            Perfil
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/settings");
            }}
          >
            Configuración
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Cerrar Sesión
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
