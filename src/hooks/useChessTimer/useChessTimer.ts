import { useEffect, useState } from 'react';

import { UseChessTimerConfig } from './types';

const useChessTimer = ({ timeLimit, gameOver }: UseChessTimerConfig) => {
  const [whiteTime, setWhiteTime] = useState(timeLimit ?? 0);
  const [blackTime, setBlackTime] = useState(timeLimit ?? 0);
  const [hasTime, setHasTime] = useState(!!timeLimit);

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

  const startTimer = (
    whiteTime: number,
    blackTime: number,
    currentPlayerFromProps: 'black' | 'white'
  ) => {
    setPlaying(true);
    setWhiteTime(whiteTime);
    setBlackTime(blackTime);
    setCurrentPlayer(currentPlayerFromProps);
    setHasTime(true);
  };

  const toggleTimer = () => {
    if (!timeLimit) return;
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    setPlaying(true);
  };

  const updateTimer = ({
    whiteTime,
    blackTime,
    currentPlayer,
  }: {
    whiteTime: number;
    blackTime: number;
    currentPlayer: 'white' | 'black';
  }) => {
    setWhiteTime(whiteTime);
    setBlackTime(blackTime);
    setCurrentPlayer(currentPlayer);
  };

  useEffect(() => {
    if (!whiteTime || !blackTime || gameOver) setPlaying(false);
  }, [whiteTime, blackTime, gameOver]);

  return {
    whiteTime,
    blackTime,
    timeout: !!hasTime && (whiteTime <= 0 || blackTime <= 0),
    startTimer,
    toggleTimer,
    updateTimer,
  };
};

export default useChessTimer;
