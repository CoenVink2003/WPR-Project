import { render, screen } from '@testing-library/react';
import Register from './Employee/Register/Register';

test('renders learn react link', () => {
  render(<Register />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
