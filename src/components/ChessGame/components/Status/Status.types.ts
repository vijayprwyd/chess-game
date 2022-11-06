import { GameStatus } from 'hooks/useChessControl';

import { Player } from 'types/chess';

export interface StatusProps {
  color: string;
  status: GameStatus;
  winner?: Player;
}
