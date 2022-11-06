import { render } from '@testing-library/react';
import Play from './Play';

const renderLayout = () => render(<Play />);

describe('Play', () => {
  it('should render start game form', () => {
    renderLayout();
  });

  /* it('should render chess board on start click', () => {});*/
});
