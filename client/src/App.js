import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import React from 'react';

import Layout from './layout/AppLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Protected from './layout/AuthLayout';

function App() {

  const router = createHashRouter([
    {
      path: '/',
      element: (
        <Protected authentication={true}>
          <Layout />
        </Protected>
      ),
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
      element: (
        <Protected authentication={false}>
          <Login />
        </Protected>
      )
    },
    {
      path: '/signup',
      element: (
        <Protected authentication={false}>
          <Signup />
        </Protected>
      )
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
