import { UseChessActionType } from '../useChessActions/useChessActions';

import { ChessMove, GamePosition, UseChessControlConfig } from '../useChessControl/types';
import { UseChessTimerConfig, UseChessTimerType } from '../useChessTimer/types';

export interface UseChessConfig {
  takeBack?: UseChessControlConfig['takeBack'];
  timeLimit?: UseChessTimerConfig['timeLimit'];
}

export interface UseChessGameType
  extends GamePosition,
    Omit<UseChessTimerType, 'startGame' | 'updateTimer'>,
    UseChessActionType {
  makeChessMove: (move: ChessMove) => void;
  displayNthMove: (n: number) => void;
  undo: (move?: number) => void;
  gameTimeLimit: number | undefined;
}
