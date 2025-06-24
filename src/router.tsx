import { createRootRoute,createRoute,createRouter,Outlet } from '@tanstack/react-router';
import PrivateLayout from './components/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Inventory from './pages/Inventory';
import Finance from './pages/Finance';
import Projects from './pages/Projects';

//  Root Route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

//  Public Routes
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

//  Private Layout Route
const privateLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/app',
  component: PrivateLayout,
});


const dashboardRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: '/dashboard',
  component: Dashboard,
});

const employeesRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: '/employees',
  component: Employees,
});

const inventoryRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: '/inventory',
  component: Inventory,
});

const financeRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: '/finance',
  component: Finance,
});

const projectsRoute = createRoute({
  getParentRoute: () => privateLayoutRoute,
  path: '/projects',
  component: Projects,
});


const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  privateLayoutRoute.addChildren([
    dashboardRoute,
    employeesRoute,
    inventoryRoute,
    financeRoute,
    projectsRoute,
  ]),
]);


export const router = createRouter({ routeTree });


