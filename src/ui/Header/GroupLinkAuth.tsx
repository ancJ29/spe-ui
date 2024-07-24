import useTranslation from "@/hooks/useTranslation";
import AppButton from "../Button/AppButton";

export default function GroupLinkAuth() {
  const t = useTranslation();

  return (
    <>
      <AppButton
        instancetype="Ghost"
        color="white"
        component="a"
        href="/login"
      >
        {t("Log In")}
      </AppButton>
      <AppButton component="a" href="/register">
        {t("Sign up")}
      </AppButton>
    </>
  );
}
