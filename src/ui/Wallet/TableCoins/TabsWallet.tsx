import useTranslation from "@/hooks/useTranslation";
import useAuthStore from "@/store/auth";
import AppTabs from "@/ui/Tabs";
import { Box, Checkbox, Flex } from "@mantine/core";
import { useState } from "react";
import { FiatDepositModal } from "./FiatDepositModal";
import { FundAssetsTable } from "./FundAssetsTable";
import { TradingAssetsTable } from "./TradingAssetsTable";

export function TabsWallet() {
  const { me } = useAuthStore();
  const [hideZero, setHideZero] = useState(false);
  const t = useTranslation();
  return (
    <>
      <Box pos={"relative"}>
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
                children: <FundAssetsTable hideZero={hideZero} />,
                value: "Wallet",
              },
            },
            {
              data: {
                label: t("Trading Account"),
                value: "Trading",
              },
              tabsPanelProps: {
                children: <TradingAssetsTable hideZero={hideZero} />,
                value: "Trading",
              },
            },
          ]}
        />
        <Box h={42} pos={"absolute"} right={0} top={0}>
          <Flex align={"center"} gap={20}>
            <Checkbox
              checked={hideZero}
              label={t("Hide small balances")}
              onClick={() => setHideZero(!hideZero)}
            />
            {me?.fiatDepositMemo && <FiatDepositModal />}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
