import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('Test App', () => {
  it('render App', () => {
    render(<App />);
    const text = screen.getByText(/PhoenixGraphiQL/i);
    expect(window.location.pathname).toEqual('/');
    expect(text).toBeInTheDocument();
  });
});
