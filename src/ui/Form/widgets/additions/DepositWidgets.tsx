import { CHAIN, CoinType, DepositCoinsListed, iconsByCoin, textByCoin } from "@/domain/balance";
import { Button, Flex, Image, Select, Box, Text, InputLabel, TextInput, CopyButton, NumberInput, Divider } from "@mantine/core";
import { WidgetProps } from "@rjsf/utils";
import { IconCaretDownFilled, IconCopy } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "@/services/apis/axios";
import { fetchDepositAddressApi } from "@/services/apis";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { Account, getAccountFunding } from "@/domain/account";
import bigNumber from "@/common/big-number";
import NumberFormat from "@/ui/NumberFormat";

type RenderSelectOptionProps = {
  option: { label: string; value: string, image?: string };
  checked: boolean;
};

function renderSelectOption({
  option,
  checked,
}: RenderSelectOptionProps) {
  return (
    <Flex align={"center"} gap={10} w={"100%"}>
      <Flex gap={5} align={"center"}>
        <Box>
          <Image w={"30px"} h={"30px"} src={iconsByCoin[option.value as CoinType]} />
        </Box>
        <Box>
          <Text fz={16} fw={"bold"} c={checked ? "primary" : "dark"}>{option.value}</Text>
          <Text fz={12} c={"#81858c"}>{textByCoin[option.value as CoinType]}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
export function SelectCoinWidget(props: WidgetProps) {
  console.log(props.required);
  const options = useMemo(() => {
    return DepositCoinsListed.map(i => ({
      label: i.coin,
      value: i.coin,
      image: i.icon
    }));
  }, []);
  return (
    <>
      <Select
        placeholder={props.placeholder}
        value={props.value}
        data={options}
        size="lg"
        onChange={(v) => props.onChange(v)}
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        renderOption={renderSelectOption}
        allowDeselect={false}
        leftSection={<>
          <Image w={"22px"} h={"22px"} src={iconsByCoin[props.value as CoinType]} />
        </>}
        rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
        comboboxProps={{
          offset: 0,
          withinPortal: false,
        }}
        styles={{
          root: {
          },
          input: {
            border: "none",
            boxShadow: "none",
            borderRadius: "0px",
            background: "#f3f5f7",
            fontWeight: "bold"
          },
          dropdown: {
            borderRadius: "0px",
            border: "none",
            padding: "0px",
          },

        }}
        {...(props.options?.props as any)} // eslint-disable-line
      />
      {/* <Popover position="bottom" shadow="md" withinPortal={false} styles={{
        dropdown: {
          border: "none",
          padding: 0
        }
      }} offset={5}>
        <Popover.Target>
          <Button h={"48px"} styles={{
            root: {
              background: "#f3f5f7",
              color: "black"
            }
          }} justify="space-between" fullWidth rightSection={<IconCaretDownFilled color="#81858d" size={15} />}>
            <Flex gap={5} align={"center"}>
              <Image w={"22px"} h={"22px"} src={iconsByCoin[props.value as CoinType]} />
              <Text fz={16} fw={"bold"}>{props.value}</Text>
              <Text fz={12} c={"#81858c"}>{textByCoin[props.value as CoinType]}</Text>
            </Flex>
          </Button>
        </Popover.Target>
        <Popover.Dropdown w={"100%"}>
          <Select autoFocus
            placeholder={props.placeholder}
            value={props.value}
            data={options}
            size="lg"
            searchable
            onChange={(v) => props.onChange(v)}
            leftSection={<IconSearch size={20} />}
            label={props.label ? props.label : ""}
            renderOption={renderSelectOption}
            allowDeselect={false}
            rightSection={<div></div>}
            comboboxProps={{
              offset: 0,
              withinPortal: false,

            }}
            styles={{
              root: {
              },
              input: {
                border: "none",
                boxShadow: "none",
                borderRadius: "0px",
                background: "#f3f5f7",
              },
              dropdown: {
                borderRadius: "0px",
                border: "none",
                padding: "0px",
              },

            }}
          />
        </Popover.Dropdown>
      </Popover> */}

    </>
  );
}

export function SelectChainWidget(props: WidgetProps) {
  const options = useMemo(() => {
    return (props.options.enumOptions as any[]).map(i => ({
      ...i
    }));
  }, []);
  return (
    <>
      <Select
        placeholder={props.placeholder}
        value={props.value}
        data={options}
        size="lg"
        onChange={(v) => props.onChange(v)}
        allowDeselect={false}
        rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
        renderOption={({ option, checked }) => {
          return <>
            <Flex align={"center"} gap={10} w={"100%"}>
              <Flex gap={5} align={"center"}>
                <Box>
                  <Text fz={16} fw={"bold"} c={checked ? "primary" : "dark"}>{option.value}</Text>
                  <Text fz={12} c={"#81858c"}>{textByCoin[option.value as CoinType]}</Text>
                </Box>
              </Flex>
            </Flex>
          </>;
        }}
        comboboxProps={{
          offset: 0,
          withinPortal: false,

        }}
        styles={{
          root: {
          },
          input: {
            border: "none",
            boxShadow: "none",
            borderRadius: "0px",
            background: "#f3f5f7",
            fontWeight: "bold"
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
  const { formContext: { formData, updateField } } = props;
  useEffect(() => {
    console.log("COIN", formData.coin, props);
    const coin: CoinType = formData.coin;
    const chain: Record<CoinType, CHAIN> = {
      BTC: "Bitcoin", // formData?.infoBTC?.chain
      ETH: "Ethereum", // formData?.infoETH?.chain
      USDT: "Binance Smart Chain" //formData?.infoUSDT?.chain
    };
    const updateDepositAddress: Record<CoinType, (depositAddress: string) => void> = {
      BTC: (depositAddress) => updateField("infoBTC.walletAddress", depositAddress),
      ETH: (depositAddress) => updateField("infoUSDT.walletAddress", depositAddress),
      USDT: (depositAddress) => updateField("infoETH.walletAddress", depositAddress)
    };
    fetchDepositAddressApi({
      coin: formData.coin,
      chain: chain[coin]
    }).then(res => {
      const depositAddress = res.data.result?.depositAddress;
      props.onChange(depositAddress);
      // updateDepositAddress[coin](depositAddress)
    });
  }, [formData.coin]);

  return (
    <>
      <Box>
        <InputLabel size="lg" className="mantine-InputWrapper-label">Confirm deposit details</InputLabel>
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
            borderRadius: "10px"
          }
        }}
      >
        <Box w={"70%"}>
          <TextInput
            styles={{
              input: {
                background: "light-dark(white, white)",
                border: "none",
                fontWeight: "bolder",
                fontSize: "14px"
              },
              label: {
                color: "#8a8e96",
                fontSize: "14px"
              }
            }}
            label={`${formData.coin} Address`}
            value={props.value}
            readOnly
            rightSectionWidth={80}
            rightSection={
              <CopyButton value="https://mantine.dev">
                {({ copied, copy }) => (
                  <Button fullWidth p={0} variant="transparent" color={copied ? "teal" : "primary"} onClick={copy}>
                    <Flex gap={5} align={"center"} justify={"end"} fz={12}>
                      {copied ? "Copied" : "Copy"}
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
  const { formContext: { formData, updateField } } = props;

  return (
    <>
      <NumberInput
        hideControls
        onChange={v => props.onChange(v)}
        styles={{
          input: {
            background: "#f3f5f7",
            border: "none",
            fontWeight: "bolder"
          },
        }}
        rightSectionWidth={80}
        rightSection={
          <Text fw={"bold"}>{formData?.coin}</Text>
        }
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        {...(props.options?.props as any)}
      />
    </>
  );
}


export function AmountToSendWidget(props: WidgetProps) {
  const { formContext: { formData, updateField } } = props;
  const { balances } = useTradeStorageInfo();
  const balanceByCoin = useMemo(() => {
    const coin = balances.balances.find(i => i.coin === formData?.coin);
    if (coin) {
      return bigNumber.sub(coin.amount, coin.locked);
    }
    return 0;
  }, [balances]);

  return (
    <>
      <Box pos={"relative"}>
        <NumberInput
          hideControls
          onChange={v => props.onChange(v)}
          value={props.value}
          styles={{
            input: {
              background: "#f3f5f7",
              border: "none",
              fontWeight: "bolder"
            },
          }}
          rightSectionWidth={120}
          rightSection={
            <Flex w={"100%"} gap={8} justify={"end"} pr={10} align={"center"}>
              <Text onClick={() => props.onChange(balanceByCoin)} className="cursor-pointer" fw={"bold"} c={"primary"}>All</Text>
              <Divider h={12} c={"red"} bg={"gray"} w={1}/>
              <Text fw={"bold"}>{formData?.coin}</Text>
            </Flex>
          }
          rightSectionPointerEvents="all"
          label={props.label ? props.label : ""}
          withAsterisk={props.required}

          {...(props.options?.props as any)}
        />
        <Flex justify={"end"} pos={"absolute"} top={"calc(100% + 5px)"} right={0}>
          <Text fz={12} fw={"bold"} c="dimmed">Total: <NumberFormat value={balanceByCoin} decimalPlaces={8}/> {formData?.coin}</Text>
        </Flex>
      </Box>

    </>
  );
}


export function EnterAddressWidget(props: WidgetProps) {
  const { formContext: { formData, updateField } } = props;
  return (
    <>
      <TextInput
        onChange={v => props.onChange(v.target.value)}
        value={props.value}
        styles={{
          input: {
            background: "#f3f5f7",
            border: "none",
            fontWeight: "bolder"
          },
        }}
        label={props.label ? props.label : ""}
        withAsterisk={props.required}
        {...(props.options?.props as any)}
      />
    </>
  );
}


export function SelectAccountWalletWidget(props: WidgetProps) {
  const { accounts } = useTradeStorageInfo();
  const options = useMemo(() => {
    return (accounts as Account[] ?? []).map(i => ({
      value: i.id,
      label: i.name
    }));
  }, [accounts]);
  return (
    <>
      <Select
        placeholder={props.placeholder}
        value={props.value}
        data={options}
        size="lg"
        onChange={(v) => props.onChange(v)}
        allowDeselect={false}
        rightSection={<IconCaretDownFilled color="#81858d" size={15} />}
        renderOption={({ option, checked }) => {
          return <>
            <Flex align={"center"} gap={10} w={"100%"}>
              <Flex gap={5} align={"center"}>
                <Box>
                  <Text fz={16} fw={"bold"} c={checked ? "primary" : "dark"}>{option.label}</Text>
                  <Text fz={12} c={"#81858c"}>{textByCoin[option.value as CoinType]}</Text>
                </Box>
              </Flex>
            </Flex>
          </>;
        }}
        comboboxProps={{
          offset: 0,
          withinPortal: false,

        }}
        styles={{
          root: {
          },
          input: {
            border: "none",
            boxShadow: "none",
            borderRadius: "0px",
            background: "#f3f5f7",
            fontWeight: "bold"
          },
          dropdown: {
            borderRadius: "0px",
            border: "none",
            padding: "0px",
          },

        }}
        withAsterisk={props.required}
        label={props.label ? props.label : ""}
        {...(props.options?.props as any)} // eslint-disable-line
      />
    </>
  );
}

export function FundingAccountWidget(props: WidgetProps) {
  const { accounts } = useTradeStorageInfo();
  const accountFunding = useMemo(() => {
    return getAccountFunding(accounts);
  }, [accounts]);
  useEffect(() => {
    if(accountFunding) {
      props.onChange(accountFunding.id);
    }
  }, [accountFunding]);
  return (
    <>
      {/* {accountFunding?.id} */}
    </>
  );
}
