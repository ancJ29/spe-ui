import { ASSET_COIN_LIST, SYMBOL_LISTS } from "@/common/configs";
import useTranslation from "@/hooks/useTranslation";
import tradeStore from "@/store/trade";
import { GridTradeProps } from "@/types";
import { AppCarousel } from "@/ui/Carousel/Carousel";
import { IconSortUpDown } from "@/ui/IconSortUpDown/IconSortUpDown";
import NumberFormat from "@/ui/NumberFormat";
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

export function MenuToken({ symbol, base, quote }: GridTradeProps) {
  const t = useTranslation();

  return (
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
              <AppText instancetype="WithTokenIcon">{symbol}</AppText>
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
      <Menu.Dropdown variant="transparent">
        <TableTokens />
      </Menu.Dropdown>
    </Menu>
  );
}

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
        const change24h = Number(data.change || 0);
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
            <NumberFormat
              prefix={change24h > 0 ? "+" : ""}
              value={change24h}
              suffix="%"
              decimalPlaces={2}
            />
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
