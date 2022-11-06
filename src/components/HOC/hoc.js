import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  console.log(" *****in HOC");
  let lcStrg = localStorage.getItem("token");
  const tokenObject = JSON.parse(lcStrg);
  const isAuthenticated = tokenObject.token;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
