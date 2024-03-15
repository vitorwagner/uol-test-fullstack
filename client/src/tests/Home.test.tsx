import { render, screen } from '@testing-library/react';
import App from '../App';

it('should show "User Dashboard" text', () => {
  render(<App />);
  expect(screen.getByText('User Dashboard')).toBeInTheDocument();
});
