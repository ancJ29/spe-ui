import useSPETranslation from "@/hooks/useSPETranslation";
import { Button, CopyButton, Flex } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";

export function SPECopyButton({ value }: { value: string }) {
  const t = useSPETranslation();

  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <Button
          fullWidth
          p={0}
          variant="transparent"
          color={copied ? "teal" : "primary"}
          onClick={copy}
        >
          <Flex gap={5} align={"center"} justify={"end"} fz={12}>
            {copied ? t("Copied") : t("Copy")}
            <IconCopy size={20} />
          </Flex>
        </Button>
      )}
    </CopyButton>
  );
}
