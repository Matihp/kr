import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { BellIcon, LockIcon, SunIcon, UserIcon } from 'lucide-react'
import Link from 'next/link'

function Settings() {
  return (
    <div className="flex min-h-screen mt-20">
      <div className="bg-background border-r px-2 py-9 flex flex-col gap-4">
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UserIcon className="w-4 h-4" />
            Profile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <LockIcon className="w-4 h-4" />
            Security
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <BellIcon className="w-4 h-4" />
            Notifications
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground font-bold bg-muted"
            prefetch={false}
          >
            <SunIcon className="w-4 h-4" />
            Appearance
          </Link>
        </nav>
      </div>
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-1 bg-muted/40 p-4 md:p-10">
          <div className="max-w-6xl mx-auto grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Choose your preferred theme for the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Checkbox id="darkMode" />
                    <label htmlFor="darkMode" className="text-sm font-medium">
                      Enable dark mode
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Enter your bio" className="min-h-[100px]" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Update your account security settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter your new password" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your new password" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button>Change Password</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="emailNotifications" defaultChecked />
                    <label htmlFor="emailNotifications" className="text-sm font-medium">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="pushNotifications" />
                    <label htmlFor="pushNotifications" className="text-sm font-medium">
                      Push Notifications
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="webNotifications" defaultChecked />
                    <label htmlFor="webNotifications" className="text-sm font-medium">
                      Web Notifications
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Settings