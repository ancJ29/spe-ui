import useTranslation from "@/hooks/useTranslation";
import authStore from "@/store/auth";
import {
  Alert,
  Box,
  Button,
  Card,
  CopyButton,
  Divider,
  Flex,
  HoverCard,
  Modal,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertTriangle,
  IconCopy,
  IconHelp,
} from "@tabler/icons-react";

export function FiatDepositModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const t = useTranslation();
  const { me } = authStore();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={t("Fiat Deposit")}
        centered
        size={"lg"}
      >
        <SimpleGrid
          cols={2}
          styles={{
            root: {
              gap: 5,
            },
          }}
        >
          <Box fw={"bold"} fz={14}>
            {t("Bank name")}
          </Box>
          <Box c={"dimmed"}>
            <Flex justify={"end"}>京葉銀行</Flex>
          </Box>
          <Box fw={"bold"} fz={14}>
            {t("Branch name")}
          </Box>
          <Box c={"dimmed"}>
            <Flex justify={"end"}>船橋 (店番：111)</Flex>
          </Box>
          <Box fw={"bold"} fz={14}>
            {t("Account Number")}
          </Box>
          <Box c={"dimmed"}>
            <Flex justify={"end"}>普通 9698701</Flex>
          </Box>
          <Box fw={"bold"} fz={14}>
            {t("Account Name")}
          </Box>
          <Box c={"dimmed"}>
            <Flex justify={"end"}>フクカワ（ド</Flex>
          </Box>
        </SimpleGrid>
        <Space mb={20} />
        <HoverCard
          openDelay={200}
          shadow="md"
          position="top"
          width={300}
          withArrow
          arrowSize={12}
        >
          <HoverCard.Target>
            <Flex w={"fit-content"} align={"center"} gap={5}>
              <Text
                fz={14}
                fw={"bold"}
                w={"fit-content"}
                className="cursor-pointer"
              >
                Transfer request
              </Text>
              <IconHelp size={16} />
            </Flex>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">
              The minimum deposit amount is 10 USDT deposits below
              this amount will not be credtied
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <Space mb={10} />
        <Card
          py={10}
          px={20}
          styles={{
            root: {
              background:
                "light-dark(#f6f5f8, var(--mantine-color-dark-6))",
            },
          }}
        >
          <Flex gap={10} align={"center"}>
            <Text fw={"bold"}>{t("Half angle example")}</Text>
            <Box h={20}>
              <Divider h={"100%"} orientation="vertical" />
            </Box>
            <Text>{me?.fiatDepositMemo || "---"}</Text>
            <Box ml={"auto"}>
              {/* <CopyButton value="">
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
                      <IconCopy size={20} />
                    </Flex>
                  </Button>
                )}
              </CopyButton> */}
              <CopyButton value={me?.fiatDepositMemo || ""}>
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
            </Box>
          </Flex>
        </Card>
        <Box my={20}>
          <Alert
            radius={15}
            variant="light"
            color="red"
            icon={
              <Box>
                <IconAlertTriangle size={30} />
              </Box>
            }
            styles={{
              body: {},
              root: {
                alignItems: "center",
              },
              wrapper: {
                alignItems: "center",
                gap: "20px",
              },
              icon: {
                // width: "50px"
              },
            }}
          >
            <Text c={"red"}>
              {t(
                "The minimum deposit amount is 10 USDT deposits below this amount will not be credited",
              )}
            </Text>
          </Alert>
        </Box>
        <Text fw={"bold"}>
          {t("Please take note of the following procedures")}:
        </Text>
        <ul style={{ padding: "0 20px" }}>
          <li>
            <Text fz={14}>
              <strong>
                {t(
                  "Please enter the 4-digit note code when making a transfer",
                )}
                :
              </strong>{" "}
              {t(
                "If you did not include your 4-digit code in your bank transfer, or misplaced it somewhere else, please contact our customer service for assistance immediately.",
              )}
            </Text>
          </li>
          <li>
            <Text fz={14}>
              <strong>
                {t(
                  "Deposits made in local currency will be converted to USDT based on the prevailing exchange rate at the time of payment.",
                )}
              </strong>{" "}
              {t(
                "Fiat to USDT conversions are subject to exchange rate fluctuations (quoted from Investing.com) and include certain handling fees. Crypto Copy Invest reserves the right of any amendments or final interpretation regarding fiat to USDT conversion service. Thank you for your understanding.",
              )}
            </Text>
          </li>
          <li>
            <Text fz={14}>
              {t("Funds will be credited within 1 business day.")}
            </Text>
          </li>
          <li>
            <Text fz={14}>
              {t(
                "This payment method does not support transfers from banks located outside of Japan.",
              )}
            </Text>
          </li>
          <li>
            <Text fz={14}>
              {t(
                "For transactions exceeding 3 million yen, our compliance team may need to review and approve your transfer. This could result in longer processing times. Please be patient during this period. You are restricted to one deposit at a time. Subsequent deposits can only be made after the previous one has been processed.",
              )}
            </Text>
          </li>
          <li>
            <Text fz={14}>
              {t(
                "To prevent money laundering, withdrawal procedures will not be processed unless one week has passed since the deposit and there has been at least one trade.",
              )}
            </Text>
          </li>
        </ul>
        <Box mt={40}>
          <Button
            fullWidth
            onClick={close}
            variant="gradient"
            size="lg"
            gradient={{ from: "primary", to: "yellow", deg: 90 }}
            radius={"xl"}
          >
            {t("Confirm")}
          </Button>
        </Box>
      </Modal>
      <Button
        onClick={open}
        variant="gradient"
        gradient={{ from: "primary", to: "yellow", deg: 90 }}
      >
        {t("Fiat Deposit")}
      </Button>
    </>
  );
}
