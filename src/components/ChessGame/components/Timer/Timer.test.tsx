import { render, screen } from '@testing-library/react';

import Timer from './Timer';

const renderLayout = () => render(<Timer whiteTime={299} blackTime={150} />);

describe('Timer', () => {
  it('should render formatted time', () => {
    renderLayout();

    expect(screen.getByText('04:59')).toBeInTheDocument();
    expect(screen.getByText('02:30')).toBeInTheDocument();
  });
});
