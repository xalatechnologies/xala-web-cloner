import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from '@/pages/Index';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminResetPassword from '@/pages/admin/AdminResetPassword';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import ErrorBoundary from '@/components/error/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin',
    element: <AdminLogin />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin/reset-password',
    element: <AdminResetPassword />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <NotFound />,
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;