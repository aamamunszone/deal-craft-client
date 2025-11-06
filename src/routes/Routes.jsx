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
import Register from '../pages/Auth/Register/Register';
import MyBids from '../pages/Bids/MyBids/MyBids';
import CreateProduct from '../pages/Products/CreateProduct/CreateProduct';
import PrivateRoute from './PrivateRoute';
import ProductDetails from '../pages/Products/ProductDetails/ProductDetails';
import Loader from '../components/common/Loader/Loader';

export const router = createBrowserRouter([
  // MainLayout Routes
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: () => <Navigate to="home" replace /> },
      { path: 'home', Component: Home },
      { path: 'about', Component: About },
      { path: 'products/all', Component: AllProducts },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
    ],
  },

  // DashboardLayout Routes
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, Component: () => <Navigate to="products/user" replace /> },
      { path: 'products/user', Component: MyProducts },
      { path: 'bids/user', Component: MyBids },
      { path: 'products/create', Component: CreateProduct },
      {
        path: 'product/details/:id',
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        Component: ProductDetails,
        hydrateFallbackElement: () => <Loader />,
      },
    ],
  },

  //   AuthLayout Routes
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      { index: true, Component: () => <Navigate to="login" replace /> },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
    ],
  },
]);
