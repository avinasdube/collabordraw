import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import React, { useEffect } from 'react';

import Layout from './layout/AppLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Protected from './layout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from './reducers/authSlice';

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const status = useSelector((state) => state.auth.status);
  //const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!currentUser && status === 'idle') {
      dispatch(fetchUserDetails());
    }
  }, [currentUser, status, dispatch]);

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
