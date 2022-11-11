import { Player } from 'types/chess';

export interface ActionsProps {
  gameOver: boolean;
  draw: () => void;
  resign: (player: Player) => void;
  onStartNewGame: () => void;
  undo: () => void;
  currentMoveIndex: number;
}
