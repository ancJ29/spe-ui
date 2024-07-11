import AppTabs from "@/ui/Tabs";
import { TableCoinsWallet } from "./TableCoinsWallet";
import { TableCoinsTradingWallet } from "./TableCoinsTradingWallet";


export function TabsWallet() {
  return (
    <>
      <AppTabs
        className="noBg"
        defaultValue={"1"}
        showPanel
        classNames={{
          root: "tabBorderSmall"
        }}
        styles={{
          tabLabel: {
            fontWeight: "bolder",
            fontSize: "20px"
          }
        }}
        items={[
          {
            data: {
              label: "Wallet",
              value: "1",
            },
            tabsPanelProps: {
              children: <>
                <TableCoinsWallet />
              </>,
              value: "positions",
            },
          },
          {
            data: {
              label: "Trading Account",
              value: "2",
            },
            tabsPanelProps: {
              children: <>
                <TableCoinsTradingWallet />
              </>,
              value: "2",
            },
          },
        ]}
      />
    </>
  );
}

