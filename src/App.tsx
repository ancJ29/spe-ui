import routes from "@/router";
import getMe from "@/services/apis/get-me";
import { resolver, theme } from "@/styles/theme/mantine-theme";
import { Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useEffect, useMemo } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { useBoolean } from "usehooks-ts";
import useAuthStore from "./store/auth";
const App = () => {
  const { value: loaded, setTrue } = useBoolean(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    if (localStorage.__TOKEN__) {
      getMe()
        .then((me) => useAuthStore.getState().setMe(me))
        .catch(() => {
          useAuthStore.getState().logout();
        })
        .finally(() => {
          setTrue();
        });
    } else {
      setTrue();
    }
  }, [loaded, setTrue]);

  const routes = useMemo(() => {
    return _buildRoutes(loaded);
  }, [loaded]);

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
