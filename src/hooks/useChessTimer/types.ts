export interface UseChessTimerConfig {
  timeLimit?: number;
}

export interface UseChessTimerType {
  whiteTime: number;
  blackTime: number;
  timeout: boolean;
  startGame: () => void;
  toggleTimer: () => void;
}
