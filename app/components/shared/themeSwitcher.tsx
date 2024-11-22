'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) return null;

  return (
    <div className='flex gap-2 items-center w-full justify-between'>
      <div>Theme</div>
      <div className='flex gap-2'>
       <Button size='sm' variant='flat' isIconOnly onClick={() => setTheme('light')}>
          <i className='ri-sun-fill'/>
        </Button>
        <Button size='sm' variant='flat' isIconOnly onClick={() => setTheme('dark')}>
        <i className='ri-moon-fill'/>
        </Button>
      </div>
    </div>
  )
}