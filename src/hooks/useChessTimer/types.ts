export interface UseChessTimerConfig {
  timeLimit?: number;
  gameOver?: boolean;
}

export interface UseChessTimerType {
  whiteTime: number;
  blackTime: number;
  timeout: boolean;
  startGame: () => void;
  toggleTimer: () => void;
  updateTimer: () => void;
}
