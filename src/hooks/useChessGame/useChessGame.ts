import { useEffect, useLayoutEffect, useState } from 'react';

import useChessActions from 'hooks/useChessActions';
import useChessControl from 'hooks/useChessControl';
import useChessTimer from 'hooks/useChessTimer';
import useGameHistory, { GameMove } from 'hooks/useGameHistory/useGameHistory';

import { GameOverReason, Player } from 'types/chess';
import { UseChessConfig, UseChessGameType } from './types';
import { ChessMove, GameStatus } from 'hooks/useChessControl/types';

const getGameOverReason = (
  status: GameStatus,
  timeout: boolean,
  drawByAgreement: boolean,
  resigned: boolean
) => {
  if (status.checkMate) return GameOverReason.CheckMate;
  if (status.staleMate) return GameOverReason.StaleMate;
  if (status.isInsufficientMaterial) return GameOverReason.InsufficientMaterial;
  if (status.threefoldRepetition) return GameOverReason.ThreeFoldRepetition;
  if (timeout) return GameOverReason.Timeout;
  if (resigned) return GameOverReason.Resined;
  if (drawByAgreement) return GameOverReason.DrawByAgreement;
  return undefined;
};

const useChessGame = ({ timeLimit: timeLimitFromForm }: UseChessConfig): UseChessGameType => {
  const { makeMove, getCurrentPosition, undo: undoMove, initializeGame } = useChessControl();
  const [currentPosition, setCurrentPosition] = useState(getCurrentPosition());
  const [fen, setFen] = useState<string>(currentPosition.fen);
  const [timeLimit, setTimeLimit] = useState(timeLimitFromForm);

  const actions = useChessActions();
  const { drawn, resignedPlayer } = actions;

  const isGameOverBeforeTimeout = currentPosition.finalStatus.gameOver || drawn || !!resignedPlayer;

  const timer = useChessTimer({
    timeLimit,
    gameOver: isGameOverBeforeTimeout,
  });
  const { timeout } = timer;

  const getWinner = () => {
    const { finalStatus } = currentPosition;
    if (finalStatus.checkMate)
      return currentPosition.currentPlayer === Player.White ? Player.Black : Player.White;
    if (timeout)
      return currentPosition.currentPlayer === Player.White ? Player.Black : Player.White;
    if (resignedPlayer) return resignedPlayer === Player.White ? Player.Black : Player.White;
    return undefined;
  };

  const chessControls = {
    ...currentPosition,
    fen,
    finalStatus: {
      ...currentPosition.finalStatus,
      winner: getWinner(),
      gameOver: timeout || isGameOverBeforeTimeout,
      gameOverReason: getGameOverReason(
        currentPosition.finalStatus,
        timeout,
        drawn,
        !!resignedPlayer
      ),
    },
  };

  const startGame = (initialHistory: GameMove[]) => {
    const moves = initialHistory.map((move) => move.san);

    initializeGame(moves);

    const currentPosition = getCurrentPosition();

    if (history?.[0]?.whiteTime) {
      const { blackTime, whiteTime } = history[history.length - 1];
      setTimeLimit(history[0].whiteTime);
      timer.startTimer(whiteTime, blackTime, currentPosition.currentPlayer);
    }
    setCurrentPosition(getCurrentPosition());
  };

  const { history, addMoveToHistory, undoMoveInHistory, getLastMove, clearHistory } =
    useGameHistory(
      {
        san: '',
        whiteTime: timeLimit ?? 0,
        blackTime: timeLimit ?? 0,
        fen: getCurrentPosition().fen,
      },
      startGame
    );

  const displayNthMove = (n: number) => {
    if (history[n]) {
      const { fen } = history[n];
      setFen(fen);
    }
  };

  const undo = () => {
    undoMove();

    undoMoveInHistory();
    const lastMove = getLastMove();

    const newPosition = getCurrentPosition();

    setCurrentPosition(newPosition);

    if (timeLimit && lastMove)
      timer.updateTimer({
        whiteTime: lastMove.whiteTime,
        blackTime: lastMove.blackTime,
        currentPlayer: newPosition.currentPlayer,
      });
  };

  const makeChessMove = (move: ChessMove) => {
    if (timeout || drawn || resignedPlayer) return;

    const newMove = makeMove(move);
    if (newMove) {
      const newPosition = getCurrentPosition();

      addMoveToHistory({
        fen: newPosition.fen,
        whiteTime: timer.whiteTime,
        blackTime: timer.blackTime,
        san: newMove.san,
      });

      timer.toggleTimer();
      setCurrentPosition(newPosition);
    } else {
      setFen(currentPosition.fen);
    }
  };

  useLayoutEffect(() => {
    setFen(currentPosition.fen);
  }, [currentPosition.fen]);

  useEffect(() => {
    if (chessControls.finalStatus.gameOver) {
      clearHistory();
    }
  }, [chessControls.finalStatus.gameOver]);

  return {
    ...chessControls,
    makeChessMove,
    ...timer,
    ...actions,
    displayNthMove,
    undo,
    gameTimeLimit: timeLimit,
  };
};

export default useChessGame;
