import Button from 'components/Button';

import { Player } from 'types/chess';
import { ActionsProps } from './Actions.types';

const Actions = ({ gameOver, onStartNewGame, draw, resign }: ActionsProps) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {gameOver ? (
        <Button onClick={onStartNewGame}>New Game</Button>
      ) : (
        <>
          <Button onClick={draw}>Offer Draw</Button>
          <Button onClick={() => resign(Player.White)}>White Resign</Button>
          <Button onClick={() => resign(Player.Black)}>Black Resign</Button>
        </>
      )}
    </div>
  );
};

export default Actions;