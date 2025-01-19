'use client'

import { useEffect, useState } from 'react'
import { Battery, Volume2, Wifi, PlayCircle, PauseCircle, SkipForward, SkipBack, MemoryStickIcon as Memory, Monitor, MessageCircle, Settings, Power, User, Code, Github, Linkedin, Folder, Calendar, Mail, Sun, Moon, Headphones, BarChart2, Clock, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import MusicCard from './navbar/MusicPlay'
import { motion, AnimatePresence } from 'framer-motion'

interface PolybarProps {
  workspaces: string[]
  activeWorkspace: string
  setActiveWorkspace: (workspace: string) => void
}

interface MusicCardProps {
  isPlaying: boolean;
  // other props
}

export default function Polybar({ workspaces, activeWorkspace, setActiveWorkspace }: PolybarProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [volume] = useState(35)
  const [battery] = useState(53)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showMusicCard, setShowMusicCard] = useState(false)

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleMusicCard = () => {
    setShowMusicCard(!showMusicCard)
    setIsPlaying(!isPlaying)
  }

  const iconKiri = [
    <a href="#home"><img src="/images/icon.png" alt="Home" className="w-6 h-6" /></a>,
    <div className="border-l-2 border-white h-5"></div>,
    <a href="#about"><User size={12} className="text-green-400" /></a>,
    <a href="#blog"><MessageCircle size={12} className="text-green-400" /></a>,
    <a href="#projects"><Folder size={12} className="text-green-400" /></a>,
    <a href="#contact"><Mail size={12} className="text-green-400" /></a>
  ]

  const iconTengah = [
    <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer"><Github size={14} className="text-white" /></a>,
    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"><Linkedin size={14} className="text-blue-400" /></a>,
    <Folder size={14} className="text-yellow-400" />,
    <Calendar size={14} className="text-purple-400" />,
    <Mail size={14} className="text-red-400" />,
    <Button onClick={toggleTheme} className="hover:text-[#f7768e]">{isDarkMode ? <Sun size={14} /> : <Moon size={14} />}</Button>
  ]

  const iconKanan = [
    <Headphones size={12} className="text-[#f7768e]" onClick={toggleMusicCard} />,
    <Volume2 size={12} />,
    <Battery size={12} className="text-yellow-400" />,
    <Wifi size={12} className="text-green-400" />,
    <BarChart2 size={12} className="text-blue-400" />,
    <Clock size={12} className="text-white" />,
    <Quote size={12} className="text-gray-400" />
  ]

  return (
    <nav className="bg-[#132d45]/90 backdrop-blur-sm text-gray-300 h-10 px-2 flex justify-between items-center shadow-lg text-xs font-mono rounded-lg border border-[#24283b]/50">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {iconKiri.map((icon, index) => (
          <div key={index} className="flex items-center space-x-1">
            {React.cloneElement(icon, { size: 16 })}
          </div>
        ))}
      </div>

      {/* Center section */}
      <div className="flex items-center space-x-3">
        {iconTengah.map((icon, index) => (
          <div key={index} className="flex items-center space-x-1">
            {React.cloneElement(icon, { size: 18 })}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4 relative">
        {iconKanan.map((icon, index) => (
          <div key={index} className="flex items-center space-x-1 relative">
            {React.cloneElement(icon, { size: 16 })}
            {index === 0 && (
              <AnimatePresence>
                {showMusicCard && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-3.5"
                  >
                    <MusicCard isPlaying={isPlaying} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
        <span>{volume}</span>
        <span>{battery}%</span>
        <span>{currentTime}</span>
      </div>
    </nav>
  )
}
