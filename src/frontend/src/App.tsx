import { StrictMode } from 'react';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppShell from './components/AppShell';
import OverviewPage from './pages/OverviewPage';
import BioPage from './pages/BioPage';
import LearningOutcomesPage from './pages/LearningOutcomesPage';
import TakeawaysPage from './pages/TakeawaysPage';
import ActivitiesPage from './pages/ActivitiesPage';
import Activity1LeadershipWordPage from './pages/Activity1LeadershipWordPage';
import Activity2ResilientLeadershipPage from './pages/Activity2ResilientLeadershipPage';
import SessionOutlinePage from './pages/SessionOutlinePage';
import ReferencesPage from './pages/ReferencesPage';
import SlidesPage from './pages/SlidesPage';
import MovieReferencesPage from './pages/MovieReferencesPage';
import LeadershipBoardPage from './pages/LeadershipBoardPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const rootRoute = createRootRoute({
  component: AppShell,
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
  path: '/activity-1',
  component: Activity1LeadershipWordPage,
});

const activity2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/activity-2',
  component: Activity2ResilientLeadershipPage,
});

const sessionOutlineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/session-outline',
  component: SessionOutlinePage,
});

const referencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/references',
  component: ReferencesPage,
});

const slidesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/slides',
  component: SlidesPage,
});

const movieReferencesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie-references',
  component: MovieReferencesPage,
});

const leadershipBoardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leadership-board',
  component: LeadershipBoardPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  bioRoute,
  learningOutcomesRoute,
  takeawaysRoute,
  activitiesRoute,
  activity1Route,
  activity2Route,
  sessionOutlineRoute,
  referencesRoute,
  slidesRoute,
  movieReferencesRoute,
  leadershipBoardRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
