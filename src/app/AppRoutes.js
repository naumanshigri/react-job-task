import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import ProtectedRoute from "../app/component/HOC/hoc";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./component/dashboard/Dashboard"));

const UserList = lazy(() => import("./component/user/userList.compnent"));

const UniversityCreate = lazy(() => import("./component/university"));
const UniversityList = lazy(() =>
  import("./component/university/universities")
);
const UniversityDetail = lazy(() => import("./component/university/details"));

const Login = lazy(() => import("./user-pages/Login"));
const Register = lazy(() => import("./user-pages/Register"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />

          <ProtectedRoute path="/user/list" component={UserList} />

          <ProtectedRoute
            path="/university/create"
            component={UniversityCreate}
          />
          <ProtectedRoute path="/university/list" component={UniversityList} />
          <ProtectedRoute
            path="/university/detail"
            component={UniversityDetail}
          />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Redirect to="/login" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
