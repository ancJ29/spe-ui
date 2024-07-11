import AppTabs from "@/ui/Tabs";
import { useCallback, useEffect, useState } from "react";
import {
  matchPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { TableRecordsDeposit } from "./TableRecordsDeposit";
import { TableRecordsOthers } from "./TableRecordsOthers";
import { TableRecordsSwap } from "./TableRecordsSwap";
import { TableRecordsWithdraw } from "./TableRecordsWithdraw";

export function TabsTransactions() {
  const [tab, setTab] = useState<string | null>("swap");
  const navigate = useNavigate();
  const location = useLocation();

  const setTabByRoute = useCallback(() => {
    const f = location.pathname.split("/");
    const tab = f[f.length - 1];
    const isIndex = Boolean(
      matchPath("/wallet/records", location.pathname)?.pattern,
    );
    setTab(isIndex ? "swap" : tab);
  }, [location.pathname]);

  useEffect(() => {
    setTabByRoute();
  }, [setTabByRoute]);

  const onChangeTab = useCallback(
    (t: string | null) => {
      // setTab(t)
      navigate(`/wallet/records/${t?.toLowerCase()}`, {
        replace: true,
      });
    },
    [navigate],
  );

  return (
    <>
      <AppTabs
        className="noBg"
        value={tab}
        showPanel={false}
        onChange={onChangeTab}
        classNames={{
          root: "tabBorderSmall",
        }}
        styles={{
          tabLabel: {
            fontWeight: "bolder",
            fontSize: "20px",
          },
        }}
        items={[
          {
            data: {
              label: "Swap",
              value: "swap",
            },
            tabsPanelProps: {
              children: (
                <>
                  <TableRecordsSwap />
                </>
              ),
              value: "swap",
            },
          },
          {
            data: {
              label: "Deposit",
              value: "deposit",
            },
            tabsPanelProps: {
              children: (
                <>
                  <TableRecordsDeposit />
                </>
              ),
              value: "deposit",
            },
          },
          {
            data: {
              label: "Withdraw",
              value: "withdraw",
            },
            tabsPanelProps: {
              children: (
                <>
                  <TableRecordsWithdraw />
                </>
              ),
              value: "withdraw",
            },
          },
          {
            data: {
              label: "Others",
              value: "others",
            },
            tabsPanelProps: {
              children: (
                <>
                  <TableRecordsOthers />
                </>
              ),
              value: "others",
            },
          },
        ]}
      />
    </>
  );
}
