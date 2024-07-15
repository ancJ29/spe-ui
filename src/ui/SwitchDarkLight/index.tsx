import {
  ActionIcon,
  lighten,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
const debug = false;
export function SwitchDarkLightMode() {
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  return (
    <>
      {!debug && (
        <ActionIcon
          onClick={() =>
            setColorScheme(
              computedColorScheme === "light" ? "dark" : "light",
            )
          }
          size="xl"
          variant="transparent"
          aria-label="Toggle color scheme"
        >
          {colorScheme === "light" && (
            <IconSun color={lighten(theme.colors.dark[7], 1)} />
          )}
          {colorScheme === "dark" && (
            <IconMoon color={lighten(theme.colors.dark[7], 1)} />
          )}
        </ActionIcon>
      )}
    </>
  );
}
