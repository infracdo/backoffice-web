import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@zeep/components/utility/loader';

const routes = [
  {
    path: "",
    component: lazy(() => import("@zeep/modules/Dashboard")),
    exact:true
  },
  {
    path: "router",
    component: lazy(() => import("@zeep/modules/Router/list"))
  },
  {
    path: "tier",
    component: lazy(() => import("@zeep/modules/Tier/list"))
  },
  {
    path: "user",
    component: lazy(() => import("@zeep/modules/User/list"))
  }
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
