import { RouteConfig } from "@/types";
import { lazy } from "react";

type GenericProps = Record<string, unknown>;
type RFC = (props?: GenericProps) => React.JSX.Element;
type NoPropsRFC = () => React.JSX.Element;
type Wrapper = React.LazyExoticComponent<RFC>;
type LazyExoticComponent = React.LazyExoticComponent<NoPropsRFC>;
type Config = {
  path: string;
  element: string | (() => JSX.Element);
  wrapper?: {
    element: Wrapper;
    props?: GenericProps;
  };
};

// prettier-ignore
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
};

const configs: Config[] = [
  {
    path: "/wallet",
    element: "Wallet",
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records",
    element: "WalletHistory",
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
    
  },
  {
    path: "/wallet/records/swap",
    element: "WalletHistorySwap",
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
    
  },
  {
    path: "/wallet/records/deposit",
    element: "WalletHistoryDeposit",
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/withdraw",
    element: "WalletHistoryWithdraw",
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },
  {
    path: "/wallet/records/others",
    element: "WalletHistoryOthers",
    wrapper: {
      element: HistoryWrapper as Wrapper,
    },
  },

  {
    path: "/user/assets/deposit",
    element: "Deposit",
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
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
  return {
    path: config.path,
    element: config.wrapper ? (
      <config.wrapper.element {...config.wrapper.props}>
        <Component />
      </config.wrapper.element>
    ) : (
      <Component />
    ),
  };
}
