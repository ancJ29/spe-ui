import AppButton from "../Button/AppButton";

export default function GroupLinkAuth() {
  return (
    <>
      <AppButton
        instancetype="Ghost"
        color="white"
        component="a"
        href="/login"
      >
        Log In
      </AppButton>
      <AppButton component="a" href="/register">
        Sign up
      </AppButton>
    </>
  );
}
