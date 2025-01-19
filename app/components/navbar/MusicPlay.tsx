"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import ReactPlayer from 'react-player/youtube';
import { Button } from "@/components/ui/button";

const YOUTUBE_LIST = [
  { id: 'dQw4w9WgXcQ', title: 'Song 1' },
  { id: 'kffacxfA7G4', title: 'Song 2' },
  { id: '8NnQs3EtoqU', title: 'Song 3' },
  // ...other songs...
];

interface MusicPlayProps {
  isPlaying: boolean;
}

export default function MusicPlay({ isPlaying }: MusicPlayProps) {
  const [isPlayingState, setIsPlayingState] = useState(isPlaying);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    setIsPlayingState(isPlaying);
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlayingState(!isPlayingState);
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % YOUTUBE_LIST.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + YOUTUBE_LIST.length) % YOUTUBE_LIST.length);
    setCurrentTime(0);
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Now Playing
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to control your music
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={`https://img.youtube.com/vi/${YOUTUBE_LIST[currentSongIndex].id}/maxresdefault.jpg`}
            height="1000"
            width="1000"
            className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="Music video thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-gray-700"
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </CardItem>
          <CardItem
            translateZ={20}
            className="flex space-x-2"
          >
            <Button onClick={handlePrevious} className="p-3 rounded-full bg-black dark:bg-white text-white dark:text-black">
              <SkipBack size={20} />
            </Button>
            <Button onClick={togglePlayPause} className="p-3 rounded-full bg-black dark:bg.white text-white dark:text-black">
              {isPlayingState ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            <Button onClick={handleNext} className="p-3 rounded-full bg-black dark:bg.white text-white dark:text-black">
              <SkipForward size={20} />
            </Button>
          </CardItem>
        </div>
      </CardBody>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/watch?v=${YOUTUBE_LIST[currentSongIndex].id}`}
        playing={isPlayingState}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="0"
        height="0"
      />
    </CardContainer>
  );
}

