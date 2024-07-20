import useTranslation from "@/hooks/useTranslation";
import { Box } from "@mantine/core";

export function SPETableHeader({
  label,
}: {
  label: string | string[];
}) {
  const t = useTranslation();
  return (
    <Box
      py={3}
      style={{
        whiteSpace: "pre",
      }}
    >
      {(Array.isArray(label) ? label : [label]).map((label, idx) => (
        <span key={idx}>
          {t(label)}
          <br />
        </span>
      ))}
    </Box>
  );
}
