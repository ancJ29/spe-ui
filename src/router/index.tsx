import { RouteConfig } from "@/types";
import { lazy } from "react";

type GenericProps = Record<string, unknown>;
type RFC = (props?: GenericProps) => React.JSX.Element;
type NoPropsRFC = () => React.JSX.Element;
type Wrapper = React.LazyExoticComponent<RFC>;
type LazyExoticComponent = React.LazyExoticComponent<NoPropsRFC>;
type Config = {
  path: string;
  authOnly?: boolean;
  guestOnly?: boolean;
  element: string | (() => JSX.Element);
  wrapper?: {
    element: Wrapper;
    props?: GenericProps;
  };
};

const AuthWrapper = lazy(() => import("@/layouts/AuthWrapper"));
const GuestWrapper = lazy(() => import("@/layouts/GuestWrapper"));
const ServiceWrapper = lazy(() => import("@/layouts/ServiceWrapper"));
const TradeWrapper = lazy(() => import("@/layouts/TradeWrapper"));
const HistoryWrapper = lazy(() => import("@/layouts/HistoryWrapper"));

// prettier-ignore
const componentMap: Record<string, LazyExoticComponent> = {
  BlankPage: lazy(() => import("@/routes/blank-page")),
  TopPage: lazy(() => import("@/routes/top-page")),
  CopyTrade: lazy(() => import("@/routes/copy-trade")),
  CopyTradeDetail: lazy(() => import("@/routes/copy-trade-detail")),
  Trade: lazy(() => import("@/routes/trade")),
  SpotTrade: lazy(() => import("@/routes/spot")),
  FutureTrade: lazy(() => import("@/routes/future")),
  Deposit: lazy(() => import("@/routes/deposit")),
  Wallet: lazy(() => import("@/routes/wallet")),
  WalletHistory: lazy(() => import("@/routes/walletHistories")),
  WalletHistorySwap: lazy(() => import("@/routes/walletHistories/swap")),
  WalletHistoryDeposit: lazy(() => import("@/routes/walletHistories/deposit")),
  WalletHistoryWithdraw: lazy(() => import("@/routes/walletHistories/withdraw")),
  WalletHistoryOthers: lazy(() => import("@/routes/walletHistories/others")),
  Login: lazy(() => import("@/routes/login")),
  SignUp: lazy(() => import("@/routes/sign-up")),
  ResetPassword: lazy(() => import("@/routes/reset-password")),
  ForgotPassword: lazy(() => import("@/routes/forgot-password")),
};

const configs: Config[] = [
  {
    path: "/copy-trading",
    element: "CopyTrade",
    wrapper: {
      element: ServiceWrapper as Wrapper,
    },
  },
  {
    path: "/copy-trading/:id",
    element: "CopyTradeDetail",
    wrapper: {
      element: ServiceWrapper as Wrapper,
    },
  },
  {
    path: "/trade/spot/:baseToken/:pairToken",
    element: "SpotTrade",
    authOnly: true,
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/trade/futures/:baseToken/:pairToken",
    element: "FutureTrade",
    authOnly: true,
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/wallet",
    element: "Wallet",
    authOnly: true,
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records",
    element: "WalletHistory",
    authOnly: true,
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/swap",
    element: "WalletHistorySwap",
    authOnly: true,
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/deposit",
    element: "WalletHistoryDeposit",
    authOnly: true,
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/withdraw",
    element: "WalletHistoryWithdraw",
    authOnly: true,
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/others",
    element: "WalletHistoryOthers",
    authOnly: true,
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },

  {
    path: "/user/assets/deposit",
    element: "Deposit",
    authOnly: true,
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/login",
    element: "Login",
    guestOnly: true,
  },
  {
    path: "/register",
    element: "SignUp",
    guestOnly: true,
  },
  {
    path: "/reset-password",
    element: "ResetPassword",
    guestOnly: true,
  },
  {
    path: "/forgot-password",
    element: "ForgotPassword",
    guestOnly: true,
  },
  {
    path: "/*",
    element: "TopPage",
    wrapper: {
      element: ServiceWrapper as Wrapper,
    },
  },
];

export default configs.map(_buildRouteConfig);

function _buildRouteConfig(config: Config): RouteConfig {
  const Component =
    typeof config.element === "string"
      ? componentMap[config.element]
      : config.element;

  let element = config.wrapper ? (
    <config.wrapper.element {...config.wrapper.props}>
      <Component />
    </config.wrapper.element>
  ) : (
    <Component />
  );
  if (config.authOnly) {
    element = <AuthWrapper>{element}</AuthWrapper>;
  } else if (config.guestOnly) {
    element = <GuestWrapper>{element}</GuestWrapper>;
  }
  return { path: config.path, element };
}
