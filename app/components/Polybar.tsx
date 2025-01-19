'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Battery, Volume2, Wifi, Music, HardDrive, PlayCircle, PauseCircle, SkipForward, SkipBack, MemoryStickIcon as Memory, Monitor, MessageCircle, Settings, Power } from 'lucide-react'

interface PolybarProps {
  workspaces: string[]
  activeWorkspace: string
  setActiveWorkspace: (workspace: string) => void
}

export default function Polybar({ workspaces, activeWorkspace, setActiveWorkspace }: PolybarProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [volume] = useState(35)
  const [battery] = useState(53)
  const [isPlaying] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="bg-[#1a1b26]/90 backdrop-blur-sm text-gray-300 h-8 px-2 flex justify-between items-center shadow-lg text-xs font-mono rounded-lg border border-[#24283b]/50">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        <div className="text-blue-400 flex items-center">
          <span className="text-sm">λ</span>
        </div>
        <div className="flex items-center space-x-1">
          <Activity size={12} className="text-rose-400" />
          <span>1%</span>
        </div>
        <div className="flex items-center space-x-1">
          <HardDrive size={12} className="text-blue-400" />
          <span>1.73 GiB</span>
        </div>
        <div className="flex items-center space-x-1">
          <Memory size={12} className="text-green-400" />
          <span>11.31 GB</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="hover:text-[#f7768e]">
            <SkipBack size={12} />
          </button>
          <button className="hover:text-[#f7768e]">
            {isPlaying ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
          </button>
          <button className="hover:text-[#f7768e]">
            <SkipForward size={12} />
          </button>
        </div>
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-3">
        <Monitor size={14} className="text-purple-400" />
        <MessageCircle size={14} className="text-blue-400" />
        <Settings size={14} className="text-yellow-400" />
        <Power size={14} className="text-rose-400" />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Music size={12} className="text-[#f7768e]" />
          <span className="px-1 py-0.5 rounded bg-[#24283b]">In The Dark</span>
        </div>
        <div className="flex items-center space-x-1">
          <Volume2 size={12} />
          <span>{volume}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Battery size={12} className="text-yellow-400" />
          <span>{battery}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Wifi size={12} className="text-green-400" />
        </div>
        <div>{currentTime} pm</div>
      </div>
    </nav>
  )
}

