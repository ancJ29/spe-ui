import { Tabs } from "@mantine/core";
import AppText from "../Text/AppText";
import useTranslation from "@/hooks/useTranslation";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TermsServiceWrapper() {
  const t = useTranslation();
  const l = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Tabs
        defaultValue={l.pathname}
        onChange={(v) => {
          navigate(v as string);
        }}
      >
        <Tabs.List>
          <Tabs.Tab value={"/agreement"}>
            <AppText
              instancetype="TabText"
              component={Link}
              to={"/agreement"}
            >
              {t("Privacy Policy ")}
            </AppText>
          </Tabs.Tab>
          <Tabs.Tab value={"/terms-conditions"}>
            <AppText
              instancetype="TabText"
              component={Link}
              to={"/terms-conditions"}
            >
              {t("Terms and Conditions ")}
            </AppText>
          </Tabs.Tab>

          <Tabs.Tab value={"/risk-disclosure"}>
            <AppText
              instancetype="TabText"
              component={Link}
              to={"/risk-disclosure"}
            >
              {t("Risk Disclosure Statement")}
            </AppText>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="1">1</Tabs.Panel>
        <Tabs.Panel value="2">2</Tabs.Panel>
        <Tabs.Panel value="3">3</Tabs.Panel>
      </Tabs>
    </>
  );
}
