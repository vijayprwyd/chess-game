import { StatusProps } from './Status.types';

import { GameOverReason, Player } from 'types/chess';

const getGameStatus = (gameOverReason: GameOverReason | undefined, winner?: Player) => {
  switch (gameOverReason) {
    case GameOverReason.CheckMate:
      return `Check Mate,  Winner ${winner}`;

    case GameOverReason.StaleMate:
      return 'Draw, Stale Mate';

    case GameOverReason.InsufficientMaterial:
      return 'Draw, Insufficient material';

    case GameOverReason.ThreeFoldRepetition:
      return 'Draw, Threefold repitition';

    case GameOverReason.Timeout:
      return `Time out, ${winner} wins`;

    case GameOverReason.DrawByAgreement:
      return `Game Drawn by mutual agreement`;

    case GameOverReason.Resined:
      return `${winner} won by resignation`;
  }

  return 'In Progress';
};

export const Status = ({ color, status, winner }: StatusProps) => (
  <div className='text-xl gap-4 font-bold flex flex-wrap'>
    <span className='font-bold capitalize'>Move: {color} </span>
    <span className='font-bold capitalize'>
      Status: {getGameStatus(status.gameOverReason, winner)}
    </span>
  </div>
);
