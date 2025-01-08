"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '../ui/switch'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Modo oscuro
      </span>
      <Switch
        checked={resolvedTheme === 'dark'}
        onCheckedChange={toggleTheme}
      />
    </div>
  )
}

