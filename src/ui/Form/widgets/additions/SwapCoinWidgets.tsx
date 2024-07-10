import { CoinType, iconsByCoin, SWAP_MODE, textByCoin } from "@/domain/balance";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { ActionIcon, Box, Button, Card, Divider, Flex, Image, NumberInput, Select, Text } from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import { IconCaretDownFilled, IconCaretUpFilled, IconSwitchVertical } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Decimal from "decimal.js";

export function FromCoinSwapWidget(props: WidgetProps) {
  const { formContext: { formData } } = props;
  const { swapMode } = formData;

  return (
    <>
      {!swapMode && <InputCoinSwapOneToMany {...props} isFrom />}
      {swapMode && <InputCoinSwapManyToOne {...props} isFrom />}
    </>
  );
}

export function ToCoinSwapWidget(props: WidgetProps) {
  const { formContext: { formData } } = props;
  const { swapMode } = formData;
  return (
    <>
      {swapMode && <InputCoinSwapOneToMany {...props} />}
      {!swapMode && <InputCoinSwapManyToOne {...props} />}
    </>
  );
}

function InputCoinSwapOneToMany(props: WidgetProps & { isFrom?: boolean }) {
  const { isFrom, formContext: { formData } } = props;
  const {
    addAll,
    coins,
    onChangeAmount,
    value,
    outputAmount
  } = useInputCoinSwap(props);
  const [dropdownOpened, { toggle, close }] = useDisclosure();
  const ref = useClickOutside(() => close());

  return (
    <>
      <Card
        shadow="none"
        radius={"16px"}
        styles={{
          root: {
            background: "light-dark(#f3f5f7, var(--mantine-color-dark-2))",
          }
        }}
      >
        <Flex justify={"space-between"}>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px"
              }
            }}
          >{isFrom ? "From" : "To"}</Text>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px"
              }
            }}
          >Available: {value?.coin} {value?.amount}</Text>
        </Flex>
        <Box pos={"relative"} pt={11}>
          <Box pos={"relative"} bd={"1px"}>
            <Button
              disabled
              pos={"absolute"}
              top={0}
              left={0}
              styles={{
                root: {
                  background: "#f3f5f7",
                  color: "black",
                  zIndex: 2,
                  width: "fit-content",
                  padding: 0,
                  margin: 0
                }
              }}
              onClick={toggle}
              mb="md"
              ref={ref}
              justify="space-between"
              fullWidth
              rightSection={
                <>
                  {/* {dropdownOpened ? <IconCaretUpFilled color="#81858d" size={15} /> : <IconCaretDownFilled color="#81858d" size={15} />} */}
                </>
              }
            >
              <Flex gap={8} align={"center"}>
                <Box>
                  <Image w={"28px"} h={"28px"} src={iconsByCoin[formData.coin as CoinType]} />
                </Box>
                <Flex direction={"column"} justify={"start"}>
                  <Text
                    fz={14}
                    fw={"bold"}
                    styles={{
                      root: {
                        textAlign: "left"
                      }
                    }}
                  >{formData.coin}</Text>
                  <Text fz={12} c={"#81858c"}>{textByCoin[formData.coin as CoinType]}</Text>
                </Flex>
              </Flex>
            </Button>
            <Select
              pos={"relative"}
              dropdownOpened={false}
              data={coins}
              disabled={true}
              allowDeselect={false}
              rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
              renderOption={({ option, checked }) => {
                return <>
                  <Flex align={"center"} gap={10} w={"100%"}>
                    <Flex gap={5} align={"center"}>
                      <Image w={"28px"} h={"28px"} src={iconsByCoin[option.value as CoinType]} />
                      <Flex direction={"column"}>
                        <Text fz={14} fw={"bold"} c={checked ? "primary" : "dark"}>{option.value}</Text>
                        <Text fz={12} c={"#81858c"}>{textByCoin[option.value as CoinType]}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </>;
              }}
              comboboxProps={{
                offset: 18,
                withinPortal: true,
                dropdownPadding: 0,
                styles: {
                  dropdown: {
                    // border: "none",
                  }
                }
              }}
              styles={{
                root: {
                  zIndex: 1,
                },
                input: {
                  border: "none",
                  boxShadow: "none",
                  borderRadius: "0px",
                  background: "#f3f5f7",
                  fontWeight: "bold",
                  opacity: 0,
                },
                dropdown: {
                  borderRadius: "0px",
                  border: "none",
                  padding: "0px",
                  width: "500px",
                  maxWidth: "unset"
                },
                section: {
                  opacity: 0
                }

              }}
            />
          </Box>
          <Box
            pos={"absolute"}
            style={{
              right: "0px",
              bottom: "0px",
              width: "55%",
              zIndex: 2
            }}
          >
            <NumberInput
              hideControls
              size="xs"
              placeholder={isFrom ? "0.0005-2.9999" : "--"}
              rightSectionWidth={isFrom ? 40 : 0}
              disabled={!isFrom}
              value={isFrom ? formData.amount : outputAmount}
              onChange={onChangeAmount}
              styles={{
                input: {
                  border: "none",
                  background: "none",
                  fontWeight: "bold",
                  color: "#121214",
                  textAlign: "right"
                }
              }}
              rightSection={
                <>
                  {isFrom && <Flex gap={8} align={"center"} justify={"end"} w={"100%"}>
                    <Box>
                      <Divider h={"12px"} color={"rgb(213, 218, 224)"} orientation="vertical" bg={"red"} />
                    </Box>
                    <Box onClick={addAll}>
                      <Text className="cursor-pointer" c={"primary"} fz={"16px"} fw={600} variant="transparent" p={0} m={0} >All</Text>
                    </Box>
                  </Flex>}
                </>
              }
              rightSectionPointerEvents="all"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
}

function InputCoinSwapManyToOne(props: WidgetProps & { isFrom?: boolean }) {
  const { isFrom, formContext: { formData } } = props;
  const {
    addAll,
    coins,
    _coin,
    onChangeAmount,
    onChangeCoin,
    value,
    outputAmount

  } = useInputCoinSwap(props);
  const [dropdownOpened, { toggle, close }] = useDisclosure();
  const ref = useClickOutside(() => close());
  return (
    <>
      <Card
        shadow="none"
        radius={"16px"}
        styles={{
          root: {
            background: "light-dark(#f3f5f7, var(--mantine-color-dark-2))",
            overflow: "visible"
          }
        }}
      >
        <Flex justify={"space-between"}>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px"
              }
            }}
          >{isFrom ? "From" : "To"}</Text>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px"
              }
            }}
          >Available: {value?.coin} {value?.amount}</Text>
        </Flex>
        <Box pos={"relative"} pt={11}>
          <Box pos={"relative"} bd={"1px"}>
            <Button
              pos={"absolute"}
              top={0}
              left={0}
              styles={{
                root: {
                  background: "#f3f5f7",
                  color: "black",
                  zIndex: 2,
                  width: "fit-content",
                  padding: 0,
                  margin: 0
                }
              }}
              onClick={toggle}
              mb="md"
              ref={ref}
              justify="space-between"
              fullWidth
              rightSection={
                <>
                  {dropdownOpened ? <IconCaretUpFilled color="#81858d" size={15} /> : <IconCaretDownFilled color="#81858d" size={15} />}
                </>
              }
            >
              <Flex gap={8} align={"center"}>
                <Box>
                  <Image w={"28px"} h={"28px"} src={iconsByCoin[_coin as CoinType]} />
                </Box>
                <Flex direction={"column"} justify={"start"}>
                  <Text
                    fz={14}
                    fw={"bold"}
                    styles={{
                      root: {
                        textAlign: "left"
                      }
                    }}
                  >{_coin}</Text>
                  <Text fz={12} c={"#81858c"}>{textByCoin[_coin as CoinType]}</Text>
                </Flex>
              </Flex>
            </Button>
            <Select
              pos={"relative"}
              onChange={onChangeCoin}
              value={_coin}
              data={coins}
              allowDeselect={false}
              rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
              renderOption={({ option, checked }) => {
                return <>
                  <Flex align={"center"} gap={10} w={"100%"}>
                    <Flex gap={5} align={"center"}>
                      <Image w={"28px"} h={"28px"} src={iconsByCoin[option.value as CoinType]} />
                      <Flex direction={"column"}>
                        <Text fz={14} fw={"bold"} c={checked ? "primary" : "dark"}>{option.value}</Text>
                        <Text fz={12} c={"#81858c"}>{textByCoin[option.value as CoinType]}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </>;
              }}
              comboboxProps={{
                offset: 18,
                withinPortal: false,
                dropdownPadding: 0,
                styles: {
                  dropdown: {
                    // border: "none",
                    zIndex: 999999999
                  },

                }
              }}
              styles={{
                root: {
                  zIndex: 3,
                },
                input: {
                  border: "none",
                  boxShadow: "none",
                  borderRadius: "0px",
                  background: "#f3f5f7",
                  fontWeight: "bold",
                  opacity: 0,
                },
                dropdown: {
                  borderRadius: "0px",
                  border: "none",
                  padding: "0px",
                  width: "500px",
                  maxWidth: "unset"
                },
                section: {
                  opacity: 0
                }

              }}
            />
          </Box>
          <Box
            pos={"absolute"}
            style={{
              right: "0px",
              bottom: "0px",
              width: "55%",
              zIndex: 3
            }}
          >
            <NumberInput
              hideControls
              size="xs"
              placeholder={isFrom ? "0.0005-2.9999" : "--"}
              rightSectionWidth={isFrom ? 40 : 0}
              disabled={!isFrom}
              value={isFrom ? formData.amount : outputAmount}
              onChange={onChangeAmount}
              styles={{
                input: {
                  border: "none",
                  background: "none",
                  fontWeight: "bold",
                  color: "#121214",
                  textAlign: "right"
                }
              }}
              rightSection={
                <>
                  {isFrom && <Flex gap={8} align={"center"} justify={"end"} w={"100%"}>
                    <Box>
                      <Divider h={"12px"} color={"rgb(213, 218, 224)"} orientation="vertical" bg={"red"} />
                    </Box>
                    <div onClick={() => addAll()}>
                      <Text className="cursor-pointer" c={"primary"} fz={"16px"} fw={600} variant="transparent" p={0} m={0} >All</Text>
                    </div>
                  </Flex>}
                </>
              }
              rightSectionPointerEvents="all"
            />
          </Box>
        </Box>
      </Card>
    </>
  );
}

function useInputCoinSwap(props: WidgetProps) {
  const { balances } = useTradeStorageInfo();
  const { formContext: { formData, updateField }, isFrom } = props;
  const [_coin, setCoin] = useState<string | null>(null);
  const { coin, swapMode } = formData;
  const value = useMemo(() => {
    return balances.balances.find(bl => bl.coin === _coin);
  }, [_coin, balances.balances]);

  const coins = useMemo(() => {
    return balances.balances.filter(i => i.coin != coin && i.name === "FUNDING ACCOUNT").map(item => ({
      ...item,
      value: item.coin,
      label: item.coin
    }));
  }, [balances.balances, _coin]);

  useEffect(() => {
    if (coins[0]) {
      const _coin = coins[0].coin as string;
      setCoin(_coin);
      // updateField("coin", _coin)
      updateField(isFrom ? "fromAccountId" : "toAccountId", coins[0].accountId);
    }
  }, [balances.balances]);

  const onChangeCoin = useCallback((v: string | null) => {
    setCoin(v);
    const coin = balances.balances.find(i => i.coin == v);
    if (coin) {
      updateField(isFrom ? "fromAccountId" : "toAccountId", coin.accountId);
    }

  }, [_coin, coin]);

  const onChangeAmount = useCallback((amount: number | string) => {
    updateField("amount", amount);
  }, [_coin, coin]);

  const addAll = useCallback(() => {
    updateField("amount", parseFloat(value?.amount as string));
  }, [value]);

  const outputAmount = useMemo(() => {
    // let am = new Decimal(formData.amount)
    // 1 USDT ≈ 0.00001727 BTC
    // 1 BTC ≈ 57,883.04 USDT
    // 1 USDT ≈ 0.00032621 ETH
    // 1 ETH ≈ 3,065.49 USDT
    return formData.amount * 0.02;
  }, [formData.amount]);

  return {
    addAll,
    coins,
    _coin,
    setCoin,
    onChangeAmount,
    onChangeCoin,
    swapMode,
    value,
    balances,
    outputAmount
  };
}

export function SwapSwitchWidget(props: WidgetProps) {
  const { formContext: { updateField } } = props;
  const onChange = useCallback(() => {
    // props.onChange(!props.value)
    updateField("amount", undefined);
    updateField("swapMode", !props.value);

  }, [props.value]);
  return (
    <>
      <Flex justify={"center"}>
        <ActionIcon
          onClick={onChange}
          radius={"xl"}
          variant="gradient"
          size={"lg"}
          gradient={{ from: "primary", to: "yellow", deg: 90 }}
        >
          <IconSwitchVertical color="black" size={20} />
        </ActionIcon>
      </Flex>
    </>
  );
}


