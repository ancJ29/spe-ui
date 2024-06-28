import AppTabs from "@/ui/Tabs";
import AppText from "@/ui/Text/AppText";
import { Box, Flex, HoverCard, NumberFormatter, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconArrowUp, IconFlag, IconFlagFilled } from "@tabler/icons-react";
import React from "react";


export function OrderBook() {
  return (
    <>
      <AppTabs
        instancetype="WithMediumNoBorder"
        defaultValue={"1"}
        showPanel
        items={[
          {
            data: {
              label: "Order Book",
              value: "1",
            },
            tabsPanelProps: {
              children: (
                <GridOrderBook />
              ),
              value: "positions",
            },
          },
          {
            data: {
              label: "Recent Trades",
              value: "2",
            },
            tabsPanelProps: {
              children: <GridRecentTrade />,
              value: "2",
            },
          },
        ]}
      />
    </>
  );
}


function GridOrderBook() {
  const { hovered, ref } = useHover();

  return (
    <>
      <>

        <Flex align={"center"} gap={20} py={10} pl={5} ref={ref} component="div">
          <Flex align={"center"} gap={5}>
            <IconArrowUp color={"#23b26b"} fontWeight={"bold"} />
            <Text fw={700} fz={"20px"} c={"#23b26b"}>0.022822</Text>
          </Flex>
          <Flex align={"center"} gap={5}>
            <IconFlagFilled color="#f6a600" size={16} />
            <Text fw={"bolder"} fz={12} c={"#f6a600"}>0.022832</Text>
          </Flex>
        </Flex>

        <div className="table-root">
          <div className="table-header">
            <Box className="table-row">
              <Box className="table-cell">
                <Box h={"24px"} pl={5}>
                  <div className="row-item-head--text">
                    <div>Price(USDT)</div>
                  </div>
                </Box>
              </Box>
              <Box className="table-cell" pr={5}>
                <Box h={"24px"}>
                  <div className="row-item-head--text">
                    <Flex justify={"end"} align={"center"}>
                      <div>Qty(ETH)</div>
                    </Flex>
                  </div>
                </Box>
              </Box>
              <Box className="table-cell" pr={5}>
                <Box h={"24px"} pr={5}>
                  <div className="row-item-head--text">
                    <Flex justify={"end"} align={"center"}>
                      <div>
                        Total(ETH)
                      </div>
                    </Flex>
                  </div>
                </Box>
              </Box>
            </Box>
          </div>
          <div className="table-body">
            {[...Array(20)].map((item, i) => (
              <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
                <HoverCard.Target>
                  <div className={hovered ? "table-row table-row--hovered" : "table-row"} ref={ref}>
                    <div className="table-cell">
                      <Box h={"24px"} pl={5}>
                        <Flex align={"center"}>
                          <div className="cell-text long">
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 0.1).toFixed(3)}
                            />
                          </div>
                        </Flex>
                      </Box>
                    </div>
                    <Box className="table-cell" pr={5}>
                      <div className="relative">
                        <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                        <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                          <div>
                            <NumberFormatter
                              decimalSeparator=","
                              value={(Math.random() * 100).toFixed(3)}
                            />
                          </div>
                        </Flex>
                      </div>
                    </Box>
                    <Box className="table-cell" pl={5} pr={5}>
                      <Box h={"24px"}>
                        <div className="relative">
                          <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                          <Flex h={"24px"} className="cell-text text-left progress_bar_text" align={"center"} justify={"end"}>
                            <div>
                              <NumberFormatter
                                decimalSeparator=","
                                value={(Math.random() * 100).toFixed(3)}
                              />
                            </div>
                          </Flex>
                        </div>
                      </Box>
                    </Box>
                  </div>
                </HoverCard.Target>
                <HoverCard.Dropdown styles={{
                  dropdown: {
                    background: "#26282c"
                  }
                }}>
                  <Box className="space-y-5">
                    <Flex justify={"space-between"}>
                      <Text fz={12}>
                        Avg. Price
                      </Text>
                      <Text fz={12} fw={"bold"} c={"#ffffff"}>= 61,423.93</Text>
                    </Flex>
                    <Flex justify={"space-between"}>
                      <Text fz={12}>
                        Total Qty (BTC)
                      </Text>
                      <Text fz={12} fw={"bold"} c={"#ffffff"}>0.885551</Text>
                    </Flex>
                    <Flex justify={"space-between"}>
                      <Text fz={12}>
                        Total Qty (USDT)
                      </Text>
                      <Text fz={12} fw={"bold"} c={"#ffffff"}>54.394K</Text>
                    </Flex>
                  </Box>
                </HoverCard.Dropdown>
              </HoverCard>
            ))}
          </div>
        </div>

      </>
    </>
  )
}

function GridRecentTrade() {
  return (
    <>
      <>
        <div className="head_item_grid">
          <div className="head_item_grid--item head_item_grid--item-20">
            <AppText fz={10}>Price(USDT)</AppText>
          </div>
          <div className="head_item_grid--item head_item_grid--item-40">
            <AppText fz={10}>Qty(ETH)</AppText>
          </div>
          <div className="head_item_grid--item head_item_grid--item-40">
            <AppText fz={10}>Total(ETH)</AppText>
          </div>
        </div>
        {[...Array(10)].map((item, i) => (
          <div className="row_item_grid" key={i}>
            <div className="row_item_grid--item row_item_grid--item-20">
              <AppText c={"red"} fz={12}>
                <NumberFormatter
                  thousandSeparator
                  value={3422.52}
                />
              </AppText>
            </div>
            <div className="row_item_grid--item row_item_grid--item-40">
              <AppText fz={12}>
                <NumberFormatter
                  thousandSeparator
                  value={Math.random() * 100}
                />
              </AppText>
            </div>
            <div className="row_item_grid--item row_item_grid--item-40">
              <AppText fz={12}>
                <NumberFormatter
                  thousandSeparator
                  value={Math.random() * 100}
                />
              </AppText>
            </div>
          </div>
        ))}
      </>
    </>
  )
}
