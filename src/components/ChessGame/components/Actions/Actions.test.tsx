import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Actions from './Actions';
import { ActionsProps } from './Actions.types';

import { Player } from 'types/chess';

const renderLayout = (props: ActionsProps) => render(<Actions {...props} />);

const defaultProps = {
  gameOver: true,
  onStartNewGame: jest.fn(),
  draw: jest.fn(),
  resign: jest.fn(),
  undo: jest.fn(),
  currentMoveIndex: 2,
};

describe('Actions', () => {
  it('should render new game button and invoke start new game', async () => {
    renderLayout(defaultProps);

    await userEvent.click(screen.getByRole('button', { name: /new game/i }));
    expect(defaultProps.onStartNewGame).toBeCalledTimes(1);
  });

  it('should invoke draw when clicked', async () => {
    renderLayout({
      ...defaultProps,
      gameOver: false,
    });

    await userEvent.click(screen.getByRole('button', { name: /draw/i }));
    expect(defaultProps.draw).toBeCalledTimes(1);
  });

  it('should allow white to resign', async () => {
    renderLayout({
      ...defaultProps,
      gameOver: false,
    });

    await userEvent.click(screen.getByRole('button', { name: /white resign/i }));
    expect(defaultProps.resign).toBeCalledWith(Player.White);
  });

  it('should allow black to resign', async () => {
    renderLayout({
      ...defaultProps,
      gameOver: false,
    });

    await userEvent.click(screen.getByRole('button', { name: /black resign/i }));
    expect(defaultProps.resign).toBeCalledWith(Player.Black);
  });

  it('should invoke undo', async () => {
    renderLayout({
      ...defaultProps,
      gameOver: false,
      currentMoveIndex: 2,
    });

    await userEvent.click(screen.getByRole('button', { name: /undo/i }));
    expect(defaultProps.undo).toBeCalledTimes(1);
  });

  it('should disable undo when no moves are made', async () => {
    renderLayout({
      ...defaultProps,
      gameOver: false,
      currentMoveIndex: 0,
    });

    const undoButton = screen.getByRole('button', { name: /undo/i });
    expect(undoButton).toBeDisabled();

    await userEvent.click(undoButton);
    expect(defaultProps.undo).toBeCalledTimes(0);
  });
});
