import { useEffect, useState } from 'react';
import { FaBackward, FaFastBackward, FaFastForward, FaForward } from 'react-icons/fa';

import Button from 'components/Button';
import { MovesProps } from './Moves.types';

const formattedMoves = (moves: string[]) => {
  const group = [];

  for (let i = 0; i < moves.length; i += 2) {
    group.push({
      sl: i / 2 + 1,
      w: moves[i],
      b: moves[i + 1] ?? '',
    });
  }

  return group;
};

const Moves = ({ history, onMoveClick }: MovesProps) => {
  const [currentMove, setCurrentMove] = useState(0);
  const [undoMove, setUndoMove] = useState(false);

  const handleNavigateClick = (moveNo: number) => {
    setCurrentMove(moveNo);
    onMoveClick(moveNo, undoMove);
  };

  const moves = formattedMoves(history);

  useEffect(() => {
    setCurrentMove(history.length);
  }, [history]);

  return (
    <div className='flex flex-col gap-4 flex-grow max-w-full'>
      <p>
        Click on a move to view the state. If undo box is checked it undo the move, resetting game
        progress. To undo / takeback the move, press undo button.
      </p>
      <div className='form-check'>
        <input
          className='h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
          type='checkbox'
          id='undoMoves'
          onChange={(evt) => setUndoMove(evt.target.checked)}
          checked={undoMove}
        />
        <label className='form-check-label inline-block text-gray-800' htmlFor='undoMoves'>
          Move back with undo
        </label>
      </div>

      <div className='max-h-[344px] overflow-auto' role='table'>
        {moves.map((move, index) => (
          <div
            role='row'
            key={index}
            className='grid grid-cols-3 gap-2 border-b border-gray-300 p-2 justify-center items-center'>
            <div role='cell'>{move.sl}</div>
            <div
              role='button'
              onClick={() => handleNavigateClick(move.sl * 2 - 1)}
              className={`p-1 ${move.sl * 2 - 1 === currentMove ? 'bg-gray-300' : ''}`}>
              {move.w}
            </div>
            <div
              role='button'
              onClick={() => handleNavigateClick(move.sl * 2)}
              className={`p-1 ${move.sl * 2 === currentMove ? 'bg-gray-300' : ''}`}>
              {move.b}
            </div>
          </div>
        ))}
      </div>

      <div className='flex gap-4 justify-center'>
        <Button
          variant='secondary'
          title='Fast Backward'
          disabled={currentMove === 0}
          onClick={() => handleNavigateClick(0)}>
          <FaFastBackward />
        </Button>
        <Button
          variant='secondary'
          title='Backward'
          disabled={currentMove === 0}
          onClick={() => handleNavigateClick(currentMove - 1)}>
          <FaBackward />
        </Button>
        <Button
          variant='secondary'
          title='Forward'
          disabled={currentMove === history.length}
          onClick={() => handleNavigateClick(currentMove + 1)}>
          <FaForward />
        </Button>
        <Button
          variant='secondary'
          title='Fast Forward'
          disabled={currentMove === history.length}
          onClick={() => handleNavigateClick(history.length)}>
          <FaFastForward />
        </Button>
      </div>
    </div>
  );
};

export default Moves;
