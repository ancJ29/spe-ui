import useMetadata from "@/hooks/useMetadata";
import useTranslation from "@/hooks/useTranslation";
import { Header } from "@/ui/Header";
import { TabsTransactions } from "@/ui/Wallet";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Container,
  Space,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import React from "react";

const HistoryWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslation();
  const { data } = useMetadata();
  return (
    <>
      <Header metadata={data} />
      <Container fluid>
        <Box py={30}>
          <Breadcrumbs
            separator={<IconChevronRight color="gray" size={14} />}
          >
            <Anchor fz={14} fw={400} href="/wallet">
              {t("Assets")}
            </Anchor>
            <Anchor fz={14} fw={400}>
              {t("History")}
            </Anchor>
          </Breadcrumbs>
          <Box py={20}>
            <Title order={2} fz={"24px"}>
              {t("History")}
            </Title>
          </Box>
          <Box>
            <TabsTransactions />
            <Space mb={10} />
            <Box>{children}</Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HistoryWrapper;
