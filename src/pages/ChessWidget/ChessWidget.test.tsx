import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ChessWidget from './ChessWidget';

const renderLayout = () => render(<ChessWidget />);

describe('Play', () => {
  it('should render start game form', () => {
    renderLayout();

    [1, 3, 5, 10].forEach((duration) =>
      expect(screen.getByRole('button', { name: `${duration} min` })).toBeInTheDocument()
    );
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });

  it('should render chessboard on clicking start game', async () => {
    renderLayout();

    await userEvent.click(screen.getByRole('button', { name: /start game/i }));
    expect(screen.getByRole('button', { name: /offer draw/i })).toBeInTheDocument();
  });

  it('should render form on clicking new game', async () => {
    renderLayout();

    await userEvent.click(screen.getByRole('button', { name: /start game/i }));

    expect(screen.queryByRole('button', { name: /start game/i })).toBeNull();

    await userEvent.click(screen.getByRole('button', { name: /offer draw/i }));
    await userEvent.click(screen.getByRole('button', { name: /new game/i }));

    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
  });
});
