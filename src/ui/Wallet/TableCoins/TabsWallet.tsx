import useTranslation from "@/hooks/useTranslation";
import authStore from "@/store/auth";
import AppTabs from "@/ui/Tabs";
import { Box, Checkbox, Flex } from "@mantine/core";
import { useState } from "react";
import { FiatDepositModal } from "./FiatDepositModal";
import { FundAssetsTable } from "./FundAssetsTable";
import { TradingAssetsTable } from "./TradingAssetsTable";

export function TabsWallet() {
  const { me } = authStore();
  const [hideZero, setHideZero] = useState(false);
  const t = useTranslation();
  return (
    <>
      <Box pos={"relative"}>
        <AppTabs
          className="noBg"
          defaultValue={"Funding Account"}
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
                label: t("Funding Account"),
                value: "Funding Account",
              },
              tabsPanelProps: {
                childrenRenderer: () => (
                  <FundAssetsTable hideZero={hideZero} />
                ),
                value: "Funding Account",
              },
            },
            {
              data: {
                label: t("Trading Account"),
                value: "Trading",
              },
              tabsPanelProps: {
                childrenRenderer: () => (
                  <TradingAssetsTable hideZero={hideZero} />
                ),
                value: "Trading",
              },
            },
          ]}
        />
        <Box h={42} pos={"absolute"} right={0} top={0}>
          <Flex align={"center"} gap={20}>
            <Checkbox
              defaultChecked={hideZero}
              label={t("Hide small balances")}
              onChange={() => setHideZero(!hideZero)}
            />
            {me?.fiatDepositMemo && <FiatDepositModal />}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
