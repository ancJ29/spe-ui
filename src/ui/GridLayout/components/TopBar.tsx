import { Box, Divider, Flex, HoverCard } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { MenuToken } from "./MenuToken";
import AppText from "@/ui/Text/AppText";
import { AppPopover } from "@/ui/Popover/AppPopover";
import { IconDots } from "@tabler/icons-react";

export function TopBar() {
  const { hovered, ref } = useHover();
  return (
    <>
      <Flex bg={"#101014"} align={"center"} gap={20} p={10}>
        <MenuToken />
        <Divider orientation="vertical" />
        <div>
          <AppText instancetype="withPriceLong" c={"green"}>
              3,541.57
          </AppText>
          <AppPopover
            withArrow={false}
            position="bottom-start"
            target={(props) => ({
              children: (
                <AppText
                  onMouseLeave={props.close}
                  style={{ cursor: "help" }}
                  onMouseEnter={props.open}
                  instancetype="WithTextSubtitle"
                  fw={"bold"}
                >
                    3,540.91
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText instancetype="WithTextTooltip">
                      Mark price is derived by index price and funding
                      rate, and reflects the fair market price.
                      Liquidation is triggered by mark price.
                  </AppText>
                  <AppText
                    component="a"
                    href="#"
                    instancetype="WithTextTooltip"
                    c={"primary"}
                  >
                      Click here for details
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
        </div>
        <div>
          <AppText instancetype="withPriceTextStatus">
              Index Price
          </AppText>
          <AppText instancetype="WithTextSubtitle" fw={"bold"}>
              66,232.09
          </AppText>
        </div>
        <Box
          hidden
          display={{
            xl: "block"
          }}
        >
          <Flex align={"center"} gap={20}>
            <div>
              <AppText instancetype="withPriceTextStatus">
                  24H Change %
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                  +124.08 <span>(+3.61%)</span>
              </AppText>
            </div>
            <div>
              <AppText instancetype="withPriceTextStatus">
                  24H High
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                  3,655.35
              </AppText>
            </div>
            <div>
              <AppText instancetype="withPriceTextStatus">
                  24H Low
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                  3,428.56
              </AppText>
            </div>
            <div ref={ref}>
              {!hovered ? (
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      24H Turnover(USDT)
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      1,455,440,962.99
                  </AppText>
                </div>
              ) : (
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      24H Volume
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      1,455,440,962.99
                  </AppText>
                </div>
              )}
            </div>
            <div>
              <AppText instancetype="withPriceTextStatus">
                  Open Interest(BTC)
              </AppText>
              <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                  1,455,440,962.99
              </AppText>
            </div>
          </Flex>
        </Box>
        <div>
          <AppPopover
            withArrow={false}
            position="bottom-start"
            target={(props) => ({
              children: (
                <div
                  onMouseLeave={props.close}
                  style={{ cursor: "help" }}
                  onMouseEnter={props.open}
                >
                  <AppText instancetype="withPriceTextStatus">
                    <span>Funding Rate</span>/ Countdown
                  </AppText>
                  <Flex gap={5}>
                    <AppText
                      instancetype="WithTextSubtitle"
                      fw={"bold"}
                      c={"primary"}
                    >
                        -0.006%
                    </AppText>
                    <AppText
                      instancetype="WithTextSubtitle"
                      fw={"bold"}
                    >
                        /
                    </AppText>
                    <AppText
                      instancetype="WithTextSubtitle"
                      fw={"bold"}
                    >
                        02:10:11
                    </AppText>
                  </Flex>
                </div>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText instancetype="WithTextTooltip">
                    <p>
                        Funding fees will be exchanged between long and
                        short position holders every 8 hours. Please
                        note that the funding rate will fluctuate in
                        real time every 8 hours. If the funding rate is
                        positive upon settlement, long position holders
                        will pay short position holders. If the funding
                        rate is negative, short position holders will
                        pay long position holders.
                    </p>
  
                    <p>
                        Your position value at the timestamp when
                        funding is settled will be used to derive your
                        funding fees.
                    </p>
  
                    <p>
                        Funding Fees = Position Value * Funding Rate
                    </p>
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
        </div>
        <Box hiddenFrom="xl">
          <HoverCard>
            <HoverCard.Target>
              <Box display={"flex"}>
                <IconDots />
              </Box>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Flex align={"center"} gap={20}>
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      24H Change %
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      +124.08 <span>(+3.61%)</span>
                  </AppText>
                </div>
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      24H High
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      3,655.35
                  </AppText>
                </div>
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      24H Low
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      3,428.56
                  </AppText>
                </div>
                <div ref={ref}>
                  {!hovered ? (
                    <div>
                      <AppText instancetype="withPriceTextStatus">
                          24H Turnover(USDT)
                      </AppText>
                      <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                          1,455,440,962.99
                      </AppText>
                    </div>
                  ) : (
                    <div>
                      <AppText instancetype="withPriceTextStatus">
                          24H Volume
                      </AppText>
                      <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                          1,455,440,962.99
                      </AppText>
                    </div>
                  )}
                </div>
                <div>
                  <AppText instancetype="withPriceTextStatus">
                      Open Interest(BTC)
                  </AppText>
                  <AppText instancetype="WithTextSubtitle" fw={"bold"}>
                      1,455,440,962.99
                  </AppText>
                </div>
              </Flex>
            </HoverCard.Dropdown>
          </HoverCard>
        </Box>
      </Flex>
    </>
  );
}
