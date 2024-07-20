import useTranslation from "@/hooks/useTranslation";
import { Box } from "@mantine/core";

export function SPETableHeader({ label }: { label: string }) {
  const t = useTranslation();

  return (
    <Box
      py={3}
      style={{
        whiteSpace: "pre",
      }}
    >
      {label
        .split(" / ")
        .map((label) => t(label))
        .join("\n")}
    </Box>
  );
}
