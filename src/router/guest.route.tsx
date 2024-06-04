import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const map = {
  Login: lazy(() => import("@/routes/login")),
  SignUp: lazy(() => import("@/routes/sign-up")),
  ResetPassword: lazy(() => import("@/routes/reset-password")),
  ForgotPassword: lazy(() => import("@/routes/forgot-password")),
  TopPage: lazy(() => import("@/routes/top-page")),
};
const routes: RouteObject[] = [
  {
    path: "/login",
    element: <map.Login />,
  },
  {
    path: "/register",
    element: <map.SignUp />,
  },
  {
    path: "/reset-password",
    element: <map.ResetPassword />,
  },
  {
    path: "/forgot-password",
    element: <map.ForgotPassword />,
  },
  {
    path: "/top-page",
    element: <map.TopPage />,
  },
  {
    path: "/*",
    element: <map.TopPage />,
  },
];

export default routes;
