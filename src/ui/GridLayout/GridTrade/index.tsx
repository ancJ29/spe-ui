import BN from "@/common/big-number";
import useSPEInterval from "@/hooks/useSPEInterval";
import useTranslation from "@/hooks/useTranslation";
import { assetStore } from "@/store/assets";
import authStore from "@/store/auth";
import tradeStore from "@/store/trade";
import { GridTradeProps } from "@/types";
import AppButton from "@/ui/Button/AppButton";
import NumberFormat from "@/ui/NumberFormat";
import OrderForm from "@/ui/OrderForm";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import { TVChart } from "@/ui/TvChart";
import { DepositForm, SwapForm, TransferForm } from "@/ui/Wallet";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  InputLabel,
  SimpleGrid,
  Space,
  Spoiler,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChevronsDown,
  IconChevronsUp,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { useCallback, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { OrderBook, TabsOfTradeHistory, TopBar } from "../components";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const initialLayouts =
  // prettier-ignore
  "{\"lg\":[{\"x\":4,\"y\":0,\"w\":2,\"h\":5,\"i\":\"0\",\"static\":false},{\"x\":8,\"y\":0,\"w\":2,\"h\":5,\"i\":\"1\",\"static\":false},{\"x\":6,\"y\":0,\"w\":2,\"h\":4,\"i\":\"2\",\"static\":false}],\"md\":[{\"w\":7,\"h\":12,\"x\":0,\"y\":0,\"i\":\"0\",\"moved\":false,\"static\":false},{\"w\":3,\"h\":12,\"x\":7,\"y\":0,\"i\":\"1\",\"moved\":false,\"static\":false},{\"w\":10,\"h\":8,\"x\":0,\"y\":12,\"i\":\"2\",\"moved\":false,\"static\":false}]}";

export function GridTrade({
  base,
  quote,
  symbol,
  isSpot = false,
  isFuture = false,
}: GridTradeProps) {
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

  useSPEInterval(() => {
    tradeStore.getState().loadOpenTrades();
    tradeStore.getState().loadMarketInformation(symbol);
  }, 10e3);

  return (
    <Grid columns={24} gutter={4} p={4} key={symbol}>
      <Grid.Col span={19}>
        <Grid gutter={4}>
          <Grid.Col>
            <TopBar
              {...{
                isFuture,
                isSpot,
                symbol,
                base,
                quote,
              }}
            />
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
                <TVChart base={base} quote={quote} isSpot={isSpot} />
                <div className="grid-item-drag-handle">
                  <ActionIcon size={"xs"} variant="light">
                    <IconGripHorizontal size={18} />
                  </ActionIcon>
                </div>
              </div>
              <div key={1} className="grid-item-box">
                <OrderBook {...{ base, quote, symbol, isSpot }} />
                <div className="grid-item-drag-handle">
                  <ActionIcon size={"xs"} variant="light">
                    <IconGripHorizontal size={18} />
                  </ActionIcon>
                </div>
              </div>
              <div key={2} className="grid-item-box">
                <TabsOfTradeHistory
                  isFuture={isFuture}
                  isSpot={isSpot}
                  symbol={symbol}
                  base={base}
                  quote={quote}
                />
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
        <OrderPanel
          symbol={symbol}
          base={base}
          quote={quote}
          isFuture={isFuture}
          isSpot={isSpot}
        />
      </Grid.Col>
    </Grid>
  );
}

function OrderPanel(props: GridTradeProps) {
  return (
    <Box
      className="bg-trade space-y-10"
      h={"100%"}
      py={0}
      pt={10}
      px={10}
    >
      <Space mt={10} />
      <OrderForm {...props} />
      <BoxInfoTradeFoot {...props} />
    </Box>
  );
}

function BoxInfoTradeFoot({
  symbol,
  isSpot,
  base,
  quote,
}: GridTradeProps) {
  const t = useTranslation();
  const { marketInformation } = tradeStore();
  const { isLogin } = authStore();
  const { tradingBalanceMap, tradingAccount, fundingAccount } =
    assetStore();

  return (
    <Box className="space-y-20" mt={50}>
      <Flex justify={"space-between"}>
        <AppText fz={14} fw={"bold"}>
          {t("Trading Account")}
        </AppText>
        <>
          {/* <Flex align={"center"} gap={5} hidden>
          <IconChartHistogram color="orange" size={16} />
          <AppText fz={12} c={"orange"}>
            {t("P&L")}
          </AppText>
        </Flex> */}
        </>
      </Flex>
      <>
        {/* <Box className="space-y-10">
        <Flex justify={"space-between"}>
          <InputLabel className="text-label-form">
            Margin Mode
          </InputLabel>
          <Flex align={"center"}>
            <AppText fz={12}>Cross Margin</AppText>
            <IconChevronRight size={16} />
          </Flex>
        </Flex>
        <Box h={"1"} className="border-bottom-dark"></Box>
      </Box> */}
      </>
      <>
        {/* <Grid columns={24} align="center" gutter={0}>
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
          />
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
      </Grid> */}
      </>
      <Box h={"1"} className="border-bottom-dark"></Box>
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
                  {t("Margin Balance")}
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
                    {t(
                      "Margin Balance = Wallet Balance + Unrealized P&L (Perpetual + Futures)",
                    )}
                    <br />
                    {t(
                      "Liquidation will be triggered when margin balance falls below the maintenance margin.",
                    )}{" "}
                    <br />
                    {t(
                      "Initial Margin Rate (IMR) = Initial Margin / (Margin Balance - Haircut Loss) * 100%",
                    )}{" "}
                    <br />
                    <br />
                    {t(
                      "Margin balance under the Unified Trading Account is denominated in %, calculated in real time based on the total assets in the account.",
                      quote,
                    )}
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
          <AppText fw={"bold"} fz={12}>
            <NumberFormat
              value={BN.add(tradingBalanceMap[quote]?.equity || 0)}
            />{" "}
            {quote}
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
                  {t("Available Balance")}
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
                    {t(
                      "The amount of balance that can be used to open positions.",
                    )}
                    <br />
                    {t(
                      "Available Balance = Margin Balance - Initial Margin - Haircut Loss",
                    )}
                    <br />
                    {t(
                      "Available balance under the Trading Account is denominated in %, calculated in real time based on the total assets in the account.",
                      quote,
                    )}
                  </AppText>
                </div>
              ),
            })}
          ></AppPopover>
          <AppText fw={"bold"} fz={12}>
            <NumberFormat
              value={tradingBalanceMap[quote]?.availableMargin || 0}
            />{" "}
            {quote}
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
        <AppButton
          disabled={!isLogin}
          size="xs"
          styles={{
            root: {
              background: "light-dark(#e9edf3, #414347)",
              color: "light-dark(black, white)",
            },
          }}
          onClick={() => {
            modals.open({
              size: "lg",
              centered: true,
              styles: {
                header: {
                  display: "none",
                },
                content: {
                  padding: 0,
                  background: "none"
                },
                body: {
                  padding: 0,
                  background: "none"
                },
                root: {
                  width: "100%",
                  padding: 0,
                  background: "none"
                },

              },
              children: <DepositForm coin={quote} />,
            });
          }}
        >
          {t("Deposit")}
        </AppButton>
        <AppButton
          disabled={!isLogin}
          size="xs"
          styles={{
            root: {
              background: "light-dark(#e9edf3, #414347)",
              color: "light-dark(black, white)",
            },
          }}
          onClick={() => {
            modals.open({
              size: "lg",
              centered: true,
              styles: {
                header: {
                  display: "none",
                },
                content: {
                  padding: 0,
                  background: "none"
                },
                body: {
                  padding: 0,
                  background: "none"
                },
                root: {
                  width: "100%",
                  padding: 0,
                  background: "none"
                },
              },
              children: (
                <SwapForm
                  coin={quote}
                  onSubmit={() => {
                    assetStore.getState().fetchBalances();
                  }}
                />
              ),
            });
          }}
        >
          {t("Convert")}
        </AppButton>
        <AppButton
          disabled={!isLogin}
          size="xs"
          styles={{
            root: {
              background: "light-dark(#e9edf3, #414347)",
              color: "light-dark(black, white)",
            },
          }}
          onClick={() => {
            modals.open({
              size: "lg",
              centered: true,
              styles: {
                header: {
                  display: "none",
                },
                content: {
                  padding: 0,
                },
                body: {
                  padding: 0,
                },
                root: {
                  width: "100%",
                  padding: 0,
                },
              },
              children: (
                <TransferForm
                  coin={quote}
                  accountIds={[
                    fundingAccount?.id || "",
                    tradingAccount?.id || "",
                  ]}
                  onSubmit={() => {
                    assetStore.getState().fetchBalances();
                  }}
                />
              ),
            });
          }}
        >
          {t("Transfer")}
        </AppButton>
      </SimpleGrid>
      <Box h={"1"} className="border-bottom-dark"></Box>
      <Box className="space-y-16" hidden={isSpot}>
        <Box>
          <AppText fz={16} fw={"bold"}>
            {t("Contract Details")} {symbol}
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
                {t("Expiration Date")}
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
                {t("Perpetual")}
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("Index Price")}
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
                <NumberFormat
                  value={marketInformation[symbol]?.indexPrice || 0}
                  decimalPlaces={2}
                />
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("Mark Price")}
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
                <NumberFormat
                  value={marketInformation[symbol]?.markPrice || 0}
                  decimalPlaces={2}
                />
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("Open Interest")}
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
                {/* <NumberFormat
                  value={marketInformation[symbol]?.openInterest || 0}
                  decimalPlaces={2}
                />
                {base} */}
                {t("N/A")}
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("24H Turnover")}
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
                {/* <NumberFormat
                  value={marketInformation[symbol]?.turnOver || 0}
                  decimalPlaces={2}
                />
                {base} */}
                {t("N/A")}
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("Risk Limit")}
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
                2,000,000 {quote}
              </AppText>
            </Box>
            <Box>
              <AppText c={"#71757a"} fw={"bold"} fz={12}>
                {t("Contract Value")}
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
                1 {base}
              </AppText>
            </Box>
          </SimpleGrid>
        </Spoiler>
      </Box>
    </Box>
  );
}
