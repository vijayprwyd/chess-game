import { useEffect, useState } from 'react';

import { UseChessTimerConfig } from './types';

const useChessTimer = ({ timeLimit }: UseChessTimerConfig) => {
  const [whiteTime, setWhiteTime] = useState(timeLimit ?? 0);
  const [blackTime, setBlackTime] = useState(timeLimit ?? 0);

  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined = undefined;
    if (!playing) {
      clearInterval(intervalId);
      return;
    }

    intervalId = setInterval(() => {
      if (currentPlayer === 'white') setWhiteTime((prevTime) => prevTime - 1);
      else setBlackTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playing, currentPlayer]);

  const startTimer = () => {
    if (!timeLimit) return;
    setPlaying(true);
  };

  const toggleTimer = () => {
    if (!timeLimit) return;
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setPlaying(true);
  };

  useEffect(() => {
    if (!whiteTime || !blackTime) setPlaying(false);
  }, [whiteTime, blackTime]);

  return {
    whiteTime,
    blackTime,
    timeout: !!timeLimit && (whiteTime <= 0 || blackTime <= 0),
    startTimer,
    toggleTimer,
  };
};

export default useChessTimer;
