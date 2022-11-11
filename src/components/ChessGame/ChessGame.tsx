import Chessboard from 'chessboardjsx';

import useChessGame from 'hooks/useChessGame';
import Actions from './components/Actions';
import Moves from './components/Moves';
import { Status } from './components/Status/Status';
import Timer from './components/Timer';

import { ChessMove } from 'hooks/useChessControl/types';

// https://chessboardjsx.com/
// https://github.com/willb335/chessboardjsx/issues/71
const ChessGame = ({
  timeLimit,
  onStartNewGame,
}: {
  timeLimit?: number;
  onStartNewGame: () => void;
}) => {
  const {
    fen,
    makeChessMove,
    history,
    currentPlayer,
    finalStatus,
    whiteTime,
    blackTime,
    resign,
    draw,
    undo,
    displayNthMove,
    gameTimeLimit,
  } = useChessGame({
    timeLimit,
  });

  const handleDrop = (move: ChessMove) => {
    makeChessMove(move);
  };

  const handleMoveClick = (move: number, undoMove?: boolean) => {
    displayNthMove(move);
    if (undoMove) {
      undo(history.length - move);
    }
  };

  const handleCalcWidth = ({
    screenWidth,
    screenHeight,
  }: {
    screenWidth: number;
    screenHeight: number;
  }) => {
    const minDimension = Math.min(screenWidth, screenHeight);
    return Math.min(560, minDimension - 48);
  };

  return (
    <div className='relative flex flex-wrap gap-8 m-4 justify-center'>
      <div className='self-start'>
        <Chessboard
          orientation='white'
          position={fen}
          onDrop={handleDrop}
          calcWidth={handleCalcWidth}
        />
      </div>

      <div className='flex flex-col gap-4 max-w-[600px] h-[560px] justify-center'>
        <div className='flex flex-col gap-4 gap-4 justify-center'>
          {!!gameTimeLimit && <Timer whiteTime={whiteTime} blackTime={blackTime} />}

          <Actions
            gameOver={finalStatus.gameOver}
            onStartNewGame={onStartNewGame}
            draw={draw}
            resign={resign}
            undo={undo}
            currentMoveIndex={history.length}
          />
        </div>

        <Status color={currentPlayer} status={finalStatus} winner={finalStatus.winner} />

        <div className='flex-grow'>
          <Moves history={history} onMoveClick={handleMoveClick} />
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
