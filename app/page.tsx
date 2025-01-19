'use client'

import { useState } from 'react'
import Polybar from './components/Polybar'
const workspaces = ['About', 'Projects', 'Contact']

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState('About')

  return (
    <main className="min-h-screen flex flex-col relative">
      <div className="px-4 pt-4">
        <Polybar workspaces={workspaces} activeWorkspace={activeWorkspace} setActiveWorkspace={setActiveWorkspace} />
      </div>
    </main>
  )
}

