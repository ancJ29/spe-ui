import { buildArray } from "@/common/utils";
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
      py={5}
      style={{
        whiteSpace: "pre",
      }}
    >
      {buildArray(label).map((label, idx) => (
        <span key={idx}>
          {t(label)}
          <br />
        </span>
      ))}
    </Box>
  );
}
