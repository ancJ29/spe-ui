import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

const map = {
  Login: lazy(() => import("@/routes/login")),
  TopPage: lazy(() => import("@/routes/top-page")),
};
const routes: RouteObject[] = [
  {
    path: "/login",
    element: <map.Login />,
  },
  {
    path: "/top-page",
    element: <map.TopPage />
  },
  {
    path: "/*",
    element: <Navigate to="/login" />,
  },
];

export default routes;
