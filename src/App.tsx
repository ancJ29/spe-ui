import authRoutes from "@/router/auth.route";
import guestRoutes from "@/router/guest.route";
import { resolver, theme } from "@/styles/theme/mantine-theme";
import { Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/notifications/styles.css";
import { useEffect, useMemo, useState } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { delay } from "./utils";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }
    delay(1000).then(() => {
      setLoaded(true);
    });
  }, [loaded]);

  const routes = useMemo(() => {
    const login = Boolean(localStorage.__USER__);
    return _buildRoutes(loaded, login);
  }, [loaded]);

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <ModalsProvider>{useRoutes(routes)}</ModalsProvider>
    </MantineProvider>
  );
};

export default App;

function _buildRoutes(loaded: boolean, login: boolean) {
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
  return login ? authRoutes : guestRoutes;
}
