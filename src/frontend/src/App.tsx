import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AppShell from './components/AppShell';
import OverviewPage from './pages/OverviewPage';
import BioPage from './pages/BioPage';
import LearningOutcomesPage from './pages/LearningOutcomesPage';
import TakeawaysPage from './pages/TakeawaysPage';
import ActivitiesPage from './pages/ActivitiesPage';
import Activity1LeadershipWordPage from './pages/Activity1LeadershipWordPage';
import Activity2ResilientLeadershipPage from './pages/Activity2ResilientLeadershipPage';
import ReferencesPage from './pages/ReferencesPage';

// Layout component that wraps all routes with AppShell
function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: OverviewPage,
});

const bioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bio',
  component: BioPage,
});

const learningOutcomesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning-outcomes',
  component: LearningOutcomesPage,
});

const takeawaysRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/takeaways',
  component: TakeawaysPage,
});

const activitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activities',
  component: ActivitiesPage,
});

const activity1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activities/leadership-word',
  component: Activity1LeadershipWordPage,
});

const activity2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activities/resilient-leadership',
  component: Activity2ResilientLeadershipPage,
});

const referencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/references',
  component: ReferencesPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  bioRoute,
  learningOutcomesRoute,
  takeawaysRoute,
  activitiesRoute,
  activity1Route,
  activity2Route,
  referencesRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
