import useMetadata from "@/hooks/useMetadata";
import useTranslation from "@/hooks/useTranslation";
import { Header } from "@/ui/Header";
import { InquiryForm } from "@/ui/Profile/Forms";
import { Anchor, Box, Breadcrumbs, Container } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Footer } from "../top-page";

export default function Page() {
  const { data } = useMetadata();
  const t = useTranslation();
  return (
    <>
      <Header metadata={data} />
      <Container>
        <Breadcrumbs
          my={20}
          separator={<IconChevronRight color="gray" size={14} />}
        >
          <Anchor fz={16} fw={400} href="/">
            {t("Terms-service")}
          </Anchor>
          <Anchor fz={16} fw={400}>
            {t("Inquiry")}
          </Anchor>
        </Breadcrumbs>
        <Box mih={"calc(100vh - 200px)"} pb={50}>
          <InquiryForm />
        </Box>
      </Container>
      <Footer metadata={data} />
    </>
  );
}
