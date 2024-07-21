import { useLocation } from "react-router-dom";
import { Anchor, Box, Breadcrumbs, Container, } from "@mantine/core";
import useTranslation from "@/hooks/useTranslation";
import { UserChangePasswordForm } from "@/ui/Profile";
import { IconChevronRight } from "@tabler/icons-react";

export default function Page() {
  const location = useLocation();
  const t = useTranslation()
  return (
    <>
      <Container>
        <Breadcrumbs my={20}
          separator={<IconChevronRight color="gray" size={14} />}
        >
          <Anchor fz={16} fw={400} href="/user">
            {t("My Account")}
          </Anchor>
          <Anchor fz={16} fw={400}>
            {t("Change Password")}
          </Anchor>
        </Breadcrumbs>
        <Box h={"calc(100vh - 200px)"}>
          {/* {location.pathname} */}
          <UserChangePasswordForm />
        </Box>
      </Container>
    </>
  );
}