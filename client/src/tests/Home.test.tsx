import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import axios from 'axios';

describe('Home Page', () => {
  test('renders without error', () => {
    render(<Home />);
    const homeElement = screen.getByTestId('home-page');
    expect(homeElement).toBeInTheDocument();
  });

  test('displays the header', () => {
    render(<Home />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('fetches and displays user cards', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        CPF: '123456789',
        phone: '1234567890',
        status: 'active',
      },
    ];
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockUsers });

    render(<Home />);
    const userCards = await screen.findAllByTestId('user-card');
    expect(userCards).toHaveLength(mockUsers.length);
  });
});
