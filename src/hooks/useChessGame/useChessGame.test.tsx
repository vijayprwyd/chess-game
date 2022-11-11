import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';

import useChessGame from './useChessGame';

import { GameOverReason, Player } from 'types/chess';

import { checkMateMoves, drawByRepetition, invalidMoves, randomMoves } from 'mocks/chessMoves';
import localStorageMock from 'mocks/localStorage';

describe('useChessGame', () => {
  beforeAll(() => {
    localStorageMock.clear();
  });

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

  it('should display Nth move', () => {
    const { result } = renderHook(() => useChessGame({}));

    randomMoves.forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    act(() => {
      result.current.displayNthMove(4);
    });

    expect(result.current.fen).toEqual(
      'rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3'
    );
  });

  it('should undo n moves and update timer', () => {
    const { result } = renderHook(() => useChessGame({}));

    randomMoves.forEach((move) => {
      act(() => {
        result.current.makeChessMove({
          sourceSquare: move[0],
          targetSquare: move[1],
          piece: move[2],
        });
      });
    });

    expect(result.current.fen).toEqual(
      'rnbqkb1r/pp3p1p/2p1pnp1/3p4/1P1P4/P4NP1/2P1PP1P/RNBQKB1R w KQkq - 0 6'
    );

    act(() => {
      result.current.undo(2);
    });

    expect(result.current.fen).toEqual(
      'rnbqkb1r/pp2pp1p/2p2np1/3p4/3P4/P4NP1/1PP1PP1P/RNBQKB1R w KQkq - 0 5'
    );
    expect(result.current.history.length).toEqual(8);
  });

  it('should start game from a predefined position', () => {
    localStorage.setItem(
      'chessHistory',
      '[{"s":"","w":0,"b":0,"f":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"},{"s":"d4","w":0,"b":0,"f":"rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1"},{"s":"d5","w":0,"b":0,"f":"rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2"},{"s":"Nf3","w":0,"b":0,"f":"rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2"},{"s":"Nf6","w":0,"b":0,"f":"rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3"},{"s":"a3","w":0,"b":0,"f":"rnbqkb1r/ppp1pppp/5n2/3p4/3P4/P4N2/1PP1PPPP/RNBQKB1R b KQkq - 0 3"},{"s":"c6","w":0,"b":0,"f":"rnbqkb1r/pp2pppp/2p2n2/3p4/3P4/P4N2/1PP1PPPP/RNBQKB1R w KQkq - 0 4"},{"s":"g3","w":0,"b":0,"f":"rnbqkb1r/pp2pppp/2p2n2/3p4/3P4/P4NP1/1PP1PP1P/RNBQKB1R b KQkq - 0 4"},{"s":"g6","w":0,"b":0,"f":"rnbqkb1r/pp2pp1p/2p2np1/3p4/3P4/P4NP1/1PP1PP1P/RNBQKB1R w KQkq - 0 5"},{"s":"b4","w":0,"b":0,"f":"rnbqkb1r/pp2pp1p/2p2np1/3p4/1P1P4/P4NP1/2P1PP1P/RNBQKB1R b KQkq b3 0 5"},{"s":"e6","w":0,"b":0,"f":"rnbqkb1r/pp3p1p/2p1pnp1/3p4/1P1P4/P4NP1/2P1PP1P/RNBQKB1R w KQkq - 0 6"}]'
    );

    const { result } = renderHook(() => useChessGame({}));

    expect(result.current.fen).toEqual(
      'rnbqkb1r/pp3p1p/2p1pnp1/3p4/1P1P4/P4NP1/2P1PP1P/RNBQKB1R w KQkq - 0 6'
    );
    expect(result.current.history.length).toEqual(10);
  });
});
