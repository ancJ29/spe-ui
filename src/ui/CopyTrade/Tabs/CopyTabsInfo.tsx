import { useTabByRoute } from "@/hooks/useTabByRoute";
import useTranslation from "@/hooks/useTranslation";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppTabs from "../../Tabs";

export function CopyTabsInfo() {
  const location = useLocation();
  const t = useTranslation();
  const { tab, setTabByRoute } = useTabByRoute(
    "my-taker",
    "/copy-trade/mine",
  );
  useEffect(() => {
    setTabByRoute();
  }, [setTabByRoute]);

  const tabs = [
    {
      value: "my-taker",
      label: t("My Masters"),
      link: "/copy-trade/mine/my-taker",
    },
    {
      value: "copy-position",
      label: t("Copied Positions"),
      link: "/copy-trade/mine/copy-position",
    },
    {
      value: "copy-history",
      label: t("Copy History"),
      link: "/copy-trade/mine/copy-history",
    },
    {
      value: "fund-flow",
      label: t("Transaction"),
      link: "/copy-trade/mine/fund-flow",
    },
  ];
  return (
    <>
      <AppTabs
        className="noBg"
        defaultValue={"my-taker"}
        value={tab}
        classNames={{
          root: "tabBorderSmall",
        }}
        styles={{
          tabLabel: {
            fontWeight: "bolder",
            fontSize: "20px",
          },
        }}
        tabs={tabs.map((tab) => ({
          data: {
            label: (
              <Link
                style={{
                  all: "unset",
                  display: "block",
                }}
                to={{ pathname: tab.link, search: location.search }}
              >
                {tab.label}
              </Link>
            ),
            value: tab.value,
          },
        }))}
      />
    </>
  );
}
