import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pagas/Home";
import { Login } from "../pagas/Login";
import { Register } from "../pagas/Register";
import PrivateRoute from "./PrivateRoute";
import { TodayTask } from "../pagas/TodayTask";
import { ImportentTask } from "../pagas/ImportentTask";
import { PlanedTask } from "../pagas/PlanedTask";
import { AssignedTask } from "../pagas/AssignedTask";
import { PendingTask } from "../pagas/PendingTask";

// 🔹 Public Routes Array
const publicRoutes = [
  { path: "/", element: Home },
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];

// 🔹 Private Routes Array
const privateRoutes = [
  { path: "/today", element: TodayTask },
  { path: "/important", element: ImportentTask },
  { path: "/planned", element: PlanedTask },
  { path: "/assigned", element: AssignedTask },
  { path: "/pending", element: PendingTask },
];

export const AllRoute = ({ isRightBar, toggleRightBar, isLeftBar }) => {
  return (
    <Routes>
      {/* 🔹 Public Routes */}
      {publicRoutes.map(({ path, element: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            path === "/" ? (
              <Home
                isRightBar={isRightBar}
                toggleRightBar={toggleRightBar}
                isLeftBar={isLeftBar}
              />
            ) : (
              <Component />
            )
          }
        />
      ))}

      {/* 🔹 Private Routes */}
      {privateRoutes.map(({ path, element: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute>
              <Component />
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
};
