import routes from "@/router";
import { getMe } from "@/services/apis";
import { resolver, theme } from "@/styles/theme/mantine-theme";
import { Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useEffect, useMemo } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { useBoolean } from "usehooks-ts";
import useSPEInterval from "./hooks/useSPEInterval";
import logger from "./services/logger";
import { assetStore } from "./store/assets";
import authStore from "./store/auth";
import {
  default as tradeStore,
  default as useTradeStore,
} from "./store/trade";
import { ONE_MINUTE } from "./utils";

async function _getMe(retry = 3) {
  try {
    await getMe().then((me) => authStore.getState().setMe(me));
  } catch (e) {
    if (retry > 0) {
      await _getMe(retry - 1);
      return;
    }
    authStore.getState().logout();
    throw e;
  }
}
const App = () => {
  const { value: loaded, setTrue } = useBoolean(false);

  useSPEInterval(_loadPrices, 10e3, true);

  useEffect(() => {
    if (loaded) {
      return;
    }
    if (localStorage.__TOKEN__) {
      _getMe()
        .catch((e) => {
          logger.error(e);
        })
        .finally(() => {
          setTrue();
          _loadPrices();
        });
    } else {
      setTrue();
      _loadPrices();
    }
  }, [loaded, setTrue]);

  const routes = useMemo(() => {
    return _buildRoutes(loaded);
  }, [loaded]);

  useSPEInterval(() => {
    tradeStore.getState().loadAllMarketInformation();
  }, ONE_MINUTE);

  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="dark"
    >
      <ModalsProvider>{useRoutes(routes)}</ModalsProvider>
      <Notifications />
    </MantineProvider>
  );
};

export default App;

function _buildRoutes(loaded: boolean) {
  if (!loaded) {
    return [
      {
        path: "/*",
        element: (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
            }}
          >
            <Loader />
          </div>
        ),
      } as RouteObject,
    ];
  }
  return routes;
}

function _loadPrices() {
  useTradeStore.getState().loadSymbols();
  tradeStore.getState().loadMarketPrices();
  assetStore
    .getState()
    .fetchAccounts()
    .then(() => {
      assetStore.getState().fetchBalances();
    });
}
