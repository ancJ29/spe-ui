import { Avatar, Box, Card, Flex, Group, Image, Space, Tooltip } from "@mantine/core";
import classes from "./index.module.scss";
import AppText from "../Text/AppText";
import { IconCaretUpFilled } from "@tabler/icons-react";
import AppButton from "../Button/AppButton";
import AppChart from "../Chart/Chart";
import trade_icon from "@/assets/images/trade_icon.png";
import { v4 } from "uuid";
import { Link } from "react-router-dom";

export function CardTraderTop1(
  props: Partial<{ avatar: string; userName: string; top: number }>,
) {
  const images = [
    "https://s1.bycsi.com/bybit/deadpool/704be805648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/84f87add648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/90f1e2cf648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/9c17a00e648811ed890b8e79ed0a92f0.png",
    "https://s1.bycsi.com/bybit/deadpool/9c17a00e648811ed890b8e79ed0a92f0.png",
  ];
  const colors = [
    "rgba(194,137,0,.3)",
    "#d2daea",
    "#e6c29d",
    "#d5dae0",
    "#d5dae0",
  ];
  
  return (
    <>
      <Card
        className={classes.card}
        radius={8}
        w={320}
        p={20}
        pos={"relative"}
        component={Link}
        to={`/copy-trading/${v4()}`}
      >
        {/* <Box component="a" href={`/copy-trading/${uuidv4()}`} pos={"absolute"} top={0} left={0}></Box> */}
        <Box pos={"absolute"} top={0} left={0} style={{ zIndex: 2 }}>
          <Image src={images[(props.top as number) - 1]} />
        </Box>
        <Box
          pos={"absolute"}
          top={36}
          left={19}
          style={{ zIndex: 1, border: "solid 1px red" }}
        >
          <Avatar size={80} src={props.avatar} />
        </Box>
        <Box
          pos={"absolute"}
          top={0}
          w={88}
          h={40}
          right={0}
          style={{
            borderRadius: "0 8px 0 24px",
            background: colors[(props.top as number) - 1],
            zIndex: 3,
          }}
        >
          <AppText
            fz={20}
            fw={600}
            lh={"40px"}
            c={"white"}
            style={{ textAlign: "center" }}
          >
              No.0 {props.top as number}
          </AppText>
        </Box>
        <Box pos={"relative"} style={{ zIndex: 3 }}>
          <Box style={{}} mt={24}>
            <Group>
              <Avatar
                opacity={0}
                size={80}
                src={
                  "/images/bybit/6b7252dd-fe34-4ce0-a5f0-837474103818.png"
                }
              />
              <Box>
                <Flex align={"center"} gap={5}>
                  <AppText fz={20} fw={"bolder"} c={"dark"}>
                    {" "}
                    {props.userName}{" "}
                  </AppText>
                  <Image w={20} src={trade_icon} />
                </Flex>
                <Space my={5} />
                <Flex gap={10}>
                  <AppText instancetype="withTheadSmall" c={"dark"}>
                      85 Follower(s)
                  </AppText>
                  <Flex align={"center"}>
                    <IconCaretUpFilled color="#20b26c" size={16} />
                    <AppText instancetype="withTheadSmall" c={"dark"}>
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
                label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
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
              label="Expressed as a percentage and calculated by dividing an investment's net profit (or loss) by its initial cost. ROI is a performance measure used to evaluate the efficiency or profitability of an investment."
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
              label="The maximum observed loss for the Master Trader in the last 30 days. A low maximum drawdown indicates that the loss incurred by the Master Trader's trades is relatively small."
            >
              <AppButton variant="transparent" p={0} m={0} h={"auto"}>
                <AppText instancetype="withTheadSmall">
                    Drawdown{" "}
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
              Copy
          </AppButton>
        </Box>
      </Card>
    </>
  );
}
