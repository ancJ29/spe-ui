import { useTabByRoute } from "@/hooks/useTabByRoute";
import useTranslation from "@/hooks/useTranslation";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppTabs from "../../Tabs";

export function CopyTabsMasterInfo() {
  const location = useLocation();
  const t = useTranslation();
  const { tab, setTabByRoute } = useTabByRoute(
    "my-positions",
    "/copy-trade/mine",
  );
  useEffect(() => {
    setTabByRoute();
  }, [setTabByRoute]);

  const tabs = [
    {
      value: "my-positions",
      label: t("My Positions"),
      link: "/copy-trade/mine/my-positions",
    },
    {
      value: "my-copy",
      label: t("Followers' Positions"),
      link: "/copy-trade/mine/my-copy",
    },
    {
      value: "copy-history",
      label: t("Order History"),
      link: "/copy-trade/mine/copy-history",
    },
    {
      value: "my-promotion",
      label: t("My Promoters"),
      link: "/copy-trade/mine/my-promotion",
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
        defaultValue={"Funding Account"}
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
