import { OrderSide } from "@/common/enums";
import { profit } from "@/common/logic";
import { IS_DEV } from "@/domain/config";
import useSyncData from "@/hooks/useSyncData";
import useTranslation from "@/hooks/useTranslation";
import {
  cancelOrderApi,
  closeOrderApi,
  fetchActiveOrders,
  fetchClosedPositions,
  fetchOpenPositions,
  fetchOrders,
  fetchTrades,
} from "@/services/apis";
import { Language } from "@/services/languages";
import authStore from "@/store/auth";
import tradeStore from "@/store/trade";
import { GridTradeProps, Order, Position, Trade } from "@/types";
import AppButton from "@/ui/Button/AppButton";
import { NoDataRecord } from "@/ui/NoData";
import NumberFormat from "@/ui/NumberFormat";
import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { TradingAssetsTable } from "@/ui/Wallet";
import { splitAndFormatString } from "@/utils/utility";
import {
  Box,
  Checkbox,
  Divider,
  Flex,
  NumberFormatter,
  rem,
  Table,
  TableData,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowRight, IconCheck } from "@tabler/icons-react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type TabProps = {
  isFuture: boolean;
  symbol: string;
};

export function TabsOfTradeHistory({
  isSpot,
  symbol,
  isFuture,
}: GridTradeProps) {
  const [activeTab, setActiveTab] = useState(
    IS_DEV ? "tradeHistory" : isSpot ? "currentOrders" : "positions",
  );
  const t = useTranslation();
  const { openTrades } = tradeStore();
  const { totalOpenOrders, totalOpenPositions } = useMemo(() => {
    const totalOpenOrders = openTrades.openOrders[symbol] || 0;
    const totalOpenPositions = openTrades.openPositions[symbol]
      ? 1
      : 0;
    return { totalOpenOrders, totalOpenPositions };
  }, [openTrades.openOrders, openTrades.openPositions, symbol]);

  const { isLogin } = authStore();
  const tabs = useMemo(() => {
    return [
      {
        data: {
          value: "positions",
          label: `${t("Positions")} (${totalOpenPositions})`,
          futureOnly: true,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <Positions isFuture={Boolean(isFuture)} symbol={symbol} />
          ),
          value: "positions",
        },
      },
      {
        data: {
          value: "PnL",
          label: `${t("P&L")}`,
          futureOnly: true,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <ClosedPnL isFuture={Boolean(isFuture)} symbol={symbol} />
          ),
          value: "PnL",
        },
      },
      {
        data: {
          value: "currentOrders",
          label: `${t("Current Orders")} (${totalOpenOrders})`,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <CurrentOrders
              isFuture={Boolean(isFuture)}
              symbol={symbol}
            />
          ),
          value: "currentOrders",
        },
      },
      {
        data: {
          value: "orderHistory",
          label: `${t("Order History")}`,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <OrderHistory
              isFuture={Boolean(isFuture)}
              symbol={symbol}
            />
          ),
          value: "orderHistory",
        },
      },
      {
        data: {
          value: "tradeHistory",
          label: `${t("Trade History")}`,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <TradeHistory
              isFuture={Boolean(isFuture)}
              symbol={symbol}
            />
          ),
          value: "tradeHistory",
        },
      },
      {
        data: {
          value: "assets",
          label: `${t("Assets")}`,
          spotOnly: true,
          options: {
            actions: [],
          },
        },
        tabsPanelProps: {
          childrenRenderer: () => (
            <TradingAssetsTable
              hideZero={true}
              defaultTransferType="transferIn"
            />
          ),
          value: "assets",
        },
      },
    ]
      .filter((el) => {
        if (!isFuture) {
          return el.data.futureOnly !== true;
        }
        if (isFuture) {
          return el.data.spotOnly !== true;
        }
        return true;
      })
      .map((el) => {
        if (isLogin) {
          return el;
        }
        return {
          ...el,
          tabsPanelProps: {
            ...el.tabsPanelProps,
            childrenRenderer: () => <LoginOrRegister />,
          },
        };
      });
  }, [
    t,
    totalOpenPositions,
    totalOpenOrders,
    isFuture,
    symbol,
    isLogin,
  ]);

  const rightOptions = useMemo(() => {
    return tabs
      .find((i) => i.data.value === activeTab)
      ?.data.options.actions.map((i: string, index) => (
        <Fragment key={index}>
          {i.startsWith("click") ? (
            <AppButton
              styles={{
                root: {
                  background: "light-dark(#e9edf3, #414347)",
                  color: "light-dark(black, white)",
                },
              }}
              size="compact-xs"
              fz={12}
            >
              {splitAndFormatString(i)}
            </AppButton>
          ) : i.startsWith("link") ? (
            <AppText
              size="compact-xs"
              fz={12}
              c={"primary"}
              component="a"
              href="#"
            >
              {splitAndFormatString(i)}
            </AppText>
          ) : i.startsWith("check") ? (
            <Checkbox
              size="xs"
              label={splitAndFormatString(i)}
              style={{ cursor: "pointer" }}
            />
          ) : (
            ""
          )}
        </Fragment>
      ));
  }, [activeTab, tabs]);

  return (
    <>
      <AppTabs
        value={activeTab}
        showPanel
        onChange={(value) => {
          setActiveTab(value || "");
        }}
        leftSection={
          <Flex gap={10} align={"center"}>
            <AppText instancetype="withPriceLong" c={"primary"}>
              Trade Information
            </AppText>
            <Divider
              style={{ alignSelf: "center" }}
              h={16}
              orientation="vertical"
            />
          </Flex>
        }
        rightSection={
          rightOptions ? (
            <Flex align={"center"} gap={10}>
              <Box
                className="grid-item-drag-handle"
                w={100}
                style={{ alignSelf: "stretch" }}
              ></Box>
              {rightOptions}
            </Flex>
          ) : (
            ""
          )
        }
        tabs={tabs}
        defaultValue={activeTab}
        variant="WithMediumNoBorder"
      />
    </>
  );
}

function TradeHistory({ symbol }: TabProps) {
  const fetch = useCallback(() => fetchTrades(symbol), [symbol]);
  const trades = useSyncData<Trade[]>(fetch);
  return (
    <SPETable
      tableData={{
        head: [
          "Symbol",
          "Direction",
          "Filled Price",
          "Filled",
          "Fee",
          "Transaction Time",
        ],
        body: trades?.map((trade) => {
          const isBuy = trade.side === "BUY";
          const color = isBuy ? "green" : "red";
          return [
            <Symbol
              key={`${trade.tradeId}.symbol`}
              symbol={trade.symbol}
              color={color}
              miw={80}
            />,
            <Side
              key={`${trade.tradeId}.side`}
              side={trade.side}
              color={color}
            />,
            <SPETableNumber
              key={`${trade.tradeId}.price`}
              value={trade.price}
              maw={50}
            />,
            <SPETableNumber
              key={`${trade.tradeId}.filled`}
              value={trade.volume}
              maw={50}
            />,
            <SPETableNumber
              key={`${trade.tradeId}.fee`}
              value={trade.fee}
              maw={50}
            />,
            <SPETableDateTime
              key={`${trade.tradeId}.createdAt`}
              time={trade.createdAt}
            />,
          ].filter(Boolean) as JSX.Element[];
        }),
      }}
    />
  );
}

function OrderHistory({ symbol, isFuture }: TabProps) {
  const fetch = useCallback(() => fetchOrders(symbol), [symbol]);
  const orders = useSyncData<Order[]>(fetch);
  return (
    <SPETable
      tableData={{
        head: [
          "Symbol",
          "Type",
          "Direction",
          "Filled / Volume",
          "Filled Price / Order Price",
          "Status",
          "Post Only",
          isFuture ? "Reduce Only" : undefined,
          "Order Time",
        ].filter(Boolean) as string[],
        body: orders?.map((order) => {
          const isBuy = order.side === "BUY";
          const color = isBuy ? "green" : "red";
          return [
            <Symbol
              key={`${order.orderId}.symbol`}
              symbol={order.symbol}
              color={color}
              miw={80}
            />,
            <SPETableText
              key={`${order.orderId}.type`}
              value={order.type}
            />,
            <Side
              key={`${order.orderId}.side`}
              side={order.side}
              color={color}
            />,
            <SPETableDoubleNumbers
              key={`${order.orderId}.volume`}
              maw={120}
              values={[order.filled || 0, order.volume]}
            />,
            <SPETableDoubleNumbers
              maw={200}
              key={`${order.orderId}.price`}
              values={[order.avgPrice || 0, order.price || 0]}
            />,
            <SPETableText
              key={`${order.orderId}.status`}
              value={order.status}
            />,
            <SPETableText
              key={`${order.orderId}.postOnly`}
              maw={50}
              value={order.postOnly ? "YES" : "-"}
            />,
            isFuture ? (
              <SPETableText
                key={`${order.orderId}.reduceOnly`}
                value={order.reduceOnly ? "YES" : "-"}
              />
            ) : undefined,
            <SPETableDateTime
              key={`${order.orderId}.createdAt`}
              time={order.createdAt}
            />,
          ].filter(Boolean) as JSX.Element[];
        }),
      }}
    />
  );
}

function CurrentOrders({ symbol, isFuture }: TabProps) {
  const t = useTranslation();
  const fetch = useCallback(
    () => fetchActiveOrders(symbol),
    [symbol],
  );
  const orders = useSyncData<Order[]>(fetch);
  return (
    <SPETable
      tableData={{
        head: [
          "Symbol",
          "Type",
          "Direction",
          "Filled / Volume",
          "Order Price",
          "Status",
          "Post Only",
          isFuture ? "Reduce Only" : undefined,
          "Order Time",
          "Action",
        ].filter(Boolean) as string[],
        body: orders?.map((order) => {
          const isBuy = order.side === "BUY";
          const color = isBuy ? "green" : "red";
          return [
            <Symbol
              key={`${order.orderId}.symbol`}
              symbol={order.symbol}
              color={color}
              miw={80}
            />,
            <SPETableText
              key={`${order.orderId}.type`}
              value={order.type}
            />,
            <Side
              key={`${order.orderId}.side`}
              side={order.side}
              color={color}
            />,
            <SPETableDoubleNumbers
              key={`${order.orderId}.volume`}
              maw={120}
              values={[order.filled || 0, order.volume]}
            />,
            <SPETableNumber
              maw={100}
              key={`${order.orderId}.price`}
              value={order.price || 0}
            />,
            <SPETableText
              key={`${order.orderId}.status`}
              value={order.status}
            />,
            <SPETableText
              key={`${order.orderId}.postOnly`}
              maw={50}
              value={order.postOnly ? "YES" : "-"}
            />,
            isFuture ? (
              <SPETableText
                key={`${order.orderId}.reduceOnly`}
                value={order.reduceOnly ? "YES" : "-"}
              />
            ) : undefined,
            <SPETableDateTime
              key={`${order.orderId}.createdAt`}
              time={order.createdAt}
            />,
            <AppButton
              key={`${order.orderId}.action`}
              styles={{
                root: {
                  background: "light-dark(#e9edf3, #414347)",
                  color: "light-dark(black, white)",
                },
              }}
              size="xs"
              fz={12}
              onClick={() => {
                cancelOrderApi(order.orderId)
                  .then(() => {
                    notifications.show({
                      color: "green",
                      title: t("Order canceled"),
                      message: t("Order has been canceled"),
                      icon: (
                        <IconCheck
                          style={{
                            width: rem(18),
                            height: rem(18),
                          }}
                        />
                      ),
                      loading: false,
                      autoClose: 5000,
                      position: "top-center",
                    });
                  })
                  .catch(() => {
                    notifications.show({
                      color: "red",
                      title: t("Something went wrong"),
                      message: t("Cannot cancel order"),
                      icon: (
                        <IconCheck
                          style={{
                            width: rem(18),
                            height: rem(18),
                          }}
                        />
                      ),
                      loading: false,
                      autoClose: 5000,
                      position: "top-center",
                    });
                  });
              }}
            >
              {t("Cancel")}
            </AppButton>,
          ].filter(Boolean) as JSX.Element[];
        }),
      }}
    />
  );
}

function Positions({ symbol }: TabProps) {
  const t = useTranslation();
  const fetch = useCallback(
    () => fetchOpenPositions(symbol),
    [symbol],
  );
  const positions = useSyncData<Position[]>(fetch);
  return (
    <SPETable
      tableData={{
        head: [
          "Symbol",
          "Direction",
          "Position Size",
          "Entry Price",
          "Mark Price",
          "Liquidation Price",
          "Position Margin",
          "Margin Level",
          "Unrealized PnL(%)",
          "Action",
          fetchOpenPositions,
        ].filter(Boolean) as string[],
        body: positions?.map((position) => {
          const isBuy = position.side === "BUY";
          const color = isBuy ? "green" : "red";
          return [
            <Symbol
              key={`${position.positionId}.symbol`}
              symbol={position.symbol}
              color={color}
            />,
            <Side
              key={`${position.positionId}.side`}
              side={position.side}
              color={color}
            />,
            <SPETableNumber
              maw={50}
              key={`${position.positionId}.volume`}
              value={position.volume}
            />,
            <SPETableNumber
              key={`${position.positionId}.entryPrice`}
              value={position.entryPrice}
            />,
            <MarkPrice
              key={`${position.positionId}.markPrice`}
              symbol={position.symbol}
            />,
            <SPETableNumber
              maw={100}
              key={`${position.positionId}.liquidationPrice`}
              value={position.liquidationPrice}
            />,
            <SPETableNumber
              key={`${position.positionId}.margin`}
              value={position.margin}
            />,
            <SPETableNumber
              key={`${position.positionId}.marginLevel`}
              value={position.margin}
            />,
            <SPEUnrealizedPnL
              key={`${position.positionId}.unRealizedPnl`}
              position={position}
            />,
            <AppButton
              key={`${position.positionId}.action`}
              size="xs"
              fz={12}
              styles={{
                root: {
                  background: "light-dark(#e9edf3, #414347)",
                  color: "light-dark(black, white)",
                },
              }}
              onClick={() => {
                closeOrderApi(
                  position.symbol,
                  (position.volume || 0).toString(),
                  position.side === OrderSide.BUY
                    ? OrderSide.SELL
                    : OrderSide.BUY,
                )
                  .then(() => {
                    notifications.show({
                      color: "green",
                      title: t("Position closed"),
                      message: t("Position has been "),
                      icon: (
                        <IconCheck
                          style={{
                            width: rem(18),
                            height: rem(18),
                          }}
                        />
                      ),
                      loading: false,
                      autoClose: 5000,
                      position: "top-center",
                    });
                  })
                  .catch(() => {
                    notifications.show({
                      color: "red",
                      title: t("Something went wrong"),
                      message: t("Cannot close position"),
                      icon: (
                        <IconCheck
                          style={{
                            width: rem(18),
                            height: rem(18),
                          }}
                        />
                      ),
                      loading: false,
                      autoClose: 5000,
                      position: "top-center",
                    });
                  });
              }}
            >
              {t("Close")}
            </AppButton>,
          ].filter(Boolean) as JSX.Element[];
        }),
      }}
    />
  );
}

function ClosedPnL({ symbol }: TabProps) {
  const fetch = useCallback(
    () => fetchClosedPositions(symbol),
    [symbol],
  );
  const positions = useSyncData<Position[]>(fetch);
  return (
    <SPETable
      tableData={{
        head: [
          "Symbol",
          "Direction",
          "Position Size",
          "Entry Price",
          "Closed Price",
          "PnL(%)",
          "Entry Time",
          "Closed Time",
          fetchOpenPositions,
        ].filter(Boolean) as string[],
        body: positions?.map((position) => {
          const isBuy = position.side === "BUY";
          const color = isBuy ? "green" : "red";
          return [
            <Symbol
              key={`${position.positionId}.symbol`}
              symbol={position.symbol}
              color={color}
            />,
            <Side
              key={`${position.positionId}.side`}
              side={position.side}
              color={color}
            />,
            <SPETableNumber
              maw={50}
              key={`${position.positionId}.volume`}
              value={position.maxOpenInterest}
            />,
            <SPETableNumber
              maw={100}
              key={`${position.positionId}.entryPrice`}
              value={position.entryPrice}
            />,
            <SPETableNumber
              maw={100}
              key={`${position.positionId}.averageClosePrice`}
              value={position.averageClosePrice || 1}
            />,
            <SPETableNumber
              maw={120}
              key={`${position.positionId}.realizedPnl`}
              value={position.realizedPnl}
            />,
            <SPETableDateTime
              key={`${position.positionId}.createdAt`}
              time={position.createdAt}
            />,
            <SPETableDateTime
              key={`${position.positionId}.closedAt`}
              time={position.closedAt || 0}
            />,
          ].filter(Boolean) as JSX.Element[];
        }),
      }}
    />
  );
}

function LoginOrRegister() {
  const navigate = useNavigate();
  const t = useTranslation();

  return (
    <Flex h={200} w={"100%"} align={"center"} justify={"center"}>
      {localStorage.__LANGUAGE__ === Language.EN && (
        <Flex align={"center"} justify={"center"} gap={5}>
          Please
          <AppText
            c={"primary"}
            instancetype="withPriceLong"
            style={{ cursor: "pointer" }}
            onClick={() => {
              const { pathname, search } = window.location;
              navigate(
                `/login?redirect=${encodeURIComponent(
                  pathname + search,
                )}`,
              );
            }}
          >
            {t("Log In")}
          </AppText>{" "}
          or
          <AppText
            c={"primary"}
            instancetype="withPriceLong"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            {t("Sign Up")}
          </AppText>{" "}
          first
        </Flex>
      )}
      {localStorage.__LANGUAGE__ === Language.JA && (
        <Flex align={"center"} justify={"center"} gap={5}>
          <AppText
            style={{ cursor: "pointer" }}
            onClick={() => {
              const { pathname, search } = window.location;
              navigate(
                `/login?redirect=${encodeURIComponent(
                  pathname + search,
                )}`,
              );
            }}
            instancetype="withPriceLong"
            c={"primary"}
          >
            {t("Log In")}
          </AppText>{" "}
          又は
          <AppText
            c={"primary"}
            instancetype="withPriceLong"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            {t("Sign Up")}
          </AppText>{" "}
          してください
        </Flex>
      )}
    </Flex>
  );
}

function More() {
  const t = useTranslation();
  const debug = true;
  if (debug) {
    return <></>;
  }
  return (
    <Box className="text-border-middle" my={20}>
      <AppText
        instancetype="WithTextTooltip"
        c={"#71757a"}
        styles={{
          root: {
            background: "light-dark(#ffffff, #101014)",
          },
        }}
        w={"fit-content"}
        mx={"auto"}
        px={10}
        display={"flex"}
        style={{ alignItems: "center", gap: 0 }}
      >
        {t(
          "Only the last 100 records are displayed on this page. To view more, check out",
        )}{" "}
        <AppText
          w={"fit-content"}
          fw={"bold"}
          instancetype="WithTextTooltip"
          component="a"
          href="#"
          display={"flex"}
          style={{ alignItems: "center", gap: 5 }}
        >
          {t("Transactions")}
          <IconArrowRight size={14} />
        </AppText>
      </AppText>
    </Box>
  );
}

function Side({ side, color }: { color: string; side: string }) {
  return (
    <Flex align={"center"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {side}
      </AppText>
    </Flex>
  );
}

function Symbol({
  symbol,
  color,
  miw,
}: {
  miw?: number;
  color: string;
  symbol: string;
}) {
  return (
    <Flex align={"center"} gap={8}>
      <Box bg={color} w={"2px"} h={30} />
      <Box miw={miw}>
        <AppText instancetype="WithCellToken" fz={12}>
          {symbol}
        </AppText>
      </Box>
    </Flex>
  );
}

function SPETableNumber({
  value,
  color,
  maw,
  decimalPlaces = 4,
}: {
  decimalPlaces?: number;
  maw?: number;
  value?: string | number;
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"start"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {!value ? (
          "---"
        ) : (
          <NumberFormat
            value={value || 0}
            decimalPlaces={decimalPlaces}
          />
        )}
      </AppText>
    </Flex>
  );
}

function SPETableDoubleNumbers({
  values,
  color,
  maw,
}: {
  maw?: number;
  values: [string | number, string | number];
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"end"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {values[0] ? (
          <NumberFormatter thousandSeparator value={values[0]} />
        ) : (
          "---"
        )}
        {" / "}
        {values[1] ? (
          <NumberFormatter thousandSeparator value={values[1]} />
        ) : (
          "---"
        )}
      </AppText>
    </Flex>
  );
}

function SPETableText({
  value,
  color,
  maw,
}: {
  maw?: number;
  value: string;
  color?: string;
}) {
  return (
    <Flex maw={maw} align={"center"} justify={"end"}>
      <AppText instancetype="WithCellToken" fz={12} c={color}>
        {value}
      </AppText>
    </Flex>
  );
}

function SPETableDateTime({ time }: { time: number }) {
  return (
    <Flex align={"end"}>
      <AppText instancetype="WithCellToken" fz={12}>
        {time ? new Date(time).toLocaleString() : "---"}
      </AppText>
    </Flex>
  );
}

function MarkPrice({ symbol }: { symbol: string }) {
  const { marketInformation } = tradeStore();
  return (
    <SPETableNumber value={marketInformation[symbol]?.markPrice} />
  );
}

function SPETable({ tableData }: { tableData: TableData }) {
  const t = useTranslation();

  return (
    <Flex direction={"column"} h={"100%"}>
      <Table.ScrollContainer minWidth={"100%"} h={"100%"}>
        <Table
          styles={{
            thead: {
              // background: "#101014",
              background: "light-dark(#ffffff, #101014)",
            },
          }}
          stickyHeader
          highlightOnHover
          withRowBorders={false}
          data={{
            ...tableData,
            head: tableData.head?.filter(Boolean).map((el) => {
              if (typeof el === "string") {
                return t(el);
              }
              return el;
            }),
          }}
          verticalSpacing={"xs"}
        />
        {tableData.body?.length === 0 && <NoDataRecord />}
      </Table.ScrollContainer>
      {tableData.body?.length === 100 && <More />}
    </Flex>
  );
}

function SPEUnrealizedPnL({ position }: { position: Position }) {
  const { marketInformation } = tradeStore();
  const unRealizedPnl = useMemo(() => {
    return profit(
      position.entryPrice,
      marketInformation[position.symbol]?.markPrice || 0,
      position.volume,
      position.side,
      position.fee,
    );
  }, [
    marketInformation,
    position.entryPrice,
    position.fee,
    position.side,
    position.symbol,
    position.volume,
  ]);
  return (
    <>
      <SPETableNumber value={unRealizedPnl} />
    </>
  );
}
