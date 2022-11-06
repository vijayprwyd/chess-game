import { UseChessActionType } from '../useChessActions/useChessActions';
import { ChessMove, UseChessControlConfig, UseChessControlType } from '../useChessControl/types';
import { UseChessTimerConfig, UseChessTimerType } from '../useChessTimer/types';

export interface UseChessConfig {
  takeBack?: UseChessControlConfig['takeBack'];
  timeLimit?: UseChessTimerConfig['timeLimit'];
}

export interface UseChessGameType
  extends Omit<UseChessControlType, 'makeMove'>,
    Omit<UseChessTimerType, 'startGame'>,
    UseChessActionType {
  makeChessMove: (move: ChessMove) => void;
}
