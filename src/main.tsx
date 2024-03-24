import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Login from './components/forms/forms/auth/Login.tsx';
import SignUp from './components/forms/forms/auth/SignUp.tsx';
import AdminView from './AdminView.tsx';
import CourseView from './CourseView.tsx';
import ClientView from './ClientView.tsx';
import ProtectedRoute from './ProtectedRoutes.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientView />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<AdminView />} />,
  },
  {
    path: "/course/:courseId",
    element: <CourseView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
