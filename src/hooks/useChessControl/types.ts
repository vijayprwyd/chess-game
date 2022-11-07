import { GameOverReason, Player } from '../../types/chess';

import { Move } from 'chess.js';

export interface ChessMove {
  sourceSquare: string;
  targetSquare: string;
  piece: string;
}

export interface UseChessControlConfig {
  /**
   * boolean indicating if undo chess moves are allowed. Default to false
   */
  takeBack?: boolean;
  /**
   * Indicates if game is over due to timeout
   */
  timeout?: boolean;
}

export interface GameStatus {
  /**
   * Returns true if check mate
   */
  checkMate: boolean;
  /**
   * Returns true if stale mate
   */
  staleMate: boolean;
  /**
   * Returns true if game drawn by three fold repetition
   */
  threefoldRepetition: boolean;
  /**
   * Returns true if no sufficient materials and game is declared draw
   */
  isInsufficientMaterial: boolean;
  /**
   * Returns true if game is over
   */
  gameOver: boolean;
  /**
   * Reason for game over
   */
  gameOverReason?: GameOverReason;
  /**
   * Indicates the winner
   */
  winner?: Player;
}

export interface UseChessControlType {
  /**
   * Current Fen position of the game
   */
  fen: string;
  /**
   * Makes a chess move, represented by source square, target square and moved piece
   */
  makeMove: (move: ChessMove) => Move | null;
  /**
   * Indicates current player
   */
  currentPlayer: Player;
  /**
   * Returns true or false if the side to move is in check
   */
  inCheck: boolean;
  /**
   * Undo last move
   */
  undo: () => void;
  /**
   * Returns chess history
   */
  history: string[];
  /**
   * Returns end game info
   */
  finalStatus: GameStatus;
}
