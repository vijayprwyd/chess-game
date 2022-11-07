import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';

import useChessGame from './useChessGame';

import { GameOverReason, Player } from 'types/chess';

import { checkMateMoves, drawByRepetition, invalidMoves } from 'mocks/chessMoves';

describe('useChessGame', () => {
  it('should not allow invalid moves', () => {
    const { result } = renderHook(() => useChessGame({}));

    invalidMoves.forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    expect(result.current.fen).toEqual(
      'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2'
    );
  });

  it('should allow offering draw', () => {
    const moves = checkMateMoves.slice(0, 2);

    const { result } = renderHook(() => useChessGame({}));

    moves.slice(0, 2).forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    act(() => {
      result.current.draw();
    });

    expect(result.current.finalStatus.gameOver).toEqual(true);
    expect(result.current.finalStatus.gameOverReason).toEqual(GameOverReason.DrawByAgreement);
  });

  it('should allow resignation', () => {
    const moves = checkMateMoves.slice(0, 2);

    const { result } = renderHook(() => useChessGame({}));

    moves.slice(0, 2).forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    act(() => result.current.resign(Player.White));

    expect(result.current.finalStatus.gameOver).toEqual(true);
    expect(result.current.finalStatus.gameOverReason).toEqual(GameOverReason.Resined);
    expect(result.current.finalStatus.winner).toEqual(Player.Black);
  });

  it('should draw with threefold repitition', () => {
    const { result } = renderHook(() => useChessGame({}));

    drawByRepetition.forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    expect(result.current.finalStatus.gameOver).toEqual(true);
    expect(result.current.finalStatus.gameOverReason).toEqual(GameOverReason.ThreeFoldRepetition);
  });

  it('should detect check mate', () => {
    const { result } = renderHook(() => useChessGame({}));

    checkMateMoves.forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    expect(result.current.finalStatus.gameOver).toEqual(true);
    expect(result.current.finalStatus.gameOverReason).toEqual(GameOverReason.CheckMate);
    expect(result.current.finalStatus.winner).toEqual(Player.White);
  });
});
