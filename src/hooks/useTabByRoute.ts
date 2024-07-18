import { useCallback, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

export function useTabByRoute(defaultTab = "", basePath = "") {
  const location = useLocation();
  const [tab, setTab] = useState<string | null>(defaultTab);
  const setTabByRoute = useCallback(() => {
    const f = location.pathname.split("/");
    const tab = f[f.length - 1];
    const isIndex = Boolean(
      matchPath(`${basePath}/${defaultTab}`, location.pathname)?.pattern,
    );
    console.log("ROUTES", f, tab, location.pathname);
    setTab(isIndex ? defaultTab : tab);
  }, [location.pathname]);

  return {
    tab,
    setTab,
    setTabByRoute,
  };
}
