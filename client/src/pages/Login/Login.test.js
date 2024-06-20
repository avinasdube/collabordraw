import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

import Login from './Login';

test('renders Login component correctly', () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    // check for the form container
    const formContainer = screen.getByTestId('form');
    expect(formContainer).toBeInTheDocument();

    // check fot the Logo component (assuming Logo component renders an image or has some text)
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();

    // check for the form heading
    const formHeading = screen.getByText(/Login to collabordraw/i);
    expect(formHeading).toBeInTheDocument();

    // check for email input
    const emailInput = screen.getByPlaceholderText('Enter your email id');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');

    // Check for password input
    const passwordInput = screen.getByPlaceholderText('Enter password');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Check for login button
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();

    // Check for signup link
    const signupLink = screen.getByRole('link', { name: /Signup/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
})

test('renders signup message correctly', () => {
    render(
        <Router>
            <Login />
        </Router>
    );

    // Check for the message asking if the user is not signed up yet
    const message = screen.getByText(/Not signed up yet \? Click here to/i);
    expect(message).toBeInTheDocument();
});