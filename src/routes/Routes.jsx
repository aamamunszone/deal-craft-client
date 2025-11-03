import { createBrowserRouter, Navigate } from 'react-router';
import MainLayout from '../layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import MyProducts from '../pages/Products/MyProducts/MyProducts';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import About from '../pages/About/About';
import AllProducts from '../pages/Products/AllProducts/AllProducts';
import Services from '../pages/Services/Services';
import Contact from '../pages/Contact/Contact';

export const router = createBrowserRouter([
  // MainLayout Routes
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: () => <Navigate to="home" replace /> },
      { path: 'home', Component: Home },
      { path: 'about', Component: About },
      { path: 'all-products', Component: AllProducts },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
    ],
  },

  // DashboardLayout Routes
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      { index: true, Component: () => <Navigate to="my-products" replace /> },
      { path: 'my-products', Component: MyProducts },
    ],
  },

  //   AuthLayout Routes
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { index: true, Component: () => <Navigate to="login" replace /> },
      { path: 'login', Component: Login },
    ],
  },
]);
