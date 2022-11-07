import useChessActions from 'hooks/useChessActions';
import useChessControl from 'hooks/useChessControl';
import useChessTimer from 'hooks/useChessTimer';

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

const useChessGame = ({ takeBack, timeLimit }: UseChessConfig): UseChessGameType => {
  const timer = useChessTimer({ timeLimit });
  const { timeout } = timer;

  const { makeMove, ...control } = useChessControl({ takeBack, timeout: timeout });

  const actions = useChessActions();
  const { drawn, resignedPlayer } = actions;

  const makeChessMove = (move: ChessMove) => {
    if (timeout || drawn || resignedPlayer) return;

    const newMove = makeMove(move);
    if (newMove) {
      timer.toggleTimer();
    }
  };

  const getWinner = () => {
    const { finalStatus } = control;
    if (finalStatus.checkMate)
      return control.currentPlayer === Player.White ? Player.Black : Player.White;
    if (timeout) return control.currentPlayer === Player.White ? Player.Black : Player.White;
    if (resignedPlayer) return resignedPlayer === Player.White ? Player.Black : Player.White;
    return undefined;
  };

  const chessControls = {
    ...control,
    finalStatus: {
      ...control.finalStatus,
      winner: getWinner(),
      gameOver: timeout || control.finalStatus.gameOver || drawn || !!resignedPlayer,
      gameOverReason: getGameOverReason(control.finalStatus, timeout, drawn, !!resignedPlayer),
    },
  };

  return {
    ...chessControls,
    makeChessMove,
    ...timer,
    ...actions,
  };
};

export default useChessGame;
