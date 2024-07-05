/* eslint-disable react/prop-types */
import AppButton from "@/ui/Button/AppButton";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Grid,
  InputLabel,
  Progress,
  SegmentedControl,
  SimpleGrid,
  Spoiler,
} from "@mantine/core";
import {
  IconChartHistogram,
  IconChevronRight,
  IconChevronsDown,
  IconChevronsUp,
  IconEye,
  IconEyeOff,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  CreateOrderTradeByConditionalForm,
  CreateOrderTradeByLimitForm,
  CreateOrderTradeByMarketForm,
  OrderBook,
  TabsOfTradeHistory,
  TopBar,
} from "../components";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const initialLayouts =
  // prettier-ignore
  "{\"lg\":[{\"x\":4,\"y\":0,\"w\":2,\"h\":5,\"i\":\"0\",\"static\":false},{\"x\":8,\"y\":0,\"w\":2,\"h\":5,\"i\":\"1\",\"static\":false},{\"x\":6,\"y\":0,\"w\":2,\"h\":4,\"i\":\"2\",\"static\":false}],\"md\":[{\"w\":7,\"h\":12,\"x\":0,\"y\":0,\"i\":\"0\",\"moved\":false,\"static\":false},{\"w\":3,\"h\":12,\"x\":7,\"y\":0,\"i\":\"1\",\"moved\":false,\"static\":false},{\"w\":10,\"h\":8,\"x\":0,\"y\":12,\"i\":\"2\",\"moved\":false,\"static\":false}]}";

export function GridTrade() {
  const [layouts, setLayouts] = useState(
    JSON.parse(
      (localStorage.getItem("layoutTrade") as string) ??
        initialLayouts,
    ),
  );
  const onLayoutChange = useCallback(
    (...res: unknown[]) => {
      const [, layouts] = res;
      setLayouts(layouts);
      localStorage.setItem("layoutTrade", JSON.stringify(layouts));
    },
    [setLayouts],
  );

  return (
    <>
      <Grid columns={24} gutter={4} p={4}>
        <Grid.Col span={19}>
          <Grid gutter={4}>
            <Grid.Col>
              <TopBar />
            </Grid.Col>
            <Grid.Col>
              <ResponsiveReactGridLayout
                className="layout_trade"
                rowHeight={30}
                onLayoutChange={onLayoutChange}
                measureBeforeMount={false}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                margin={[4, 4]}
                containerPadding={[0, 0]}
                layouts={layouts}
                draggableHandle=".grid-item-drag-handle"
              >
                <div key={0} className="grid-item-box">
                  <Center h={"100%"}>Chart</Center>
                  <div className="grid-item-drag-handle">
                    <ActionIcon size={"xs"} variant="light">
                      <IconGripHorizontal size={18} />
                    </ActionIcon>
                  </div>
                </div>
                <div key={1} className="grid-item-box">
                  <OrderBook />
                  <div className="grid-item-drag-handle">
                    <ActionIcon size={"xs"} variant="light">
                      <IconGripHorizontal size={18} />
                    </ActionIcon>
                  </div>
                </div>
                <div key={2} className="grid-item-box">
                  <TabsOfTradeHistory />
                  <div className="grid-item-drag-handle">
                    <ActionIcon size={"xs"} variant="light">
                      <IconGripHorizontal size={18} />
                    </ActionIcon>
                  </div>
                </div>
              </ResponsiveReactGridLayout>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={5}>
          <Box bg={"#101014"} h={"100%"} p={10}>
            <Forms />
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
}

type TradeType = "Limit" | "Market" | "Conditional";
function Forms() {
  const [type, setType] = useState<TradeType>("Limit");
  return (
    <>
      <Box className="space-y-10" pt={10}>
        <SegmentedControl
          onChange={(v) => setType(v as TradeType)}
          className="control-segment-percent"
          data={["Limit", "Market", "Conditional"]}
          size="sm"
          styles={{
            root: {
              gap: "20px",
              padding: "0px",
              background: "none",
            },
            label: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "0px",
            },
            indicator: {
              display: "none",
            },
            // innerLabel: {
            //     height: "100%",

            // }
          }}
          withItemsBorders={false}
        />
        <TradeForm tradeType={type} />
      </Box>
    </>
  );
}

function TradeForm({ tradeType }: { tradeType: TradeType }) {
  return (
    <>
      {tradeType === "Limit" && (
        <CreateOrderTradeByLimitForm
          onSubmit={(res) => {
            // eslint-disable-next-line no-console
            console.log("CreateOrderTradeByLimitForm", res);
          }}
        />
      )}
      {tradeType === "Market" && (
        <CreateOrderTradeByMarketForm
          onSubmit={(res) => {
            // eslint-disable-next-line no-console
            console.log("CreateOrderTradeByMarketForm", res);
          }}
        />
      )}
      {tradeType === "Conditional" && (
        <CreateOrderTradeByConditionalForm
          onSubmit={(res) => {
            // eslint-disable-next-line no-console
            console.log("CreateOrderTradeByConditionalForm", res);
          }}
        />
      )}
      <BoxInfoTradeFoot />
    </>
  );
}

function BoxInfoTradeFoot() {
  const [isOf, setOff] = useState<boolean>(false);
  return (
    <Box className="space-y-20">
      <Flex justify={"space-between"}>
        <Flex align={"center"}>
          <AppText fz={14} fw={"bold"}>
            Unified Trading Account
          </AppText>
          <ActionIcon
            onClick={() => setOff(!isOf)}
            variant="transparent"
          >
            {isOf ? (
              <IconEyeOff color="white" size={14} />
            ) : (
              <IconEye color="white" size={14} />
            )}
          </ActionIcon>
        </Flex>
        <Flex align={"center"} gap={5}>
          <IconChartHistogram color="orange" size={16} />
          <AppText fz={12} c={"orange"}>
            P&L
          </AppText>
        </Flex>
      </Flex>
      <Box className="space-y-10">
        <Flex justify={"space-between"}>
          <InputLabel className="text-label-form">
            Margin Mode
          </InputLabel>
          <Flex align={"center"}>
            <AppText fz={12}>Cross Margin</AppText>
            <IconChevronRight size={16} />
          </Flex>
        </Flex>
        <Box h={"1"} bg={"dark"}></Box>
      </Box>
      <Grid columns={24} align="center" gutter={0}>
        <Grid.Col span={10}>
          <AppPopover
            withArrow={false}
            target={(props) => ({
              children: (
                <InputLabel
                  onMouseLeave={props.close}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={props.open}
                  className="text-label-form"
                >
                  Initial Margin
                </InputLabel>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText
                    instancetype="WithTextTooltip"
                    styles={{
                      root: {
                        whiteSpace: "pre-line",
                      },
                    }}
                  >
                    Initial Margin: 0.0000 USD <br />
                    Margin Balance: 0.0000 USD <br />
                    Initial Margin Rate (IMR) = Initial Margin /
                    (Margin Balance - Haircut Loss) * 100% <br />
                    <br />
                    When IMR is ≥ 100%, it indicates that all the
                    margin balance has been deployed to your positions
                    and orders. In this case, you can no longer place
                    any orders that may increase your position size.
                    <br />
                    <br />
                    The initial margin for all positions and orders
                    under the Unified Trading Account will be
                    converted to USD in real time to derive the total
                    initial margin under the account.
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
        </Grid.Col>
        <Grid.Col span={9}>
          <Progress value={30} color="green" />
        </Grid.Col>
        <Grid.Col span={5}>
          <AppText
            fz={12}
            c={"green"}
            fw={"bold"}
            styles={{
              root: {
                textAlign: "right",
              },
            }}
          >
            0.00%
          </AppText>
        </Grid.Col>
        <Grid.Col span={10}>
          <AppPopover
            withArrow={false}
            target={(props) => ({
              children: (
                <InputLabel
                  onMouseLeave={props.close}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={props.open}
                  className="text-label-form"
                >
                  Maintenance Margin
                </InputLabel>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText
                    instancetype="WithTextTooltip"
                    styles={{
                      root: {
                        whiteSpace: "pre-line",
                      },
                    }}
                  >
                    Maintenance Margin: 0.0000 USD <br />
                    Margin Balance: 0.0000 USD <br />
                    Maintenance Margin Ratio (MMR) = Maintenance
                    Margin / (Margin Balance - Haircut Loss) * 100%{" "}
                    <br />
                    <br />
                    When MMR ≥ 100%, it will trigger auto-redemption
                    to repay outstanding liabilities and may trigger
                    settlement of derivative positions until the
                    Maintenance Margin Ratio returns to normal.
                    <br />
                    <br />
                    The Maintenance Margin for all positions and
                    orders in the Unified Trading Account will be
                    converted in real-time to derive the total
                    Maintenance Margin in USD.
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
        </Grid.Col>
        <Grid.Col span={9}>
          <Progress value={30} color="green" />
        </Grid.Col>
        <Grid.Col span={5}>
          <AppText
            fz={12}
            c={"green"}
            fw={"bold"}
            styles={{
              root: {
                textAlign: "right",
              },
            }}
          >
            0.00%
          </AppText>
        </Grid.Col>
      </Grid>
      <Box h={"1"} bg={"dark"}></Box>
      <Box className="space-y-10">
        <Flex justify={"space-between"} align={"center"}>
          <AppPopover
            withArrow={false}
            target={(props) => ({
              children: (
                <AppText
                  onMouseLeave={props.close}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={props.open}
                  fz={12}
                >
                  Margin Balance
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText
                    instancetype="WithTextTooltip"
                    styles={{
                      root: {
                        whiteSpace: "pre-line",
                      },
                    }}
                  >
                    Margin Balance = Wallet Balance + Unrealized P&L
                    (Perpetual + Futures) <br />
                    Liquidation will be triggered when margin balance
                    falls below the maintenance margin. <br />
                    Initial Margin Rate (IMR) = Initial Margin /
                    (Margin Balance - Haircut Loss) * 100% <br />
                    <br />
                    Margin balance under the Unified Trading Account
                    is denominated in USDT, calculated in real time
                    based on the total assets in the account.
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
          <AppText fw={"bold"} fz={12}>
            108,351.5411 USDC
          </AppText>
        </Flex>
        <Flex justify={"space-between"} align={"center"}>
          <AppPopover
            withArrow={false}
            target={(props) => ({
              children: (
                <AppText
                  onMouseLeave={props.close}
                  style={{
                    cursor: "pointer",
                  }}
                  onMouseEnter={props.open}
                  fz={12}
                >
                  Available Balance
                </AppText>
              ),
            })}
            dropdown={() => ({
              children: (
                <div>
                  <AppText
                    instancetype="WithTextTooltip"
                    styles={{
                      root: {
                        whiteSpace: "pre-line",
                      },
                    }}
                  >
                    The amount of balance that can be used to open
                    positions.
                    <br />
                    Available Balance = Margin Balance - Initial
                    Margin - Haircut Loss
                    <br />
                    Available balance under the Unified Trading
                    Account is denominated in USDC, calculated in real
                    time based on the total assets in the account.
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
          <AppText fw={"bold"} fz={12}>
            106,244.6318 USDC
          </AppText>
        </Flex>
      </Box>
      <SimpleGrid
        cols={3}
        styles={{
          root: {
            gap: 5,
          },
        }}
      >
        <AppButton bg={"gray.8"} size="xs">
          Deposit
        </AppButton>
        <AppButton bg={"gray.8"} size="xs">
          Convert
        </AppButton>
        <AppButton bg={"gray.8"} size="xs">
          Transfer
        </AppButton>
      </SimpleGrid>
      <Box h={"1"} bg={"dark"}></Box>
      <Box className="space-y-16">
        <Box>
          <AppText fz={16} fw={"bold"}>
            Contract Details BTCUSDT
          </AppText>
        </Box>
        <Spoiler
          maxHeight={72}
          styles={{
            control: {
              width: "100%",
              textDecoration: "none",
              marginTop: "20px",
              cursor: "pointer",
              color: "gray",
            },
          }}
          showLabel={
            <Flex align={"center"} w={"100%"} justify={"center"}>
              <InputLabel fz={12} color="red">
                Show
              </InputLabel>
              <IconChevronsDown size={18} />
            </Flex>
          }
          hideLabel={
            <Flex
              align={"center"}
              w={"100%"}
              justify={"center"}
              style={{ cursor: "pointer" }}
            >
              <InputLabel fz={12} color="red">
                Hide
              </InputLabel>
              <IconChevronsUp size={18} />
            </Flex>
          }
        >
          <SimpleGrid
            cols={2}
            styles={{
              root: {
                gap: 5,
              },
            }}
          >
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Expiration Date
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                Perpetual
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Index Price
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                65,224.58
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Mark Price
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                65,203.88
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Open Interest
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                65,192.072 BTC
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                24H Turnover
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                53,549.431 BTC
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Risk Limit
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                2,000,000 USDT
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                Contract Value
              </AppText>
            </Box>
            <Box>
              <AppText
                fw={"bold"}
                fz={12}
                styles={{
                  root: {
                    textAlign: "right",
                  },
                }}
              >
                1 BTC
              </AppText>
            </Box>
          </SimpleGrid>
        </Spoiler>
      </Box>
    </Box>
  );
}
