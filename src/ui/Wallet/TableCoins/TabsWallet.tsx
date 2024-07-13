import useTranslation from "@/hooks/useTranslation";
import AppTabs from "@/ui/Tabs";
import { TableCoinsTradingWallet } from "./TableCoinsTradingWallet";
import { TableCoinsWallet } from "./TableCoinsWallet";

export function TabsWallet() {
  const t = useTranslation();
  return (
    <AppTabs
      className="noBg"
      defaultValue={"Wallet"}
      showPanel
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
            label: t("Wallet"),
            value: "Wallet",
          },
          tabsPanelProps: {
            children: <TableCoinsWallet />,
            value: "Wallet",
          },
        },
        {
          data: {
            label: t("Trading Account"),
            value: "Trading",
          },
          tabsPanelProps: {
            children: <TableCoinsTradingWallet />,
            value: "Trading",
          },
        },
      ]}
    />
  );
}
