import routes from "@/router";
import { resolver, theme } from "@/styles/theme/mantine-theme";
import { Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

import axios from "@/services/apis/axios";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    if (localStorage.__TOKEN__) {
      axios
        .get("/api/me")
        .then((res) => {
          if (res.data.code !== 0) {
            delete localStorage.__TOKEN__;
            delete sessionStorage.__TOKEN__;
          }
        })
        .catch(() => {
          delete localStorage.__TOKEN__;
          delete sessionStorage.__TOKEN__;
        })
        .finally(() => {
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  }, [loaded]);

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
