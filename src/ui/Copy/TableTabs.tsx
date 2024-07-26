import useTranslation from "@/hooks/useTranslation";
import { last } from "lodash";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import AppTabs from "../Tabs";

const MASTER_TABS = [
  {
    label: "My Positions",
    link: "/copy/master/positions",
  },
  {
    label: "Followers' Positions",
    link: "/copy/master/followers",
  },
  {
    label: "Order History",
    link: "/copy/master/orders",
  },
  {
    label: "Transactions",
    link: "/copy/master/transactions",
  },
].map((el) => ({
  ...el,
  value: last(el.link.split("/")),
}));

const FOLLOWER_TABS = [
  {
    label: "My Master Traders",
    link: "/copy/mine/traders",
  },
  {
    label: "Copy Positions",
    link: "/copy/mine/positions",
  },
  {
    label: "Copy History",
    link: "/copy/mine/orders",
  },
  {
    label: "Transactions",
    link: "/copy/mine/transactions",
  },
].map((el) => ({
  ...el,
  value: last(el.link.split("/")),
}));

export function Tabs() {
  const t = useTranslation();
  const { pathname } = useLocation();
  const tab = useMemo(() => {
    return last(pathname.split("/"));
  }, [pathname]);
  const tabs = useMemo(() => {
    return pathname.includes("master") ? MASTER_TABS : FOLLOWER_TABS;
  }, [pathname]);

  return (
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
              to={tab.link}
            >
              {t(tab.label)}
            </Link>
          ),
          value: tab.value,
        },
      }))}
    />
  );
}
