import useMetadata from "@/hooks/useMetadata";
import { useTradeStorageInfo } from "@/services/tradeAdapter";
import { Header } from "@/ui/Header";
import { TabsTransactions } from "@/ui/Wallet";
import { Anchor, Box, Breadcrumbs, Container, Title, useMantineColorScheme } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import React, { useEffect } from "react";


const HistoryWrapper = ({ children }: { children: React.ReactNode; }) => {
  const { data } = useMetadata();
  const { initialAll } = useTradeStorageInfo();
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    // setColorScheme("light");
    initialAll();
  }, []);
  return (
    <>
      <Header metadata={data} />
      <Container fluid className="bg-dark" h={"100%"}>
        <Box py={30}>
          <Breadcrumbs separator={<IconChevronRight color="gray" size={14} />}>
            <Anchor c={"#121214"} fz={14} fw={400} href="/wallet">
              Funding
            </Anchor>
            <Anchor c={"#121214"} fz={14} fw={400}>
              Funding Account History
            </Anchor>
          </Breadcrumbs>
          <Box py={20}>
            <Title order={2} fz={"24px"}>Funding Account History</Title>
          </Box>
          <Box>
            <TabsTransactions />
            <Box>
              {children}
            </Box>
          </Box>
        </Box>
      </Container>

    </>
  );
};

export default HistoryWrapper;
