import useTranslation from "@/hooks/useTranslation";
import { Button, Center } from "@mantine/core";

const Login = () => {
  const t = useTranslation();
  return (
    <Center style={{ minHeight: "100vh" }}>
      <Button
        onClick={() => {
          localStorage.setItem("__USER__", "true");
          window.open("/", "_self");
        }}
      >
        {t("Login")}
      </Button>
    </Center>
  );
};

export default Login;
