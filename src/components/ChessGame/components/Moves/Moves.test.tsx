import { render, screen } from '@testing-library/react';
import { checkMateMoves } from 'mocks/chessMoves';
import Moves from './Moves';
import { MovesProps } from './Moves.types';

const renderLayout = (props: MovesProps) => render(<Moves {...props} />);

describe('Moves', () => {
  it('should render moves', () => {
    renderLayout({
      history: checkMateMoves.flat(),
    });

    expect(screen.getByRole('row', { name: /1 e2 e4/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /2 d4 g5/i })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /3 qh5#/i })).toBeInTheDocument();
  });
});
