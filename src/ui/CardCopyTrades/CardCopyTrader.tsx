import trade_icon from "@/assets/images/trade_icon.png";
import useTranslation from "@/hooks/useTranslation";
import {
  Avatar,
  Box,
  Card,
  Flex,
  Group,
  Image,
  Space,
  Tooltip,
} from "@mantine/core";
import { IconCaretUpFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import AppButton from "../Button/AppButton";
import AppChart from "../Chart/Chart";
import AppText from "../Text/AppText";
import classes from "./index.module.scss";

export function CardTrader() {
  const t = useTranslation();
  return (
    <>
      <Card
        className={classes.card}
        styles={{
          root: {
            // width: "fix"
          },
        }}
        p={20}
        radius={8}
        pos={"relative"}
        component={Link}
        to={`/copy-trading/${v4()}`}
      >
        <Box>
          <Box>
            <Group>
              <Avatar
                size={60}
                src={
                  "/images/bybit/6b7252dd-fe34-4ce0-a5f0-837474103818.png"
                }
              />
              <Box>
                <Flex align={"center"} gap={5}>
                  <AppText fz={20} fw={"bolder"}>
                    {" "}
                    DreamyCoin
                  </AppText>
                  <Image w={20} src={trade_icon} />
                </Flex>
                <Space my={5} />
                <Flex gap={10}>
                  <AppText instancetype="withTheadSmall">
                    85 {t("Follower(s)")}
                  </AppText>
                  <Flex align={"center"}>
                    <IconCaretUpFilled color="#20b26c" size={16} />
                    <AppText instancetype="withTheadSmall">
                      400.00%
                    </AppText>
                  </Flex>
                </Flex>
              </Box>
            </Group>
          </Box>
          <Flex align={"center"} justify={"space-between"}>
            <Box>
              <Tooltip
                multiline
                w={220}
                withArrow
                c={"dark"}
                bg={"gray.4"}
                p={20}
                transitionProps={{ duration: 200 }}
                label={t(
                  "Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment.",
                )}
              >
                <AppButton
                  variant="transparent"
                  p={0}
                  m={0}
                  h={"auto"}
                >
                  <AppText instancetype="withTheadSmall">
                    ROI{" "}
                    <span
                      style={{
                        border: "solid 1px #adb1b8",
                        borderRadius: "4px",
                        zoom: "0.83",
                        padding: "0 4.2px",
                      }}
                    >
                      7d
                    </span>
                  </AppText>
                </AppButton>
              </Tooltip>
              <AppText instancetype="WithPriceCardTrader" c={"green"}>
                +422.55%
              </AppText>
            </Box>
            <AppChart
              instancetype="Areapercent" // cspell:disable-line
              chartSeries={[
                {
                  name: "series1",
                  data: [31, 40, 28, 51, 42, 109, 100],
                },
              ]}
            />
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label={t(
                "Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment.",
              )}
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  ROI{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    90d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              +20.99%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label={t(
                "The maximum observed loss for the Master Trader in the last 30 days. A low maximum drawdown indicates that the loss incurred by the Master Trader's trades is relatively small.",
              )}
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                  {t("Drawdown")}{" "}
                  <span
                    style={{
                      border: "solid 1px #adb1b8",
                      borderRadius: "4px",
                      zoom: "0.83",
                      padding: "0 4.2px",
                    }}
                  >
                    30d
                  </span>
                </AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade" c={"green"}>
              21.29%
            </AppText>
          </Flex>
          <Flex justify={"space-between"}>
            <Tooltip
              multiline
              w={220}
              withArrow
              c={"dark"}
              bg={"gray.4"}
              p={20}
              transitionProps={{ duration: 200 }}
              label="Assets Under Management (AUM) is the total amount of investments from followers, managed by the Master Trader."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">AUM</AppText>
              </AppButton>
            </Tooltip>
            <AppText instancetype="withPriceCardTrade">
              25,478.00
            </AppText>
          </Flex>
          <Space h={20} />
          <AppButton
            variant="gradient"
            fullWidth
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
          >
            {t("Copy")}
          </AppButton>
        </Box>
      </Card>
    </>
  );
}
