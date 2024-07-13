import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/store/auth";
import AppTabs from "@/ui/Tabs";
import { Box, Checkbox, Flex } from "@mantine/core";
import { useState } from "react";
import { FiatDepositModal } from "./FiatDepositModal";
import { FundAssetsTable } from "./FundAssetsTable";
import { TradingAssetsTable } from "./TradingAssetsTable";

type TabType = "Wallet" | "Trading";
export function TabsWallet() {
  const { me } = useAuthStore();

  const [tab, setTab] = useState<TabType>("Wallet");
  const t = useTranslation();
  return (
    <>
      <Box pos={"relative"}>
        <AppTabs
          className="noBg"
          defaultValue={"Wallet"}
          onChange={(t) => setTab(t as TabType)}
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
                children: <FundAssetsTable />,
                value: "Wallet",
              },
            },
            {
              data: {
                label: t("Trading Account"),
                value: "Trading",
              },
              tabsPanelProps: {
                children: <TradingAssetsTable />,
                value: "Trading",
              },
            },
          ]}
        />
        {tab === "Wallet" && (
          <Box h={42} pos={"absolute"} right={0} top={0}>
            <Flex align={"center"} gap={20}>
              <Checkbox label={t("Hide small balances")} />
              {me?.fiatDepositMemo && <FiatDepositModal />}
            </Flex>
          </Box>
        )}
      </Box>
    </>
  );
}
