import useTranslation from "@/hooks/useTranslation";
import { Center } from "@mantine/core";

const BlankPage = () => {
  const t = useTranslation();
  return (
    <Center style={{ minHeight: "100vh" }}>
      {t("This is a blank page. You can use it to create new pages.")}
    </Center>
  );
};

export default BlankPage;
