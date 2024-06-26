import { lazy } from "react";
import { type RouteObject } from "react-router-dom";

const map = {
  Trade: lazy(() => import("@/routes/trade")),
  SpotTrade: lazy(() => import("@/routes/spot")),
  FuturesTrade: lazy(() => import("@/routes/future")),
  Login: lazy(() => import("@/routes/login")),
  SignUp: lazy(() => import("@/routes/sign-up")),
  ResetPassword: lazy(() => import("@/routes/reset-password")),
  ForgotPassword: lazy(() => import("@/routes/forgot-password")),
  TopPage: lazy(() => import("@/routes/top-page")),
  CopyTrade: lazy(() => import("@/routes/copy-trade")),
  CopyTradeDetail: lazy(() => import("@/routes/copy-trade-detail")),
};
const routes: RouteObject[] = [
  {
    path: "/trade",
    element: <map.Trade />,
  },
  {
    path: "/login",
    element: <map.Login />,
  },
  {
    path: "/copy-trading",
    element: <map.CopyTrade />,
  },
  {
    path: "/copy-trading/:id",
    element: <map.CopyTradeDetail />,
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
    path: "/trade/:baseToken/:pairToken",
    element: <map.Trade/>,
  },
  {
    path: "/trade/spot/:baseToken/:pairToken",
    element: <map.SpotTrade/>,
  },
  {
    path: "/trade/futures/:baseToken/:pairToken",
    element: <map.FuturesTrade/>,
  },
  {
    path: "/*",
    element: <map.TopPage />,
  },
];

export default routes;
