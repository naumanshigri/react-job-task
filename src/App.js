import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import ProtectedRoute from "./components/HOC/hoc";

import Header from "./components/layout/header";
import Dashboard from "./components/dashboard/dashboard";

import AddCar from "./components/car/add-car.component";
import EditCar from "./components/car/edit-car.component";

import AddCategory from "./components/categories/add-categories.component";
import EditCategory from "./components/categories/edit-categories.component";

import Login from "./components/user/login.component";
import SignUp from "./components/user/signup.component";

function App() {
  let user = localStorage.getItem("user");
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/addcar"
            element={
              <ProtectedRoute user={user}>
                <AddCar />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/updatecar"
            element={
              <ProtectedRoute user={user}>
                <EditCar />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/addcategory"
            element={
              <ProtectedRoute user={user}>
                <AddCategory />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/updatecategory"
            element={
              <ProtectedRoute user={user}>
                <EditCategory />
              </ProtectedRoute>
            }
          />

          {/* <ProtectedRoute exact path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
