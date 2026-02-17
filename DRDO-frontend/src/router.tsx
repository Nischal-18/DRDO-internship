import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';

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
]);

export default router;
