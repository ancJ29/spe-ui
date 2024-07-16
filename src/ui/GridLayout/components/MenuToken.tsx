import { ASSET_COIN_LIST, SYMBOL_LISTS } from "@/common/configs";
import { dailyChange } from "@/common/utils";
import useTranslation from "@/hooks/useTranslation";
import { IconSortUpDown } from "@/routes/copy-trade";
import tradeStore from "@/store/trade";
import { GridTradeProps } from "@/types";
import { AppCarousel } from "@/ui/Carousel/Carousel";
import { AppPopover } from "@/ui/Popover/AppPopover";
import AppText from "@/ui/Text/AppText";
import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Menu,
  Table,
  TableData,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconInfoSmall,
  IconMenu2,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

// const items = [
//   {
//     data: {
//       value: "Favorites",
//       label: "Favorites",
//       options: {
//         v1: ["Spot", "Derivatives"],
//         v2: [],
//       },
//     },
//   },
//   {
//     data: {
//       value: "Spot",
//       label: "Spot",
//       options: {
//         v1: [
//           "USDT",
//           "USDC",
//           "USDE",
//           "EUR",
//           "BTC",
//           "ETH",
//           "DAI",
//           "BRZ",
//         ],
//         v2: [
//           "All",
//           "New",
//           "0 Fees",
//           "Adventure Zone",
//           "SOL Ecosystem",
//           "ETH Ecosystem",
//           "BTC Ecosystem",
//           "AI",
//           "Modular-BCs",
//           "DePIN",
//           "LSD",
//           "DeFi",
//           "GameFi",
//           "Inscriptions",
//           "Meme",
//           "PoW",
//           "Stablecoin",
//           "Innovation Zone",
//           "ETP (Leveraged Tokens)",
//           "Margin Trading",
//           "Launchpool",
//           "Launchpad",
//         ],
//       },
//     },
//   },
//   {
//     data: {
//       value: "Perpetual",
//       label: "Perpetual",
//       options: {
//         v1: ["USDT", "USDC"],
//         v2: [
//           "TOP",
//           "Trending",
//           "New",
//           "Meme",
//           "BRC-20",
//           "AI",
//           "SOL Ecosystem",
//           "ETH Staking",
//           "Metaverse",
//           "DeFi",
//           "NFT",
//           "Web3",
//           "Innovation Zone",
//           "Layer1",
//           "Layer2",
//         ],
//       },
//     },
//   },
//   {
//     data: {
//       value: "Futures",
//       label: "Futures",
//       options: {
//         v1: ["USDC"],
//         v2: [],
//       },
//     },
//   },
//   {
//     data: {
//       value: "Options",
//       label: "Options",
//       options: {
//         v1: ["BTC", "ETH", "SOL"],
//         v2: [],
//       },
//     },
//   },
//   {
//     data: {
//       value: "Margin Trading",
//       label: "Margin Trading",
//       options: {
//         v1: ["USDT", "USDC", "BTC", "ETH"],
//         v2: [
//           "All",
//           "0 Fees",
//           "SOL Ecosystem",
//           "ETH Ecosystem",
//           "BTC Ecosystem",
//           "AI",
//           "Modular-BCs",
//           "DePIN",
//           "LSD",
//           "DeFi",
//           "GameFi",
//           "Inscriptions",
//           "Meme",
//           "PoW",
//           "Stablecoin",
//           "Innovation Zone",
//           "Margin Trading",
//           "Launchpool",
//         ],
//       },
//     },
//   },
// ];

export function MenuToken({ symbol, base, quote }: GridTradeProps) {
  const t = useTranslation();

  return (
    <>
      <Menu
        trigger="hover"
        withinPortal
        position="bottom-start"
        width={500}
        closeDelay={300}
      >
        <Menu.Target>
          <Flex align={"center"} gap={10}>
            <IconMenu2 />
            <Avatar src={`/images/${base.toLowerCase()}.svg`} />
            <div>
              <Flex align={"center"} gap={5}>
                <AppText instancetype="WithTokenIcon">
                  {symbol}
                </AppText>
                <AppPopover
                  withArrow={false}
                  position="bottom-start"
                  withinPortal
                  zIndex={99999}
                  target={(props) => ({
                    children: (
                      <ActionIcon
                        // eslint-disable-next-line react/prop-types
                        onMouseEnter={props.open}
                        variant="light"
                        radius={"100%"}
                        size={20}
                        // eslint-disable-next-line react/prop-types
                        onMouseLeave={props.close}
                      >
                        <IconInfoSmall />
                      </ActionIcon>
                    ),
                  })}
                  dropdown={() => ({
                    children: (
                      <AppText instancetype="WithTextTooltip">
                        {t(
                          "%s %s Perpetual,using %s itself as the collateral",
                          ASSET_COIN_LIST[base],
                          quote,
                          quote,
                        )}
                      </AppText>
                    ),
                  })}
                ></AppPopover>
              </Flex>

              <AppText instancetype="WithTextSubtitle">
                {t("%s Futures", quote)}
              </AppText>
            </div>
          </Flex>
        </Menu.Target>
        <Menu.Dropdown
          variant="transparent"
          style={
            {
              // border: "none",
              // borderRadius: 0 ,
            }
          }
        >
          {/* <Box px={4} pt={10}>
            <SearchBox />
          </Box>
          <Space mb={5} /> */}
          {/* <TabSmall /> */}
          <TableTokens />
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

// export function SearchBox(props: Partial<InputProps>) {
//   return (
//     <>
//       <Input
//         variant="filled"
//         placeholder=""
//         leftSection={<IconSearch size={16} />}
//         {...props}
//       />
//     </>
//   );
// }

// export function TabSmall() {
//   const [activeTab, setActiveTab] = useState<string>("Favorites");
//   const onChange = (value: string | null) => {
//     setActiveTab(value || "");
//   };
//   const v1 = useMemo(() => {
//     return items.find((i) => i.data.value === activeTab)?.data.options
//       .v1 as [];
//   }, [activeTab]);
//   const v2 = useMemo(() => {
//     return items.find((i) => i.data.value === activeTab)?.data.options
//       .v2 as [];
//   }, [activeTab]);

//   return (
//     <>
//       <AppTabs
//         onChange={onChange}
//         items={items}
//         defaultValue={activeTab}
//         instancetype="WithSmallOnMenu"
//       />
//       <Space mb={10} />
//       <Box>
//         <Flex gap={5}>
//           {v1.map((v, i) => (
//             <AppButton
//               key={i}
//               size="xs"
//               variant="light"
//               color="primary"
//               fz={12}
//             >
//               {v as string}
//             </AppButton>
//           ))}
//         </Flex>
//       </Box>
//       {v2.length > 0 && (
//         <>
//           <Space mb={10} />
//           <ListCateAsSlide items={v2} />
//         </>
//       )}
//       <Space mb={10} />
//     </>
//   );
// }

export function ListCateAsSlide(props: Partial<{ items: string[] }>) {
  return (
    <>
      {props.items && props.items.length > 0 && (
        <AppCarousel
          previousControlIcon={<IconChevronLeft size={18} />}
          nextControlIcon={<IconChevronRight size={18} />}
          className="appCarouselText"
          slideGap={10}
          slideSize={100}
          styles={{}}
        >
          {(props.items ?? []).map((v, k) => (
            <div
              key={k}
              style={{
                whiteSpace: "nowrap",
                padding: "0px 10px",
                cursor: "pointer",
              }}
            >
              <AppText fz={14} instancetype="WidthHoverMainColor">
                {v}
              </AppText>
            </div>
          ))}
        </AppCarousel>
      )}
    </>
  );
}

export function TableTokens() {
  const t = useTranslation();
  const { marketInformation } = tradeStore();
  const navigate = useNavigate();
  const tableData = (): TableData => {
    const _items = [
      [t("Trading Pairs")],
      [t("Price")],
      [t("24H %")],
      [t("Volume")],
    ];

    const _rows = SYMBOL_LISTS.map(
      ({ base, symbol, icon, quote, isFuture }, idx) => {
        const data = marketInformation[symbol];
        const { change24h } = dailyChange(
          data?.lastPrice || 0,
          data?.high || 0,
          data?.low || 0,
        );
        return [
          <Flex
            key={`${idx}.1`}
            align={"center"}
            gap={10}
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(
                isFuture
                  ? `/trade/futures/${base}/${quote}`
                  : `/trade/spot/${base}/${quote}`,
              );
            }}
          >
            {/* <IconStar size={15} /> */}
            <Group gap={7} align="center">
              <Avatar src={icon} size={20} />
              <AppText instancetype="WithCellTokenInMenu">
                {symbol}
              </AppText>
            </Group>
          </Flex>,
          <AppText key={1} fz={12} instancetype="withPriceCardTrade">
            {data?.markPrice?.toLocaleString() || "--"}
          </AppText>,
          <AppText
            key={`${idx}.2`}
            fz={12}
            instancetype="withPriceCardTrade"
            c={change24h > 0 ? "green" : "red"}
          >
            {/* {dayChange > 0 ? "+" : ""} {dayChange}% */}
            {t("N/A")}
          </AppText>,
          <AppText
            key={`${idx}.3`}
            fz={12}
            instancetype="withPriceCardTrade"
          >
            {t("N/A")}
          </AppText>,
        ];
      },
    );
    return {
      head: _items.map(([text], i) => {
        return (
          <div key={i}>
            <IconSortUpDown
              pos={2}
              text={
                <AppText instancetype="WithTheadInMenu">
                  {text}
                </AppText>
              }
            />
          </div>
        );
      }),
      body: _rows,
    };
  };
  return (
    <Table.ScrollContainer minWidth={"100%"} h={250}>
      <Table
        styles={{
          thead: {
            background:
              "light-dark(white, var(--mantine-color-dark-9))",
          },
        }}
        stickyHeader
        highlightOnHover
        withRowBorders={false}
        data={tableData()}
        verticalSpacing={"xs"}
      />
    </Table.ScrollContainer>
  );
}
