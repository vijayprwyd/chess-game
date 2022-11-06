import { render, screen } from '@testing-library/react';
import { GameOverReason, Player } from 'types/chess';
import { Status } from './Status';
import { StatusProps } from './Status.types';

const renderLayout = (props: StatusProps) => render(<Status {...props} />);

const status = {
  checkMate: true,
  staleMate: false,
  threefoldRepetition: false,
  isInsufficientMaterial: false,
  gameOver: true,
  gameOverReason: GameOverReason.CheckMate,
  winner: Player.White,
};

describe('Status', () => {
  it('should render checkmate status', () => {
    renderLayout({
      color: 'black',
      status,
      winner: Player.White,
    });

    expect(screen.getByText(/status: check mate, winner white/i)).toBeInTheDocument();
  });

  it('should render checkmate status', () => {
    renderLayout({
      color: 'black',
      status: {
        ...status,
        staleMate: true,
        checkMate: false,
        gameOverReason: GameOverReason.StaleMate,
      },
    });

    expect(screen.getByText(/status: draw, stale mate/i)).toBeInTheDocument();
  });
});
