import { Player } from '../../types/chess';

import { UseChessControlType } from './types';

import { Chess } from 'chess.js';

export const shouldPromote = (targetSquare: string, piece: string) =>
  (targetSquare[1] === '8' && piece[1] === 'P' && piece[0] === 'w') ||
  (targetSquare[1] === '1' && piece[1] === 'P' && piece[0] === 'b');

export const getGamePosition = (chess: Chess): Omit<UseChessControlType, 'makeMove' | 'undo'> => {
  const gameOver = chess.isGameOver();
  const currentPlayer = chess.turn() === 'b' ? Player.Black : Player.White;
  const nextPlayer = currentPlayer === Player.Black ? Player.White : Player.Black;

  return {
    fen: chess.fen(),
    currentPlayer: chess.turn() === 'b' ? Player.Black : Player.White,
    inCheck: chess.inCheck(),
    finalStatus: {
      checkMate: chess.isCheckmate(),
      staleMate: chess.isStalemate(),
      threefoldRepetition: chess.isThreefoldRepetition(),
      isInsufficientMaterial: chess.isInsufficientMaterial(),
      gameOver,
      winner: gameOver ? nextPlayer : undefined,
    },
    // Casting is safe because we don't want verbose option
    history: chess.history() as unknown as string[],
  };
};
