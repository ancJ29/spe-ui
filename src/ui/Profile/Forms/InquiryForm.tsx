import useTranslation from "@/hooks/useTranslation";
import {
  Box,
  Button,
  Card,
  Center,
  Select,
  SimpleGrid,
  Space,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";

export function InquiryForm() {
  const t = useTranslation();
  return (
    <>
      <Center>
        <Card
          maw={"75vw"}
          w={"100%"}
          p={"24px"}
          shadow="0 0 24px 0 rgba(18,18,20,.1)"
          padding="lg"
          radius="25px"
          mx={"auto"}
        >
          <SimpleGrid
            cols={1}
            styles={{
              container: {
                gap: "10px",
              },
            }}
          >
            <Title>{t("Inquiry")}</Title>

            <TextInput label={t("Full Name")} />
            <SimpleGrid cols={2}>
              <TextInput label={t("Email Address")} />
              <TextInput label={t("Phone Number")} />
            </SimpleGrid>
            <SimpleGrid cols={2}>
              <Select
                size="lg"
                data={[
                  {
                    label: "Trading",
                    value: "1",
                  },
                  {
                    label: "Copy Trade",
                    value: "2",
                  },
                ]}
                label="Subject"
                defaultValue="1"
                onChange={() => {
                  //
                }}
              />
              <Select
                size="lg"
                data={[
                  {
                    label: "Higher",
                    value: "1",
                  },
                  {
                    label: "Medium",
                    value: "3",
                  },
                  {
                    label: "Lower",
                    value: "2",
                  },
                ]}
                label="Priority Level"
                defaultValue="1"
                onChange={() => {
                  //
                }}
              />
            </SimpleGrid>
            <Textarea label="Message or Inquiry Details" size="lg" />
            <Space />
            <Box>
              <Button
                size="lg"
                color="gray"
                variant="gradient"
                gradient={{ from: "primary", to: "yellow", deg: 90 }}
                fullWidth
                onClick={() => alert("OK")}
              >
                {t("Confirm")}
              </Button>
            </Box>
          </SimpleGrid>
        </Card>
      </Center>
    </>
  );
}
