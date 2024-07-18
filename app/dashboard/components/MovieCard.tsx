"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../../types/movie';
import { PlayCircle, X } from "lucide-react";
import Image from "next/image";
import { PlayerSdk } from "@api.video/player-sdk";

interface MovieCardProps {
  movie: Movie;
  onExpand: (movie: Movie | null) => void;
  isExpanded: boolean;
  CategoryName: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onExpand, isExpanded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const playerRef = useRef<PlayerSdk | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatUrl = (url: string) => {
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  };

  const handleWatchNowClick = () => {
    onExpand(movie);
  };

  useEffect(() => {
    if (isExpanded) {
      const playerElement = document.getElementById(`video-player-${movie.apiVideoId}`) as HTMLElement;
      if (!playerElement) {
        console.error('Player element not found');
        return;
      }

      const player = new PlayerSdk(playerElement, {
        id: movie.apiVideoId,
        autoplay: true,
        loop: false,
        muted: false,
        hideControls: false,
      });

      playerRef.current = player;

      player.addEventListener('timeupdate', (event: { currentTime: number }) => {
        const currentTime = event.currentTime;
        const duration = player.getDuration();

        if (typeof duration === 'number' && duration - currentTime <= 5 && !showNextButton) {
          setShowNextButton(true);
          intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        } else if (typeof duration === 'number' && duration - currentTime > 5 && showNextButton) {
          setShowNextButton(false);
          clearInterval(intervalRef.current!);
          setCountdown(5);
        }
      });

      player.addEventListener('ended', () => {
        setShowNextButton(false);
        clearInterval(intervalRef.current!);
        setCountdown(5);
      });

      return () => {
        player.destroy();
        clearInterval(intervalRef.current!);
      };
    }
  }, [movie.apiVideoId, isExpanded, showNextButton]);

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        <div className="relative pt-[56.25%] bg-gray-900">
          <div id={`video-player-${movie.apiVideoId}`} className="absolute inset-0 w-full h-full"></div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto bg-gray-900">
          <h2 className="text-2xl font-bold mb-2 text-white">{movie.title}</h2>
          <p className="text-gray-300 mb-4">{movie.description}</p>
          <p className="text-sm text-gray-400">Uploaded on: {new Date(movie.uploadDate).toLocaleDateString('en-CA')}</p>
          <p className="text-sm text-gray-400">Duration: {movie.duration} minutes</p>
          <p className="text-sm text-gray-400">Categories: {movie.categories.map((category) => category.name).join(', ')}</p>
        </div>
        {showNextButton && countdown > 0 && (
          <button
            onClick={() => console.log('Next video clicked')}
            className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-bounce z-10"
          >
            <span>Next Video in {countdown}s</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 0 1 .75.75V8.5h4.75a.75.75 0 0 1 .542 1.267l-7.25 5.5a.75.75 0 0 1-1.084-.032l-7.25-5.5A.75.75 0 0 1 .5 8.5h4.75V3.75A.75.75 0 0 1 6 3h4z"
              />
            </svg>
          </button>
        )}
        <button 
          onClick={() => onExpand(null)} // Pass null to close the player
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white rounded-md shadow-md overflow-hidden">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {movie.thumbnail && (
          <Image
            src={formatUrl(movie.thumbnail.url)}
            alt={movie.thumbnail.title || movie.title}
            width={400}
            height={225}
            layout="responsive"
            objectFit="cover"
          />
        )}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <PlayCircle 
              className="text-white w-12 h-12 cursor-pointer" 
              onClick={handleWatchNowClick}
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 truncate">{movie.title}</h2>
        <p className="text-gray-300 text-sm mb-2 line-clamp-2">{movie.description}</p>
        <p className="text-gray-400 text-xs">{new Date(movie.uploadDate).toLocaleDateString('en-CA')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
