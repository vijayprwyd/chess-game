import { useRef, useState } from 'react';
import { Chess } from 'chess.js';

import { getGamePosition, shouldPromote } from './useChessControl.utils';

import { ChessMove, UseChessControlConfig, UseChessControlType } from './types';

// Ref: https://www.npmjs.com/package/chess.js
const useChessControl = ({ takeBack = false }: UseChessControlConfig): UseChessControlType => {
  const gameRef = useRef(new Chess());
  const [gamePosition, setGamePosition] = useState(() => getGamePosition(gameRef.current));

  const makeMove = ({ sourceSquare, targetSquare, piece }: ChessMove) => {
    if (gamePosition.finalStatus.gameOver) return null;

    // see if the  move is legal
    const move = gameRef.current.move({
      from: sourceSquare,
      to: targetSquare,
      // TODO: Support any piece on promotion
      promotion: shouldPromote(targetSquare, piece) ? 'q' : undefined,
    });

    if (move) {
      setGamePosition(() => getGamePosition(gameRef.current));
    }
    return move;
  };

  const undo = () => {
    if (!takeBack) return;
    return gameRef.current.undo();
  };

  return { ...gamePosition, makeMove, undo };
};

export default useChessControl;
