import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Layout from './layout/AppLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

test('renders home page by default', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ], { initialEntries: ['/'] });

  render(<RouterProvider router={router} />);
  
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});

test('renders login page', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ], { initialEntries: ['/login'] });

  render(<RouterProvider router={router} />);

  // Use getAllByText and assert the correct element
  const loginElements = screen.getAllByText(/login/i);
  expect(loginElements[0]).toBeInTheDocument();
});

test('renders signup page', () => {
  const router = createMemoryRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        }
      ]
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    }
  ], { initialEntries: ['/signup'] });

  render(<RouterProvider router={router} />);

  // Use getAllByText and assert the correct element
  const signupElements = screen.getAllByText(/signup/i);
  expect(signupElements[0]).toBeInTheDocument();
});
