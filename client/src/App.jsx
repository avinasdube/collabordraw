import React from 'react';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';

import Layout from './layout/AppLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Room from './pages/Room/Room';
import Protection from './layout/AuthLayout';

function App() {

  const router = createHashRouter([
    {
      path: '/',
      element: (
        <Protection authentication={true}>
          <Layout />
        </Protection>
      ),
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/home',
          element: <Home />
        },
        {
          path: '/room/:roomName',
          element: <Room />
        }
      ]
    },
    {
      path: '/login',
      element: (
        <Protection authentication={false}>
          <Login />
        </Protection>
      )
    },
    {
      path: '/signup',
      element: (
        <Protection authentication={false}>
          <Signup />
        </Protection>
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
