import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LayoutPage from '../../src/pages/LayoutPage/LayoutPage';

jest.mock('react-firebase-hooks/auth', () => ({
  useAuthState: jest.fn().mockReturnValue([null, false, null]),
}));

jest.mock('/src/assets/img/rs-school-js_.svg', () => ({
  rss: jest.fn().mockReturnValue('/src/assets/img/rs-school-js_'),
}));

jest.mock('/src/assets/img/rs-school-js_blue.svg', () => ({
  rssHovered: jest.fn().mockReturnValue('/src/assets/img/rs-school-js_blue'),
}));

describe('Test LayoutPage', () => {
  it('click Sign In', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    const signInBtn = screen.getByText(/Sign In/i);
    const user = userEvent.setup();
    user.click(signInBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/login');
    });
  });
  it('click Sign Up', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    const signUpBtn = screen.getByText(/Sign Up/i);
    const user = userEvent.setup();
    user.click(signUpBtn);
    await waitFor(() => {
      expect(window.location.pathname).toEqual('/registration');
    });
  });
  it('check rss icon hover', async () => {
    render(
      <BrowserRouter>
        <LayoutPage />
      </BrowserRouter>
    );
    const rssIcon = screen.getByTestId('rss-icon');
    const initialSrc = rssIcon.getAttribute('src');
    fireEvent.mouseEnter(rssIcon);
    const hoveredSrc = rssIcon.getAttribute('src');
    expect(hoveredSrc).toEqual(initialSrc);
    fireEvent.mouseLeave(rssIcon);
    const leavedSrc = rssIcon.getAttribute('src');
    expect(leavedSrc).toEqual(initialSrc);
  });
});
