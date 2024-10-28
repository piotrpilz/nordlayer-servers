import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndexView from './views/index'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Dashboard } from './views/Dashboard/Dashboard';
import { Login } from './views/Login/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexView/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
