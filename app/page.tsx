'use client'

import { useState } from 'react'
import Polybar from './components/Polybar'
import Workspace from './components/Workspace'
import ParticleBackground from './components/ParticleBackground'

const workspaces = ['About', 'Projects', 'Contact']

export default function Home() {
  const [activeWorkspace, setActiveWorkspace] = useState('About')

  return (
    <main className="min-h-screen flex flex-col relative">
      <ParticleBackground />
      <div className="px-4 pt-4">
        <Polybar workspaces={workspaces} activeWorkspace={activeWorkspace} setActiveWorkspace={setActiveWorkspace} />
      </div>
      <Workspace activeWorkspace={activeWorkspace} />
    </main>
  )
}

