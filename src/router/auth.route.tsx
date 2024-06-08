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
// prettier-ignore
const componentMap: Record<string, LazyExoticComponent> = {
  BlankPage: lazy(() => import("@/routes/blank-page")),
  TopPage: lazy(() => import("@/routes/top-page")),
  CopyTrade: lazy(() => import("@/routes/copy-trade")),
};

const configs: Config[] = [
  {
    path: "/copy-trade",
    element: "CopyTrade",
    wrapper: {
      element: ServiceWrapper as Wrapper,
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

function _buildRouteConfig(config: Config) {
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
