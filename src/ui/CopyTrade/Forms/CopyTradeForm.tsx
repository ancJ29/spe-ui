import useTranslation from "@/hooks/useTranslation";
import { Box, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AddFundForm } from "./AddFundForm";
import { WithdrawFundsForm } from "./WithdrawFundsForm";
import { CopyTradingSettingsForm } from "./CopyTradingSettingsForm";

export function CopyTradeForm() {
  const t = useTranslation();
  return (
    <>
      <Box>
        <Button
          onClick={() => {
            modals.open({
              title: t("Copy Trading Settings"),
              centered: true,
              withinPortal: true,
              size: "lg",
              padding: "xl",
              portalProps: {

              },
              styles: {
                title: {
                  fontSize: "20px"
                },
              },
              children: (
                <>
                  <CopyTradingSettingsForm />
                </>
              ),
            });
          }}
        >
                    Copy Trading Settings
        </Button>
        <Button
          onClick={() => {
            modals.open({
              title: t("Add Fund"),
              centered: true,
              withinPortal: true,
              size: "lg",
              padding: "xl",
              portalProps: {

              },
              styles: {
                title: {
                  fontSize: "20px"
                },
              },
              children: (
                <>
                  <AddFundForm />
                </>
              ),
            });
          }}
        >
                    Add Fund
        </Button>
        <Button
          onClick={() => {
            modals.open({
              title: t("Withdraw Funds"),
              centered: true,
              withinPortal: true,
              size: "lg",
              padding: "xl",
              portalProps: {

              },
              styles: {
                title: {
                  fontSize: "20px"
                },
              },
              children: (
                <>
                  <WithdrawFundsForm />
                </>
              ),
            });
          }}
        >
                    Withdraw funds form
        </Button>
      </Box>
    </>
  );
}
