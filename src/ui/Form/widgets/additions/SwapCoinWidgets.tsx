import bigNumber from "@/common/big-number";
import { CoinType, iconsByCoin, textByCoin } from "@/domain/balance";
import {
  convertCoinToCoinUsingRate,
  SWAP_SYMBOL,
  SwapSideAsName,
} from "@/domain/marketPrice";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  NumberInput,
  Select,
  Space,
  Text,
} from "@mantine/core";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconSwitchVertical,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo } from "react";

export function CoinSwapWidget(props: WidgetProps) {
  const fromFieldAsName = ["symbolFrom"];
  const {
    formContext: { formData, updateField },
  } = props;
  const { balances, marketPrices } = useTradeStorageInfo();
  // const [_coin, setCoin] = useState<string | null>(null);

  useEffect(() => {
    const coinFirst = props.options.enumOptions[0].value;
    const isExist = props.options.enumOptions?.find(
      (i) => i.value === props.value,
    );
    if (isExist === undefined) {
      props.onChange(coinFirst);
    }
  }, [props.options.enumOptions]);

  const value = useMemo(() => {
    return balances.balances.find((bl) => bl.coin === props.value);
  }, [props.value, balances.balances]);

  console.log("PROPS", props.options.enumOptions);

  const coins = useMemo(() => {
    return props.options.enumOptions ?? [];
  }, [props.options.enumOptions]);

  const isFrom = useMemo(() => {
    return fromFieldAsName.includes(props.name);
  }, [props.name]);

  const onChangeCoin = useCallback(
    (v: string | null) => {
      // setCoin(v);
      // updateField(props.name, v);
      props.onChange(v);
    },
    [props.value],
  );

  const onChangeAmount = useCallback(
    (amount: number | string) => {
      updateField("volume", amount);
    },
    [props.value],
  );

  const addAll = useCallback(() => {
    updateField("amount", parseFloat(value?.amount as string));
  }, [value]);

  const outputAmount = useMemo(() => {
    // let am = new Decimal(formData.amount)
    // 1 USDT ≈ 0.00001727 BTC
    // 1 BTC ≈ 57,883.04 USDT
    // 1 USDT ≈ 0.00032621 ETH
    // 1 ETH ≈ 3,065.49 USDT
    if (!isFrom) {
      const info = convertCoinToCoinUsingRate(
        formData.symbolFrom,
        formData.symbolTo,
        marketPrices,
      );

      const coinBase1 = `${formData.symbolFrom}${formData.symbolTo}`;
      const coinBase2 = `${formData.symbolTo}${formData.symbolFrom}`;

      const baseValue1 = marketPrices[coinBase1 as SWAP_SYMBOL];
      const baseValue2 = marketPrices[coinBase2 as SWAP_SYMBOL];

      const rateExchange = baseValue1 ?? baseValue2;
      const isBaseCoin = baseValue1 != undefined;

      if (isBaseCoin) {
        return bigNumber.div(formData.volume, info.pairValue);
      } else {
        return bigNumber.mul(formData.volume, info.baseValue);
      }
    }
  }, [formData.volume]);

  const [dropdownOpened, { toggle, close }] = useDisclosure();
  const ref = useClickOutside(() => close());

  return (
    <>
      <Card
        shadow="none"
        radius={"16px"}
        styles={{
          root: {
            background:
              "light-dark(#f3f5f7, var(--mantine-color-dark-2))",
            overflow: "visible",
          },
        }}
      >
        <Flex justify={"space-between"}>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px",
              },
            }}
          >
            {isFrom ? "From" : "To"}
          </Text>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px",
              },
            }}
          >
            Available: {value?.coin}{" "}
            <NumberFormat value={value?.amount} decimalPlaces={8} />
          </Text>
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
                  margin: 0,
                },
              }}
              onClick={toggle}
              mb="md"
              ref={ref}
              justify="space-between"
              fullWidth
              rightSection={
                <>
                  {dropdownOpened ? (
                    <IconCaretUpFilled color="#81858d" size={15} />
                  ) : (
                    <IconCaretDownFilled color="#81858d" size={15} />
                  )}
                </>
              }
            >
              <Flex gap={8} align={"center"}>
                <Box>
                  <Image
                    w={"28px"}
                    h={"28px"}
                    src={iconsByCoin[props.value as CoinType]}
                  />
                </Box>
                <Flex direction={"column"} justify={"start"}>
                  <Text
                    fz={14}
                    fw={"bold"}
                    styles={{
                      root: {
                        textAlign: "left",
                      },
                    }}
                  >
                    {props.value}
                  </Text>
                  <Text fz={12} c={"#81858c"}>
                    {textByCoin[props.value as CoinType]}
                  </Text>
                </Flex>
              </Flex>
            </Button>
            <Select
              pos={"relative"}
              value={props.value}
              onChange={onChangeCoin}
              data={coins}
              allowDeselect={false}
              rightSection={
                <IconCaretDownFilled color="#81858d" size={15} />
              }
              renderOption={({ option, checked }) => {
                return (
                  <>
                    <Flex align={"center"} gap={10} w={"100%"}>
                      <Flex gap={5} align={"center"}>
                        <Image
                          w={"28px"}
                          h={"28px"}
                          src={iconsByCoin[option.value as CoinType]}
                        />
                        <Flex direction={"column"}>
                          <Text
                            fz={14}
                            fw={"bold"}
                            c={checked ? "primary" : "dark"}
                          >
                            {option.value}
                          </Text>
                          <Text fz={12} c={"#81858c"}>
                            {textByCoin[option.value as CoinType]}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </>
                );
              }}
              comboboxProps={{
                offset: 18,
                withinPortal: false,
                dropdownPadding: 0,
                styles: {
                  dropdown: {
                    // border: "none",
                    zIndex: 999999999,
                  },
                },
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
                  maxWidth: "unset",
                },
                section: {
                  opacity: 0,
                },
              }}
            />
          </Box>
          <Box
            pos={"absolute"}
            style={{
              right: "0px",
              bottom: "0px",
              width: "55%",
              zIndex: 3,
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
                  textAlign: "right",
                },
              }}
              rightSection={
                <>
                  {isFrom && (
                    <Flex
                      gap={8}
                      align={"center"}
                      justify={"end"}
                      w={"100%"}
                    >
                      <Box>
                        <Divider
                          h={"12px"}
                          color={"rgb(213, 218, 224)"}
                          orientation="vertical"
                          bg={"red"}
                        />
                      </Box>
                      <div onClick={() => addAll()}>
                        <Text
                          className="cursor-pointer"
                          c={"primary"}
                          fz={"16px"}
                          fw={600}
                          variant="transparent"
                          p={0}
                          m={0}
                        >
                          All
                        </Text>
                      </div>
                    </Flex>
                  )}
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

export function SwapSwitchWidget(props: WidgetProps) {
  const {
    formContext: { updateField, formData },
  } = props;

  const onChange = useCallback(() => {
    const isBuySide = props.value === SwapSideAsName.BUY;
    props.onChange(
      isBuySide ? SwapSideAsName.SELL : SwapSideAsName.BUY,
    );
    updateField(
      "side",
      isBuySide ? SwapSideAsName.SELL : SwapSideAsName.BUY,
    );
    updateField("symbolFrom", formData.symbolTo);
    updateField("symbolTo", formData.symbolFrom);
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

export function MarketPriceInfoWidget(props: WidgetProps) {
  const { marketPrices } = useTradeStorageInfo();
  const {
    formContext: { formData },
  } = props;
  const info = useMemo(() => {
    return convertCoinToCoinUsingRate(
      formData.symbolFrom,
      formData.symbolTo,
      marketPrices,
    );
  }, [formData.symbolFrom, formData.symbolTo, marketPrices]);

  return (
    <>
      <div>
        <Flex justify={"space-between"}>
          <Text c={"dimmed"}>Price</Text>
          <Flex direction={"column"} justify={"end"}>
            <Text
              styles={{
                root: {
                  textAlign: "right",
                },
              }}
              c={"dimmed"}
            >
              1 {info.pairCoin} ≈{" "}
              <NumberFormat
                value={info.pairValue}
                decimalPlaces={8}
              />{" "}
              {info.baseCoin}
            </Text>
            <Text c={"dimmed"}>
              1 {info.baseCoin} ≈{" "}
              <NumberFormat
                value={info.baseValue}
                decimalPlaces={8}
              />{" "}
              {info.pairCoin}
            </Text>
          </Flex>
        </Flex>
        <Space my={10} />
        <Box>
          <Text c={"dimmed"}>
            Notes: Due to market fluctuations, the final transaction
            results may be slightly different from the current display
            results.
          </Text>
        </Box>
      </div>
    </>
  );
}
