import React, { lazy, Suspense } from 'react';
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import authStore from '@zeep/zustand/auth/';
import ErrorBoundary from './ErrorBoundary';
import { PUBLIC_ROUTE } from './route.constants';
import Loader from '@zeep/components/utility/loader';

const AppContainer = lazy(() => import('@zeep/containers/App/App'));

const publicRoutes = [
  {
    path: PUBLIC_ROUTE.LANDING,
    exact: true,
    component: lazy(() => import('@zeep/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import('@zeep/containers/Pages/404/404')),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import('@zeep/containers/Pages/500/500')),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import('@zeep/containers/Pages/SignIn/SignIn')),
  },
  {
    path: PUBLIC_ROUTE.FORGOT_PASSWORD,
    component: lazy(() =>
      import('@zeep/containers/Pages/ForgotPassword/ForgotPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@zeep/containers/Pages/ResetPassword/ResetPassword')
    ),
  },
  {
    path: PUBLIC_ROUTE.AUTH0_CALLBACK,
    component: lazy(() =>
      import('@zeep/containers/Authentication/Auth0/Auth0Callback')
    ),
  }
];
function PrivateRoute({ children, ...rest }) {
  const {isAuthenticated } = authStore();
  const isLoggedIn = isAuthenticated;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/dashboard">
              <AppContainer />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
