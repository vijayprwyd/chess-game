import Chessboard from 'chessboardjsx';
import { ChessMove } from 'hooks/useChessControl/types';
import useChessGame from 'hooks/useChessGame';

import Moves from './components/Moves';
import { Status } from './components/Status/Status';
import { Timer } from './components/Timer';

import Actions from './components/Actions';

const moves: string[][] = [];

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
  } = useChessGame({
    timeLimit,
  });

  const handleDrop = (move: ChessMove) => {
    makeChessMove(move);
    moves.push([move.sourceSquare, move.targetSquare, move.piece]);
  };

  return (
    <div className='relative flex flex-wrap gap-8 m-4'>
      <div className='self-center'>
        <Chessboard orientation='white' position={fen} onDrop={handleDrop} />
      </div>

      <div className='flex flex-col gap-4 w-[600px] h-[560px] justify-center'>
        <div className='flex flex-col gap-4 gap-4 justify-center'>
          {!!timeLimit && <Timer whiteTime={whiteTime} blackTime={blackTime} />}

          <Actions
            gameOver={finalStatus.gameOver}
            onStartNewGame={onStartNewGame}
            draw={draw}
            resign={resign}
          />
        </div>

        <Status color={currentPlayer} status={finalStatus} winner={finalStatus.winner} />

        <div className='flex-grow'>
          <Moves history={history} />
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
