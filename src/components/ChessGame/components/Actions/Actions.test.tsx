import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Actions from './Actions';

import { Player } from 'types/chess';
import { ActionsProps } from './Actions.types';

const renderLayout = (props: ActionsProps) => render(<Actions {...props} />);

describe('Actions', () => {
  it('should render new game button and invoke start new game', async () => {
    const mockCallback = jest.fn();

    renderLayout({
      gameOver: true,
      onStartNewGame: mockCallback,
      draw: jest.fn(),
      resign: jest.fn(),
    });

    await userEvent.click(screen.getByRole('button', { name: /new game/i }));
    expect(mockCallback).toBeCalledTimes(1);
  });

  it('should invoke draw when clicked', async () => {
    const mockCallback = jest.fn();

    renderLayout({
      gameOver: false,
      onStartNewGame: jest.fn(),
      draw: mockCallback,
      resign: jest.fn(),
    });

    await userEvent.click(screen.getByRole('button', { name: /draw/i }));
    expect(mockCallback).toBeCalledTimes(1);
  });

  it('should allow white to resign', async () => {
    const mockCallback = jest.fn();

    renderLayout({
      gameOver: false,
      onStartNewGame: jest.fn(),
      draw: jest.fn(),
      resign: mockCallback,
    });

    await userEvent.click(screen.getByRole('button', { name: /white resign/i }));
    expect(mockCallback).toBeCalledWith(Player.White);
  });

  it('should allow black to resign', async () => {
    const mockCallback = jest.fn();

    renderLayout({
      gameOver: false,
      onStartNewGame: jest.fn(),
      draw: jest.fn(),
      resign: mockCallback,
    });

    await userEvent.click(screen.getByRole('button', { name: /black resign/i }));
    expect(mockCallback).toBeCalledWith(Player.Black);
  });
});
