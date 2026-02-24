import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { ProtectedRoute, AdminRoute } from '@/components/common';

// Public pages
import Home from '@/pages/public/Home';
import About from '@/pages/public/About';
import VisionMission from '@/pages/public/VisionMission';
import Research from '@/pages/public/Research';
import Labs from '@/pages/public/Labs';
import Technology from '@/pages/public/Technology';
import Projects from '@/pages/public/Projects';
import News from '@/pages/public/News';
import Careers from '@/pages/public/Careers';
import Tenders from '@/pages/public/Tenders';
import Contact from '@/pages/public/Contact';

// Auth pages
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { Dashboard } from '@/pages/auth/Dashboard';

// Admin pages
import { AdminDashboard, ApplicationList, ApplicationDetail, UserList } from '@/pages/admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'vision-mission',
        element: <VisionMission />,
      },
      {
        path: 'research',
        element: <Research />,
      },
      {
        path: 'labs',
        element: <Labs />,
      },
      {
        path: 'technology',
        element: <Technology />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'news',
        element: <News />,
      },
      {
        path: 'careers',
        element: <Careers />,
      },
      {
        path: 'tenders',
        element: <Tenders />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
  // Auth routes (outside PublicLayout)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  // Admin routes
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'applications',
        element: <ApplicationList />,
      },
      {
        path: 'applications/:id',
        element: <ApplicationDetail />,
      },
      {
        path: 'users',
        element: <UserList />,
      },
    ],
  },
]);

export default router;
