import BN from "@/common/big-number";
import { ASSET_COIN_LIST, SWAP_RATE } from "@/common/configs";
import { buildOptions, freeAmount } from "@/common/utils";
import { ASSET_COIN_OPTIONS, COIN_IMAGES } from "@/domain/config";
import {
  convertCoinToCoinUsingRate,
  SwapSideAsName,
} from "@/domain/marketPrice";
import useTranslation from "@/hooks/useTranslation";
import { fetchDepositAddressApi } from "@/services/apis";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import NumberFormat from "@/ui/NumberFormat";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  CopyButton,
  Divider,
  Flex,
  Image,
  InputLabel,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useClickOutside,
  useDisclosure,
  useFocusTrap,
} from "@mantine/hooks";
import { WidgetProps } from "@rjsf/utils";
import {
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconCopy,
  IconSwitchVertical,
} from "@tabler/icons-react";
import { cloneDeep } from "lodash";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useMemo } from "react";

const lines: Record<string, string[]> = {
  USDT: [
    "Please don't deposit any other digital assets except USDT to the above address. Any other assets except USDT will not be recovered.",
    "USDT will be received only after 12 block confirmation, and it will be available to withdraw after 20 block confirmations",
    "The system will update the cryptocurrency address in stages. Please check your account regularly. Failure to do so may result in losses on your asset.",
    "Minimum deposit amount is 1. Any amount less than this will not be credited.",
  ],
  ETH: [
    "Please don't deposit any other digital assets except ETH to the above address. Any other assets except ETH will not be recovered.",
    "ETH will be received only after 64 block confirmation, and it will be available to withdraw after 64 block confirmations",
    "The system will update the cryptocurrency address in stages. Please check your account regularly. Failure to do so may result in losses on your asset.",
    "Minimum deposit amount is 0.001. Any amount less than this will not be credited.",
    "You can only deposit ETH via the functions of transfer or transfer From on Etherum network. We apologize that deposit via other functions will not be credited.",
    "We are currently not supporting Coinbase transfer. The transfer of Coinbase will not be credited. Thank you for your understanding",
    "You can only deposit ETH via the functions of transfer or transfer From on Etherum network. We apologize that deposit via other functions will not be credited.",
  ],
  BTC: [
    "Please don't deposit any other digital assets except BTC to the above address. Any other assets except BTC will not be recovered.",
    "BTC will be received only after 4 block confirmation, and it will be available to withdraw after 4 block confirmations",
    "The system will update the cryptocurrency address in stages. Please check your account regularly. Failure to do so may result in losses on your asset.",
    "Minimum deposit amount is 0.0001. Any amount less than this will not be credited.",
  ],
};

export function InfoDepositCoinWidget(props: WidgetProps) {
  const {
    formContext: { formData },
  } = props;
  const t = useTranslation();
  return (
    <>
      <div>
        <Text c={"dimmed"} fw={"bold"}>
          Tips
        </Text>
        <ol
          className="space-y-6"
          style={{
            color: "gray",
          }}
        >
          {(lines[formData.coin] || []).map((line, index) => (
            <li key={index}>
              <Text c={"dimmed"} fz={14}>
                {t(line)}
              </Text>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export function SelectCoinWidget(props: WidgetProps) {
  return (
    <>
      <Select
        placeholder={props.placeholder}
        value={props.value}
        data={ASSET_COIN_OPTIONS}
        onChange={(v) => props.onChange(v)}
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        renderOption={renderCoinSelectOption}
        allowDeselect={false}
        leftSection={
          <>
            <Image
              w={"22px"}
              h={"22px"}
              src={COIN_IMAGES[props.value]}
            />
          </>
        }
        rightSection={
          <IconCaretDownFilled color="#81858d" size={15} />
        }
        comboboxProps={{
          offset: 0,
          withinPortal: false,
        }}
        styles={{
          root: {},
          input: {
            border: "none",
            boxShadow: "none",
            borderRadius: "0px",
            background: "#f3f5f7",
            fontWeight: "bold",
          },
          dropdown: {
            borderRadius: "0px",
            border: "none",
            padding: "0px",
          },
        }}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function SelectChainWidget(props: WidgetProps) {
  const options = useMemo(() => {
    return cloneDeep(props.options.enumOptions);
  }, [props.options.enumOptions]);
  return (
    <>
      <Select
        placeholder={props.placeholder}
        value={props.value}
        data={options}
        onChange={(v) => props.onChange(v)}
        allowDeselect={false}
        rightSection={
          <IconCaretDownFilled color="#81858d" size={15} />
        }
        renderOption={({ option, checked }) => {
          return (
            <Text
              fz={16}
              fw={"bold"}
              c={checked ? "primary" : "dark"}
            >
              {option.value}
            </Text>
          );
        }}
        comboboxProps={{
          offset: 0,
          withinPortal: false,
        }}
        styles={{
          root: {},
          input: {
            border: "none",
            boxShadow: "none",
            borderRadius: "0px",
            background: "#f3f5f7",
            fontWeight: "bold",
          },
          dropdown: {
            borderRadius: "0px",
            border: "none",
            padding: "0px",
          },
        }}
        label={props.label ? props.label : ""}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function QrCodeWidget(props: WidgetProps) {
  const {
    formContext: { formData },
  } = props;
  const t = useTranslation();
  useEffect(() => {
    const coin = formData.coin;
    const chain = formData?.[`info${coin}`]?.chain;
    if (coin && chain) {
      fetchDepositAddressApi({ coin, chain }).then(
        (depositAddress) => {
          props.onChange(depositAddress);
        },
      );
    }
  }, [formData, props]);

  return (
    <>
      <Box>
        <InputLabel className="mantine-InputWrapper-label">
          {t("Confirm deposit details")}
        </InputLabel>
      </Box>
      <Flex
        py={20}
        px={20}
        align={"center"}
        justify={"center"}
        gap={20}
        styles={{
          root: {
            background: "#f3f5f7",
            borderRadius: "10px",
          },
        }}
      >
        <Box w={"70%"}>
          <TextInput
            styles={{
              input: {
                background: "light-dark(white, white)",
                border: "none",
                fontWeight: "bolder",
                fontSize: "14px",
              },
              label: {
                color: "#8a8e96",
                fontSize: "14px",
              },
            }}
            label={`${formData.coin} ${t("Address")}`}
            value={props.value || ""}
            readOnly
            rightSectionWidth={80}
            rightSection={
              <CopyButton value={props.value || ""}>
                {({ copied, copy }) => (
                  <Button
                    fullWidth
                    p={0}
                    variant="transparent"
                    color={copied ? "teal" : "primary"}
                    onClick={copy}
                  >
                    <Flex
                      gap={5}
                      align={"center"}
                      justify={"end"}
                      fz={12}
                    >
                      {copied ? t("Copied") : t("Copy")}
                      <IconCopy size={20} />
                    </Flex>
                  </Button>
                )}
              </CopyButton>
            }
          />
        </Box>
        <Box>
          <QRCodeSVG value={props.value} />
        </Box>
      </Flex>
    </>
  );
}

export function AmountWidget(props: WidgetProps) {
  const {
    formContext: { formData },
  } = props;

  return (
    <>
      <NumberInput
        hideControls
        onChange={(v) => props.onChange(v)}
        styles={{
          input: {
            background: "#f3f5f7",
            border: "none",
            fontWeight: "bolder",
          },
        }}
        rightSectionWidth={80}
        rightSection={<Text fw={"bold"}>{formData?.coin}</Text>}
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function AmountToWithdrawWidget({
  value,
  label,
  required,
  options,
  onChange,
  formContext: { formData },
}: WidgetProps) {
  const t = useTranslation();
  const { fundingBalances } = useTradeStorageInfo();
  const balanceByCoin = useMemo(() => {
    if (!formData.coin) {
      return 0;
    }
    return freeAmount(
      fundingBalances.find((el) => el.coin === formData.coin) || {},
    );
  }, [fundingBalances, formData?.coin]);

  const isZero = useMemo(
    () => Number(balanceByCoin) === 0,
    [balanceByCoin],
  );

  return (
    <>
      <Box pos={"relative"}>
        <NumberInput
          hideControls
          value={value}
          disabled={isZero}
          label={label || ""}
          withAsterisk={required}
          rightSectionWidth={120}
          onChange={(v) => onChange(v)}
          rightSectionPointerEvents="all"
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              cursor: isZero ? "not-allowed" : "pointer",
              background: "#f3f5f7",
              border: "none",
              fontWeight: "bolder",
            },
          }}
          rightSection={
            <Flex
              w={"100%"}
              gap={8}
              justify={"end"}
              pr={10}
              align={"center"}
            >
              <Text
                fw="bold"
                c="primary"
                className={isZero ? "" : "cursor-pointer"}
                onClick={() => !isZero && onChange(balanceByCoin)}
              >
                {t("All")}
              </Text>
              <Divider h={12} c={"red"} bg={"gray"} w={1} />
              <Text fw={"bold"}>{formData?.coin}</Text>
            </Flex>
          }
          {...(options?.props as any)} // eslint-disable-line
        />
        <Flex
          justify={"end"}
          pos={"absolute"}
          top={"calc(100% + 5px)"}
          right={0}
        >
          <Text fz={12} fw={"bold"} c="dimmed">
            {t("Total")}:{" "}
            <NumberFormat value={balanceByCoin} decimalPlaces={8} />{" "}
            {formData?.coin}
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export function AmountToTransferWidget({
  value,
  label,
  required,
  options,
  onChange,
  formContext: { formData },
}: WidgetProps) {
  const t = useTranslation();
  const { balances } = useTradeStorageInfo();
  const balanceByCoin = useMemo(() => {
    if (!formData.fromAccountId || !formData.coin) {
      return 0;
    }
    return freeAmount(
      balances
        .filter((el) => el.accountId === formData.fromAccountId)
        .find((el) => el.coin === formData.coin) || {},
    );
  }, [balances, formData?.coin, formData.fromAccountId]);

  const isZero = useMemo(
    () => Number(balanceByCoin) === 0,
    [balanceByCoin],
  );

  return (
    <>
      <Box pos={"relative"}>
        <NumberInput
          hideControls
          value={value}
          disabled={isZero}
          label={label || ""}
          withAsterisk={required}
          rightSectionWidth={120}
          onChange={(v) => onChange(v)}
          rightSectionPointerEvents="all"
          styles={{
            label: {
              fontSize: "14px",
            },
            input: {
              fontSize: "14px",
              cursor: isZero ? "not-allowed" : "pointer",
              background: "#f3f5f7",
              border: "none",
              fontWeight: "bolder",
            },
          }}
          rightSection={
            <Flex
              w={"100%"}
              gap={8}
              justify={"end"}
              pr={10}
              align={"center"}
            >
              <Text
                fw="bold"
                c="primary"
                className={isZero ? "" : "cursor-pointer"}
                onClick={() => !isZero && onChange(balanceByCoin)}
              >
                {t("All")}
              </Text>
              <Divider h={12} c={"red"} bg={"gray"} w={1} />
              <Text fw={"bold"}>{formData?.coin}</Text>
            </Flex>
          }
          {...(options?.props as any)} // eslint-disable-line
        />
        <Flex
          justify={"end"}
          pos={"absolute"}
          top={"calc(100% + 5px)"}
          right={0}
        >
          <Text fz={12} fw={"bold"} c="dimmed">
            {t("Total")}:{" "}
            <NumberFormat value={balanceByCoin} decimalPlaces={8} />{" "}
            {formData?.coin}
          </Text>
        </Flex>
      </Box>
    </>
  );
}

export function WithdrawAddressWidget(props: WidgetProps) {
  return (
    <>
      <TextInput
        onChange={(v) => props.onChange(v.target.value)}
        value={props.value}
        styles={{
          label: {
            fontSize: "14px",
          },
          input: {
            fontSize: "14px",
            background: "#f3f5f7",
            border: "none",
            fontWeight: "bolder",
          },
        }}
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function SelectAccountWidget(props: WidgetProps) {
  const { accounts } = useTradeStorageInfo();
  const options = useMemo(
    () => buildOptions(accounts, "name", "id"),
    [accounts],
  );

  return (
    <Select
      withAsterisk={props.required}
      label={props.label ? props.label : ""}
      placeholder={props.placeholder}
      value={props.value}
      data={options}
      onChange={(v) => {
        props.onChange(v);
        if ("amount" in props.formContext.formData) {
          if (props.formContext.formData.amount) {
            props.formContext.updateFields({
              amount: 0,
            });
          }
        }
      }}
      allowDeselect={false}
      rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
      renderOption={({ option, checked }) => {
        return (
          <Text fz={14} fw={"bold"} c={checked ? "primary" : "dark"}>
            {option.label}
          </Text>
        );
      }}
      comboboxProps={{
        offset: 0,
        withinPortal: false,
      }}
      styles={{
        root: {},
        input: {
          border: "none",
          boxShadow: "none",
          borderRadius: "0px",
          background: "#f3f5f7",
          fontWeight: "bold",
        },
        dropdown: {
          borderRadius: "0px",
          border: "none",
          padding: "0px",
        },
      }}
      {...(props.options?.props as any)} // eslint-disable-line
    />
  );
}

export function CoinSwapWidget(props: WidgetProps) {
  const t = useTranslation();
  const focusTrapRef = useFocusTrap();

  const {
    formContext: { formData, updateFields },
  } = props;
  const { fundingBalances, marketPrices } = useTradeStorageInfo();

  useEffect(() => {
    const coinFirst = props.options.enumOptions?.[0].value;
    const isExist = props.options.enumOptions?.find(
      (i) => i.value === props.value,
    );
    if (isExist === undefined) {
      props.onChange(coinFirst);
    }
  }, [props, props.options.enumOptions]);

  const balance = useMemo(() => {
    return fundingBalances.find((el) => el.coin === props.value);
  }, [props.value, fundingBalances]);

  const coins = useMemo(() => {
    return props.options.enumOptions ?? [];
  }, [props.options.enumOptions]);

  const isFrom = useMemo(() => {
    return props.name === "symbolFrom";
  }, [props.name]);

  const addAll = useCallback(() => {
    updateFields({
      volume: parseFloat(balance?.amount as string),
    });
  }, [updateFields, balance?.amount]);

  const outputAmount = useMemo(() => {
    if (isFrom) {
      return formData.volume;
    }
    const info = convertCoinToCoinUsingRate(
      formData.symbolFrom,
      formData.symbolTo,
      marketPrices,
    );
    if (formData.side === SwapSideAsName.BUY) {
      return BN.mul(
        BN.div(formData.volume, info.price),
        1 - SWAP_RATE,
      );
    }
    return BN.mul(formData.volume, info.price, 1 - SWAP_RATE);
  }, [
    formData.side,
    formData.symbolFrom,
    formData.symbolTo,
    formData.volume,
    isFrom,
    marketPrices,
  ]);

  const [dropdownOpened, { toggle, close }] = useDisclosure();
  const ref = useClickOutside(() => close());

  return (
    <>
      <Card
        key={props.value}
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
            {isFrom ? t("From") : t("To")}
          </Text>
          <Text
            c={"dimmed"}
            styles={{
              root: {
                fontSize: "14px",
              },
            }}
          >
            {t("Available")}: {balance?.coin}{" "}
            <NumberFormat value={balance?.amount} decimalPlaces={8} />
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
                    src={COIN_IMAGES[props.value]}
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
                    {ASSET_COIN_LIST[props.value]}
                  </Text>
                </Flex>
              </Flex>
            </Button>
            <Select
              pos={"relative"}
              value={props.value}
              onChange={(v) => props.onChange(v)}
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
                          src={COIN_IMAGES[option.value]}
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
                            {ASSET_COIN_LIST[option.value]}
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
              ref={focusTrapRef}
              placeholder={isFrom ? "0.0005-2.9999" : "--"}
              rightSectionWidth={isFrom ? 30 : 0}
              disabled={!isFrom}
              value={isFrom ? formData.volume : outputAmount}
              onChange={(amount) => updateFields({ volume: amount })}
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
                      <Text
                        onClick={() => addAll()}
                        className="cursor-pointer"
                        c={"primary"}
                        fz={"16px"}
                        fw={600}
                        style={{
                          border: "none",
                        }}
                        variant="transparent"
                        p={0}
                        m={0}
                      >
                        {t("All")}
                      </Text>
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

export function SwapSwitchWidget({
  value,
  formContext: { updateFields, formData },
}: WidgetProps) {
  return (
    <>
      <Flex justify={"center"}>
        <ActionIcon
          onClick={() => {
            const to = formData.symbolFrom;
            const from = formData.symbolTo;
            const side =
              value === SwapSideAsName.BUY
                ? SwapSideAsName.SELL
                : SwapSideAsName.BUY;
            updateFields({
              side,
              symbolFrom: from,
              symbolTo: to,
              volume: 0,
            });
          }}
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

export function FundingAccountWidget(props: WidgetProps) {
  const { fundingAccount } = useTradeStorageInfo();
  useEffect(() => {
    if (fundingAccount) {
      props.onChange(fundingAccount.id);
    }
  }, [fundingAccount, props]);
  return <></>;
}

export function MarketPriceInfoWidget() {
  // props: WidgetProps
  const t = useTranslation();
  // const { marketPrices } = useTradeStorageInfo();
  // const {
  //   formContext: { formData },
  // } = props;

  // const info = useMemo(() => {
  //   return convertCoinToCoinUsingRate(
  //     formData.symbolFrom,
  //     formData.symbolTo,
  //     marketPrices,
  //   );
  // }, [formData.symbolFrom, formData.symbolTo, marketPrices]);

  return (
    <>
      <div>
        {/* <Flex justify={"space-between"}>
          <Text c={"dimmed"}>{t("Price")}</Text>
          <Flex direction={"column"} justify={"end"}>
            <Text c={"dimmed"}>
              1 {info.baseCoin} ~{" "}
              <NumberFormat value={info.price} decimalPlaces={8} />{" "}
              {info.quoteCoin}
            </Text>
            <Text
              styles={{
                root: {
                  textAlign: "right",
                },
              }}
              c={"dimmed"}
            >
              1 {info.quoteCoin} ~{" "}
              <NumberFormat
                value={info.reversedPrice}
                decimalPlaces={8}
              />{" "}
              {info.baseCoin}
            </Text>
          </Flex>
        </Flex>
        <Space my={10} /> */}
        <Box>
          <Text c={"dimmed"}>
            {t(
              "Notes: Due to market fluctuations, the final transaction results may be slightly different from the current display results.",
            )}
          </Text>
        </Box>
      </div>
    </>
  );
}

function renderCoinSelectOption({
  option,
  checked,
}: {
  checked: boolean;
  option: { label: string; value: string; image?: string };
}) {
  return (
    <Flex align={"center"} gap={10} w={"100%"}>
      <Flex gap={5} align={"center"}>
        <Box>
          <Image
            w={"30px"}
            h={"30px"}
            src={COIN_IMAGES[option.value]}
          />
        </Box>
        <Box>
          <Text fz={16} fw={"bold"} c={checked ? "primary" : "dark"}>
            {option.value}
          </Text>
          <Text fz={12} c={"#81858c"}>
            {ASSET_COIN_LIST[option.value]}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
