import { useRef } from 'react';

import { getGamePosition, shouldPromote } from './useChessControl.utils';

import { ChessMove, UseChessControlType } from './types';

import { Chess } from 'chess.js';

// Ref: https://www.npmjs.com/package/chess.js
const useChessControl = (): UseChessControlType => {
  const gameRef = useRef(new Chess());

  const makeMove = ({ sourceSquare, targetSquare, piece }: ChessMove) => {
    // see if the  move is legal
    const move = gameRef.current.move({
      from: sourceSquare,
      to: targetSquare,
      // TODO: Support any piece on promotion
      promotion: shouldPromote(targetSquare, piece) ? 'q' : undefined,
    });

    return move;
  };

  const initializeGame = (chessMoves: string[]) => {
    chessMoves.forEach((chessMove) => {
      gameRef.current.move(chessMove);
    });
  };

  const undo = () => gameRef.current.undo();

  const getCurrentPosition = () => getGamePosition(gameRef.current);

  return { getCurrentPosition, makeMove, undo, initializeGame };
};

export default useChessControl;
