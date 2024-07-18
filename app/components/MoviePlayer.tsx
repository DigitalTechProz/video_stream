import React, { useEffect, useState, useRef } from 'react';
import { PlayerSdk } from "@api.video/player-sdk";

interface MoviePlayerProps {
  videoId: string;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ videoId }) => {
  const [showNextButton, setShowNextButton] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const playerRef = useRef<PlayerSdk | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const playerElement = document.getElementById(`video-player-${videoId}`) as HTMLElement;
    if (!playerElement) {
      console.error('Player element not found');
      return;
    }

    const player = new PlayerSdk(playerElement, {
      id: videoId,
      autoplay: false,
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
  }, [videoId, showNextButton]);

  const handleNextVideoClick = () => {
    console.log('Next video clicked');
    // Implement logic for handling next video click
  };

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <div id={`video-player-${videoId}`} className="absolute top-0 left-0 w-full h-full rounded-md overflow-hidden"></div>
      {showNextButton && countdown > 0 && (
        <button
          onClick={handleNextVideoClick}
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
    </div>
  );
};

export default MoviePlayer;
