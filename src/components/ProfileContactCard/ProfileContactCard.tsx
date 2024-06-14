import { Card, CardHeader, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { mdiInstagram } from '@mdi/js';
import { Separator } from "@/components/ui/separator"
import Icon from "@mdi/react";
import { useEffect } from "react";

export default function ProfileContactCard() {

  // top-72 
  return (
    <Card className="profileContactCard fixed bottom-10 w-[30vw] pointer-events-none z-20  md:right-5 lg:right-10 hidden md:block">
      <CardHeader className="bg-gray-200 dark:bg-gray-800 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="grid gap-1">
              <div className="text-lg font-bold">Software Engineer</div>
              {/* <div className="text-sm text-gray-500 dark:text-gray-400">Acme Inc.</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">San Francisco, CA</div> */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="#"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <Icon path={mdiInstagram} size={1} />
            </Link>
            <Link
              href="#"
              target="_blank"
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              prefetch={false}
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-6">
        <div className="grid gap-2">
          <div className="text-sm font-medium">Certificación</div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-10 w-10 bg-slate-100" ></span>
              <div>
                <div className="text-sm font-medium">Certified Developer</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Krovit</div>
              </div>
            </div>
            <Button variant="link" size="sm" className="hidden lg:block">
              Ver Certificación
            </Button>
          </div>
        </div>
        <Separator />
        <div className="grid gap-2">
          <div className="text-sm font-medium">Contact</div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div className="text-sm">john.doe@acme.com</div>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <div className="text-sm">+1 (555) 123-4567</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


function MailIcon(props:any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function PhoneIcon(props:any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function TwitterIcon(props:any) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}