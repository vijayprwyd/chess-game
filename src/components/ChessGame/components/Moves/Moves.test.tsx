import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Moves from './Moves';
import { MovesProps } from './Moves.types';

const renderLayout = (props: MovesProps) => render(<Moves {...props} />);

const defaultProps = {
  history: ['e4', 'f5', 'd4', 'g5', 'Qh5#'],
  onMoveClick: jest.fn(),
};

describe('Moves', () => {
  it('should render moves', () => {
    renderLayout(defaultProps);

    expect(screen.getByRole('row', { name: /1 e4 f5/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /2 d4 g5/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /3 qh5#/i })).toBeInTheDocument();
  });

  it('should navigate on fast backward click', async () => {
    renderLayout(defaultProps);

    await userEvent.click(screen.getByRole('button', { name: /fast backward/i }));
    expect(defaultProps.onMoveClick).toBeCalledWith(0, false);
  });
});
