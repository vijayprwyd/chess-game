import { render, screen } from '@testing-library/react';

import Moves from './Moves';
import { MovesProps } from './Moves.types';

const renderLayout = (props: MovesProps) => render(<Moves {...props} />);

describe('Moves', () => {
  it('should render moves', () => {
    renderLayout({
      history: ['e4', 'f5', 'd4', 'g5', 'Qh5#'],
      onMoveClick: jest.fn(),
    });

    expect(screen.getByRole('row', { name: /1 e4 f5/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /2 d4 g5/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /3 qh5#/i })).toBeInTheDocument();
  });
});
