import { formatCurrency } from "@/utils";
import { Box, Flex, HoverCard, NumberFormatter, Select, SimpleGrid, Space, Text } from "@mantine/core";
import { IconArrowUp, IconCaretDownFilled, IconFlagFilled } from "@tabler/icons-react";

export function BidOrderBookTrade() {
  return (
    <>
      <Flex align={"center"} gap={20} pl={5} component="div">
        <Flex align={"center"} gap={5}>
          <IconArrowUp color={"#23b26b"} fontWeight={"bold"} />
          <Text fw={700} fz={"20px"} c={"#23b26b"}>0.022822</Text>
        </Flex>
        <HoverCard
          width={200}
          position="top"
          styles={{
            dropdown: {
              background: "#333537"
            }
          }}
        >
          <HoverCard.Target>
            <Flex
              align={"center"}
              gap={5}
              styles={{
                root: {
                  cursor: "help"
                }
              }}
            >
              <IconFlagFilled color="#f6a600" size={16} />
              <Box style={{ borderBottom: "dashed 1px #f6a600" }}>
                <Text fw={"bolder"} fz={16} c={"#f6a600"}>0.022832</Text>
              </Box>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text fz={12}>
                            Mark price is derived by index price and funding rate, and reflects the fair market price. Liquidation is triggered by mark price.
            </Text>
            <Space mb={10} />
            <Text c={"#f6a600"} fz={12} className="cursor-pointer">
                            Click here for details
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Flex>
      <Space mb={10} />
      <div className="table-root">
        <div className="table-header">
          <Box className="table-row">
            <Box className="table-cell">
              <Flex h={"24px"} pl={5} align={"center"}>
                <div className="row-item-head--text">
                  <div>Price(USDT)</div>
                </div>
              </Flex>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"}>
                <Box className="row-item-head--text" h={"100%"}>
                  <Flex justify={"end"} align={"center"} h={"100%"}>
                    <div>Qty(ETH)</div>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"} pr={5}>
                <Flex justify={"end"} align={"center"}>
                  <Select
                    w={120}
                    data={["Total(BTC)", "Total(USDT)"]}
                    defaultValue="Total(BTC)"
                    withCheckIcon={false}
                    rightSection={<IconCaretDownFilled size={14} />}
                    allowDeselect={false}
                    rightSectionWidth={25}
                    size="xs"
                    classNames={{
                      root: "app-select",
                      option: "app-select-option",
                    }}
                    comboboxProps={{
                      position: "bottom",
                      offset: 0,
                      withinPortal: true,
                    }}
                    styles={{
                      input: {
                        border: "none",
                        fontSize: "12px",
                        textAlign: "right",
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        fontWeight: "normal",
                        color: "white",
                        background: "none",
                        height: "24px",
                        minHeight: "unset"
                      },
                      option: {
                        fontSize: "12px",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      },
                    }}
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="table-body">
          {[...Array(15)].map((item, i) => (
            <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
              <HoverCard.Target>
                <div className={"table-row table-row-default"}>
                  <div className="table-cell">
                    <Box h={"24px"} pl={5}>
                      <Flex align={"center"}>
                        <div className="cell-text long">
                          <Text fz={12} c={"#23b26b"}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e6).toFixed(3)}
                            />
                          </Text>
                        </div>
                      </Flex>
                    </Box>
                  </div>
                  <Box className="table-cell" pr={5}>
                    <div className="relative">
                      <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                      <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                        <Text fz={12} c={"#ffffff"} fw={600}>
                          <NumberFormatter
                            thousandSeparator
                            value={(Math.random() * 10e6).toFixed(2)}
                          />
                        </Text>
                      </Flex>
                    </div>
                  </Box>
                  <Box className="table-cell" pl={5} pr={5}>
                    <Box h={"24px"}>
                      <div className="relative">
                        <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                        <Flex h={"24px"} className="cell-text text-left progress_bar_text" align={"center"} justify={"end"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            {/* <NumberFormatter
                                decimalSeparator=","
                                value={Math.random() * 10e6}
                              /> */}
                            {formatCurrency(Math.random() * 10e6)}
                          </Text>
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
              }}
              >
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
      <Space mt={10} />
      <HoverCard
        width={280}
        shadow="md"
        position="top"
        styles={{
          dropdown: {
            background: "#26282c"
          }
        }}
      >
        <HoverCard.Target>
          <Box px={10}>
            <Box pos={"relative"} className="cursor-pointer">
              <Box
                bg={"#172b23"}
                w={`${35}%`}
                h={20}
                pos={"absolute"}
                left={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0% 100%)"
                }}
              />
              <Box
                bg={"#35191e"}
                w={`${65}%`}
                h={20}
                pos={"absolute"}
                right={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(calc(0% + 5px) 0, 100% 0, 100% 100%, 0% 100%)"
                }}
              />
              <Flex
                justify={"space-between"}
                align={"center"}
                pos={"relative"}
                h={"100%"}
                styles={{
                  root: {
                    zIndex: 1
                  }
                }}
              >
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #23b26b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#23b26b"}
                  >B
                  </Flex>
                  <Text c={"#23b26b"} fz={12} fw={500}>{`${35}%`}</Text>
                </Flex>
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Text c={"#f0444b"} fz={12} fw={500}>{`${65}%`}</Text>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #f0444b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#f0444b"}
                  >S
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
                        Bid-Ask Ratio for the Top 20 Levels within the BTCUSDT Order Book
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
}


export function AskOrderBookTrade() {
  return (
    <>
      <div className="table-root">
        <div className="table-header">
          <Box className="table-row">
            <Box className="table-cell">
              <Flex h={"24px"} pl={5} align={"center"}>
                <div className="row-item-head--text">
                  <div>Price(USDT)</div>
                </div>
              </Flex>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"}>
                <Box className="row-item-head--text" h={"100%"}>
                  <Flex justify={"end"} align={"center"} h={"100%"}>
                    <div>Qty(ETH)</div>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"} pr={5}>
                <Flex justify={"end"} align={"center"}>
                  <Select
                    w={120}
                    data={["Total(BTC)", "Total(USDT)"]}
                    defaultValue="Total(BTC)"
                    withCheckIcon={false}
                    rightSection={<IconCaretDownFilled size={14} />}
                    allowDeselect={false}
                    rightSectionWidth={25}
                    size="xs"
                    classNames={{
                      root: "app-select",
                      option: "app-select-option",
                    }}
                    comboboxProps={{
                      position: "bottom",
                      offset: 0,
                      withinPortal: true,
                    }}
                    styles={{
                      input: {
                        border: "none",
                        fontSize: "12px",
                        textAlign: "right",
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        fontWeight: "normal",
                        color: "white",
                        background: "none",
                        height: "24px",
                        minHeight: "unset"
                      },
                      option: {
                        fontSize: "12px",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      },
                    }}
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="table-body">
          {[...Array(15)].map((item, i) => (
            <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
              <HoverCard.Target>
                <div className={"table-row table-row-reverse"}>
                  <div className="table-cell">
                    <Box h={"24px"} pl={5}>
                      <Flex align={"center"}>
                        <div className="cell-text long">
                          <Text fz={12} c={"#f0444b"}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e6).toFixed(3)}
                            />
                          </Text>
                        </div>
                      </Flex>
                    </Box>
                  </div>
                  <Box className="table-cell" pr={5}>
                    <div className="relative">
                      <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                      <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                        <Text fz={12} c={"#ffffff"} fw={600}>
                          <NumberFormatter
                            thousandSeparator
                            value={(Math.random() * 10e6).toFixed(2)}
                          />
                        </Text>
                      </Flex>
                    </div>
                  </Box>
                  <Box className="table-cell" pl={5} pr={5}>
                    <Box h={"24px"}>
                      <div className="relative">
                        <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                        <Flex h={"24px"} className="cell-text text-left progress_bar_text" align={"center"} justify={"end"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            {/* <NumberFormatter
                                decimalSeparator=","
                                value={Math.random() * 10e6}
                              /> */}
                            {formatCurrency(Math.random() * 10e6)}
                          </Text>
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
              }}
              >
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
      <Space mt={10} />
      <Flex align={"center"} gap={20} pl={5} component="div">
        <Flex align={"center"} gap={5}>
          <IconArrowUp color={"#23b26b"} fontWeight={"bold"} />
          <Text fw={700} fz={"20px"} c={"#23b26b"}>0.022822</Text>
        </Flex>
        <HoverCard
          width={200}
          position="top"
          styles={{
            dropdown: {
              background: "#333537"
            }
          }}
        >
          <HoverCard.Target>
            <Flex
              align={"center"}
              gap={5}
              styles={{
                root: {
                  cursor: "help"
                }
              }}
            >
              <IconFlagFilled color="#f6a600" size={16} />
              <Box style={{ borderBottom: "dashed 1px #f6a600" }}>
                <Text fw={"bolder"} fz={16} c={"#f6a600"}>0.022832</Text>
              </Box>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text fz={12}>
                            Mark price is derived by index price and funding rate, and reflects the fair market price. Liquidation is triggered by mark price.
            </Text>
            <Space mb={10} />
            <Text c={"#f6a600"} fz={12} className="cursor-pointer">
                            Click here for details
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Flex>
      <Space mt={10} />
      <HoverCard
        width={280}
        shadow="md"
        position="top"
        styles={{
          dropdown: {
            background: "#26282c"
          }
        }}
      >
        <HoverCard.Target>
          <Box px={10}>
            <Box pos={"relative"} className="cursor-pointer">
              <Box
                bg={"#172b23"}
                w={`${35}%`}
                h={20}
                pos={"absolute"}
                left={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0% 100%)"
                }}
              />
              <Box
                bg={"#35191e"}
                w={`${65}%`}
                h={20}
                pos={"absolute"}
                right={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(calc(0% + 5px) 0, 100% 0, 100% 100%, 0% 100%)"
                }}
              />
              <Flex
                justify={"space-between"}
                align={"center"}
                pos={"relative"}
                h={"100%"}
                styles={{
                  root: {
                    zIndex: 1
                  }
                }}
              >
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #23b26b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#23b26b"}
                  >B
                  </Flex>
                  <Text c={"#23b26b"} fz={12} fw={500}>{`${35}%`}</Text>
                </Flex>
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Text c={"#f0444b"} fz={12} fw={500}>{`${65}%`}</Text>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #f0444b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#f0444b"}
                  >S
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
                        Bid-Ask Ratio for the Top 20 Levels within the BTCUSDT Order Book
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
}


export function OrderAllOrderBookTrade() {
  return (
    <>
      <div className="table-root">
        <div className="table-header">
          <Box className="table-row">
            <Box className="table-cell">
              <Flex h={"24px"} pl={5} align={"center"}>
                <div className="row-item-head--text">
                  <div>Price(USDT)</div>
                </div>
              </Flex>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"}>
                <Box className="row-item-head--text" h={"100%"}>
                  <Flex justify={"end"} align={"center"} h={"100%"}>
                    <div>Qty(ETH)</div>
                  </Flex>
                </Box>
              </Box>
            </Box>
            <Box className="table-cell" pr={5}>
              <Box h={"24px"} pr={5}>
                <Flex justify={"end"} align={"center"}>
                  <Select
                    w={120}
                    data={["Total(BTC)", "Total(USDT)"]}
                    defaultValue="Total(BTC)"
                    withCheckIcon={false}
                    rightSection={<IconCaretDownFilled size={14} />}
                    allowDeselect={false}
                    rightSectionWidth={25}
                    size="xs"
                    classNames={{
                      root: "app-select",
                      option: "app-select-option",
                    }}
                    comboboxProps={{
                      position: "bottom",
                      offset: 0,
                      withinPortal: true,
                    }}
                    styles={{
                      input: {
                        border: "none",
                        fontSize: "12px",
                        textAlign: "right",
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                        fontWeight: "normal",
                        color: "white",
                        background: "none",
                        height: "24px",
                        minHeight: "unset"
                      },
                      option: {
                        fontSize: "12px",
                        textAlign: "center",
                        justifyContent: "center",
                        fontWeight: "bold"
                      },
                    }}
                  />
                </Flex>
              </Box>
            </Box>
          </Box>
        </div>
        <div className="table-body">
          {[...Array(9)].map((item, i) => (
            <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
              <HoverCard.Target>
                <div className={"table-row table-row-reverse"}>
                  <Box className="table-cell" w={"calc(100% / 3)"}>
                    <Box h={"24px"} pl={5}>
                      <Flex align={"center"}>
                        <div className="cell-text long">
                          <Text fz={12} c={"#f0444b"}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e6).toFixed(3)}
                            />
                          </Text>
                        </div>
                      </Flex>
                    </Box>
                  </Box>
                  <Box w={"calc(100% / 3)"} className="table-cell" pr={5}>
                    <div className="relative">
                      <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                      <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                        <Text fz={12} c={"#ffffff"} fw={600}>
                          <NumberFormatter
                            thousandSeparator
                            value={(Math.random() * 10e6).toFixed(2)}
                          />
                        </Text>
                      </Flex>
                    </div>
                  </Box>
                  <Box w={"calc(100% / 3)"} className="table-cell" pl={5} pr={5}>
                    <Box h={"24px"}>
                      <div className="relative">
                        <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                        <Flex h={"24px"} className="cell-text text-left progress_bar_text" align={"center"} justify={"end"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            {/* <NumberFormatter
                                decimalSeparator=","
                                value={Math.random() * 10e6}
                              /> */}
                            {formatCurrency(Math.random() * 10e6)}
                          </Text>
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
              }}
              >
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
      <Space mt={10} />
      <Flex align={"center"} gap={20} pl={5} component="div">
        <Flex align={"center"} gap={5}>
          <IconArrowUp color={"#23b26b"} fontWeight={"bold"} />
          <Text fw={700} fz={"20px"} c={"#23b26b"}>0.022822</Text>
        </Flex>
        <HoverCard
          width={200}
          position="top"
          styles={{
            dropdown: {
              background: "#333537"
            }
          }}
        >
          <HoverCard.Target>
            <Flex
              align={"center"}
              gap={5}
              styles={{
                root: {
                  cursor: "help"
                }
              }}
            >
              <IconFlagFilled color="#f6a600" size={16} />
              <Box style={{ borderBottom: "dashed 1px #f6a600" }}>
                <Text fw={"bolder"} fz={16} c={"#f6a600"}>0.022832</Text>
              </Box>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text fz={12}>
                            Mark price is derived by index price and funding rate, and reflects the fair market price. Liquidation is triggered by mark price.
            </Text>
            <Space mb={10} />
            <Text c={"#f6a600"} fz={12} className="cursor-pointer">
                            Click here for details
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>

      </Flex>
      <Space mt={10} />
      <div className="table-root">
        <div className="table-body">
          {[...Array(9)].map((item, i) => (
            <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
              <HoverCard.Target>
                <div className={"table-row table-row-default"}>
                  <Box w={"calc(100% / 3)"} className="table-cell">
                    <Box h={"24px"} pl={5}>
                      <Flex align={"center"}>
                        <div className="cell-text long">
                          <Text fz={12} c={"#23b26b"}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e6).toFixed(3)}
                            />
                          </Text>
                        </div>
                      </Flex>
                    </Box>
                  </Box>
                  <Box w={"calc(100% / 3)"} className="table-cell" pr={5}>
                    <div className="relative">
                      <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                      <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                        <Text fz={12} c={"#ffffff"} fw={600}>
                          <NumberFormatter
                            thousandSeparator
                            value={(Math.random() * 10e6).toFixed(2)}
                          />
                        </Text>
                      </Flex>
                    </div>
                  </Box>
                  <Box w={"calc(100% / 3)"} className="table-cell" pl={5} pr={5}>
                    <Box h={"24px"}>
                      <div className="relative">
                        <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                        <Flex h={"24px"} className="cell-text text-left progress_bar_text" align={"center"} justify={"end"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            {/* <NumberFormatter
                                decimalSeparator=","
                                value={Math.random() * 10e6}
                              /> */}
                            {formatCurrency(Math.random() * 10e6)}
                          </Text>
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
              }}
              >
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
      <Space mt={10} />
      <HoverCard
        width={280}
        shadow="md"
        position="top"
        styles={{
          dropdown: {
            background: "#26282c"
          }
        }}
      >
        <HoverCard.Target>
          <Box px={10}>
            <Box pos={"relative"} className="cursor-pointer">
              <Box
                bg={"#172b23"}
                w={`${35}%`}
                h={20}
                pos={"absolute"}
                left={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0% 100%)"
                }}
              />
              <Box
                bg={"#35191e"}
                w={`${65}%`}
                h={20}
                pos={"absolute"}
                right={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(calc(0% + 5px) 0, 100% 0, 100% 100%, 0% 100%)"
                }}
              />
              <Flex
                justify={"space-between"}
                align={"center"}
                pos={"relative"}
                h={"100%"}
                styles={{
                  root: {
                    zIndex: 1
                  }
                }}
              >
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #23b26b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#23b26b"}
                  >B
                  </Flex>
                  <Text c={"#23b26b"} fz={12} fw={500}>{`${35}%`}</Text>
                </Flex>
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Text c={"#f0444b"} fz={12} fw={500}>{`${65}%`}</Text>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #f0444b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#f0444b"}
                  >S
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
                        Bid-Ask Ratio for the Top 20 Levels within the BTCUSDT Order Book
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
}


export function OrderHorizontalOrderBookTrade() {
  return (
    <>
      <Flex align={"center"} gap={20} pl={5} component="div">
        <Flex align={"center"} gap={5}>
          <IconArrowUp color={"#23b26b"} fontWeight={"bold"} />
          <Text fw={700} fz={"20px"} c={"#23b26b"}>0.022822</Text>
        </Flex>
        <HoverCard
          width={200}
          position="top"
          styles={{
            dropdown: {
              background: "#333537"
            }
          }}
        >
          <HoverCard.Target>
            <Flex
              align={"center"}
              gap={5}
              styles={{
                root: {
                  cursor: "help"
                }
              }}
            >
              <IconFlagFilled color="#f6a600" size={16} />
              <Box style={{ borderBottom: "dashed 1px #f6a600" }}>
                <Text fw={"bolder"} fz={16} c={"#f6a600"}>0.022832</Text>
              </Box>
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text fz={12}>
                            Mark price is derived by index price and funding rate, and reflects the fair market price. Liquidation is triggered by mark price.
            </Text>
            <Space mb={10} />
            <Text c={"#f6a600"} fz={12} className="cursor-pointer">
                            Click here for details
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>

      </Flex>
      <Space mb={10} />
      <SimpleGrid
        cols={2}
        styles={{
          container: {
          },
          root: {
            gap: 10
          }
        }}
      >
        <div className="table-root">
          <div className="table-header">
            <Box className="table-row">
              <Box className="table-cell" pl={5}>
                <Box h={"24px"}>
                  <Box className="row-item-head--text" h={"100%"}>
                    <Flex justify={"start"} align={"center"} h={"100%"}>
                      <div>Qty(ETH)</div>
                    </Flex>
                  </Box>
                </Box>
              </Box>
              <Box className="table-cell">
                <Flex h={"24px"} pl={5} align={"center"} justify={"end"}>
                  <div className="row-item-head--text">
                    <div>Price(USDT)</div>
                  </div>
                </Flex>
              </Box>
            </Box>
          </div>
          <div className="table-body">
            {[...Array(15)].map((item, i) => (
              <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
                <HoverCard.Target>
                  <div className={"table-row table-row-default"}>
                    <Box className="table-cell" pl={5} w={"50%"}>
                      <div className="relative">
                        <Box className="progress_bar" left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                        <Flex h={"24px"} className="cell-text progress_bar_text" align={"center"} justify={"start"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e3).toFixed(2)}
                            />
                          </Text>
                        </Flex>
                      </div>
                    </Box>
                    <Box className="table-cell" w={"50%"}>
                      <Box h={"24px"} pl={5} pos={"relative"}>
                        <Box style={{ zIndex: 0 }} className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#162a24"}></Box>
                        <Flex
                          align={"center"}
                          justify={"end"}
                          pos={"relative"}
                          styles={{
                            root: {
                              zIndex: 1
                            }
                          }}
                        >
                          <div className="cell-text long">
                            <Text fz={12} c={"#23b26b"}>
                              <NumberFormatter
                                thousandSeparator
                                value={(Math.random() * 10e6).toFixed(3)}
                              />
                            </Text>
                          </div>
                        </Flex>
                      </Box>
                    </Box>
                  </div>
                </HoverCard.Target>
                <HoverCard.Dropdown styles={{
                  dropdown: {
                    background: "#26282c"
                  }
                }}
                >
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
        <div className="table-root">
          <div className="table-header">
            <Box className="table-row">
              <Box className="table-cell">
                <Flex h={"24px"} pr={5} align={"center"} justify={"end"}>
                  <div className="row-item-head--text">
                    <div>Price(USDT)</div>
                  </div>
                </Flex>
              </Box>
              <Box className="table-cell" pr={10}>
                <Box h={"24px"}>
                  <Box className="row-item-head--text" h={"100%"}>
                    <Flex justify={"end"} align={"center"} h={"100%"}>
                      <div>Qty(ETH)</div>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </div>
          <div className="table-body">
            {[...Array(15)].map((item, i) => (
              <HoverCard width={230} openDelay={0} closeDelay={0} shadow="md" key={i} position="left" withinPortal withArrow arrowPosition="center" arrowSize={14}>
                <HoverCard.Target>
                  <div className="table-row table-row-default">
                    <Box className="table-cell" w={"50%"}>
                      <Box h={"24px"} pl={5} pos={"relative"}>
                        <Box className="progress_bar" style={{ zIndex: 0 }} left={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                        <Flex align={"center"} justify={"end"} pos={"relative"} style={{ zIndex: 1 }}>
                          <div className="cell-text long">
                            <Text fz={12} c={"#f0444b"}>
                              <NumberFormatter
                                thousandSeparator
                                value={(Math.random() * 10e4).toFixed(3)}
                              />
                            </Text>
                          </div>
                        </Flex>
                      </Box>
                    </Box>
                    <Box className="table-cell" pr={5}  w={"50%"}>
                      <div className="relative">
                        <Box className="progress_bar" right={0} top={0} h={"24px"} w={`${Math.random() * 100}%`} pos={"absolute"} bg={"#35191d"}></Box>
                        <Flex h={"24px"} className="cell-text text-right progress_bar_text" align={"center"} justify={"end"}>
                          <Text fz={12} c={"#ffffff"} fw={600}>
                            <NumberFormatter
                              thousandSeparator
                              value={(Math.random() * 10e6).toFixed(2)}
                            />
                          </Text>
                        </Flex>
                      </div>
                    </Box>
                  </div>
                </HoverCard.Target>
                <HoverCard.Dropdown styles={{
                  dropdown: {
                    background: "#26282c"
                  }
                }}
                >
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
      </SimpleGrid>

      <Space mt={10} />
      <HoverCard
        width={280}
        shadow="md"
        position="top"
        styles={{
          dropdown: {
            background: "#26282c"
          }
        }}
      >
        <HoverCard.Target>
          <Box px={10}>
            <Box pos={"relative"} className="cursor-pointer">
              <Box
                bg={"#172b23"}
                w={`${35}%`}
                h={20}
                pos={"absolute"}
                left={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 5px) 100%, 0% 100%)"
                }}
              />
              <Box
                bg={"#35191e"}
                w={`${65}%`}
                h={20}
                pos={"absolute"}
                right={0}
                top={"50%"}
                style={{
                  transform: "translateY(-50%)",
                  clipPath: "polygon(calc(0% + 5px) 0, 100% 0, 100% 100%, 0% 100%)"
                }}
              />
              <Flex
                justify={"space-between"}
                align={"center"}
                pos={"relative"}
                h={"100%"}
                styles={{
                  root: {
                    zIndex: 1
                  }
                }}
              >
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #23b26b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#23b26b"}
                  >B
                  </Flex>
                  <Text c={"#23b26b"} fz={12} fw={500}>{`${35}%`}</Text>
                </Flex>
                <Flex align={"center"} gap={4} h={"100%"}>
                  <Text c={"#f0444b"} fz={12} fw={500}>{`${65}%`}</Text>
                  <Flex
                    align={"center"}
                    justify={"center"}
                    fz={10}
                    fw={600}
                    bd={"solid 1px #f0444b"}
                    w={20}
                    h={20}
                    style={{ textAlign: "center", borderRadius: "2px" }}
                    c={"#f0444b"}
                  >S
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
                        Bid-Ask Ratio for the Top 20 Levels within the BTCUSDT Order Book
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
}

