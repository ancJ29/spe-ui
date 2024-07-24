import useTranslation from "@/hooks/useTranslation";
import {
  Anchor,
  Box,
  Breadcrumbs,
  Card,
  Container,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export default function Page() {
  const t = useTranslation();
  return (
    <>
      <Container>
        {/* {location.pathname} */}
        <Breadcrumbs
          my={20}
          separator={<IconChevronRight color="gray" size={14} />}
        >
          <Anchor fz={16} fw={400} href="/user">
            {t("My Account")}
          </Anchor>
          <Anchor fz={16} fw={400}>
            {t("ID Verification")}
          </Anchor>
        </Breadcrumbs>
        <Card
          p={"32px"}
          shadow="0 0 24px 0 rgba(18,18,20,.1)"
          padding="lg"
          radius="25px"
          maw={"600px"}
          w={"100%"}
          mx={"auto"}
        >
          <Title order={3}>Basic KYC</Title>

          <Space my={"lg"} />

          <Box>
            <Text>TODO: Implement</Text>
          </Box>
        </Card>
      </Container>
    </>
  );
}
