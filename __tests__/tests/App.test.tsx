import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([
    {
      user: {
        displayName: 'John Doe',
        email: 'johndoe@example.com',
      },
      loading: false,
      error: null,
    },
  ]),
}));

describe('Test App', () => {
  it('render App', () => {
    render(<App />);
    expect(window.location.pathname).toEqual('/');
  });
});
