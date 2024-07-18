import useTranslation from "@/hooks/useTranslation";
import { Center, Container, rem, SegmentedControl } from "@mantine/core";
import { IconCopyright, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export function CopyTradeSwitchMode() {
  const t = useTranslation();
  const navigate = useNavigate();
  const isUserMaster = true;
  return (
    <>
      {isUserMaster && <Container fluid>
        <SegmentedControl
          onChange={(v) => {
            navigate({
              search: `type=${v}`
            });
          }}
          color="primary"
          data={[
            {
              label:
                            <Center style={{ gap: 10 }}>
                              <IconHome style={{ width: rem(16), height: rem(16) }} />
                              <span>{t("Master Dashboard")}</span>
                            </Center>
              ,
              value: "1"
            },
            {
              label:
                            <Center style={{ gap: 10 }}>
                              <IconCopyright style={{ width: rem(16), height: rem(16) }} />
                              <span>{t("My Copy Trading")}</span>
                            </Center>
              ,
              value: "3"
            },
          ]}
        />
      </Container>}
    </>
  );
}
