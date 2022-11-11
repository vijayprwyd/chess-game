import Button from 'components/Button';
import { ActionsProps } from './Actions.types';

import { Player } from 'types/chess';

const Actions = ({
  gameOver,
  onStartNewGame,
  draw,
  resign,
  undo,
  currentMoveIndex,
}: ActionsProps) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {gameOver ? (
        <Button onClick={onStartNewGame}>New Game</Button>
      ) : (
        <>
          <Button onClick={() => draw()}>Offer Draw</Button>
          <Button onClick={() => resign(Player.White)}>White Resign</Button>
          <Button onClick={() => resign(Player.Black)}>Black Resign</Button>
          <Button onClick={() => undo()} disabled={currentMoveIndex === 0}>
            Undo
          </Button>
        </>
      )}
    </div>
  );
};

export default Actions;
