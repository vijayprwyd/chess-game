import { useEffect, useRef } from 'react';

export interface GameMove {
  san: string;
  whiteTime: number;
  blackTime: number;
  fen: string;
}

interface GameMoveStorage {
  s: string;
  w: number;
  b: number;
  f: string;
}

const getHistoryFromLocalStorage = () => {
  try {
    const currentHistoryString = localStorage.getItem('chessHistory');
    if (currentHistoryString) {
      return JSON.parse(currentHistoryString) as GameMoveStorage[];
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

const useGameHistory = (initialValue: GameMove, onGameLoad: (move: GameMove[]) => void) => {
  // To minimize size in localStorage and prevent iteration
  const localStorageRef = useRef<GameMoveStorage[]>(
    getHistoryFromLocalStorage() ?? [
      {
        s: initialValue.san,
        w: initialValue.whiteTime,
        b: initialValue.blackTime,
        f: initialValue.fen,
      },
    ]
  );

  // TODO: Support storing multiple games based on an id
  const historyRef = useRef<GameMove[]>(
    localStorageRef.current.map((move) => ({
      blackTime: move.b,
      whiteTime: move.w,
      fen: move.f,
      san: move.s,
    }))
  );

  const addMoveToHistory = ({ san, whiteTime, blackTime, fen }: GameMove) => {
    historyRef.current.push({ san, whiteTime, blackTime, fen });
    localStorageRef.current.push({ s: san, w: whiteTime, b: blackTime, f: fen });

    localStorage.setItem('chessHistory', JSON.stringify(localStorageRef.current));
  };

  const getLastMove = () => historyRef.current[historyRef.current.length - 1];

  const undoMoveInHistory = () => {
    historyRef.current.pop();
    localStorageRef.current.pop();

    localStorage.setItem('chessHistory', JSON.stringify(localStorageRef.current));
  };

  useEffect(() => {
    onGameLoad(historyRef.current);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('chessHistory');
  };

  return {
    history: historyRef.current,
    addMoveToHistory,
    undoMoveInHistory,
    getLastMove,
    clearHistory,
  };
};

export default useGameHistory;
