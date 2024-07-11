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
// prettier-ignore
const componentMap: Record<string, LazyExoticComponent> = {
  TopPage: lazy(() => import("@/routes/top-page")),
  CopyTrade: lazy(() => import("@/routes/copy-trade")),
  CopyTradeDetail: lazy(() => import("@/routes/copy-trade-detail")),
  SpotTrade: lazy(() => import("@/routes/spot")),
  FutureTrade: lazy(() => import("@/routes/future")),
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
    wrapper: {
      element: TradeWrapper as Wrapper,
    },
  },
  {
    path: "/trade/futures/:baseToken/:pairToken",
    element: "FutureTrade",
    wrapper: {
      element: TradeWrapper as Wrapper,
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
