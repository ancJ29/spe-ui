import useTranslation from "@/hooks/useTranslation";
import { updateMasterSettingApi } from "@/services/apis";
import { CopyMasterDetail, CopyMasterSetting } from "@/types";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  InputLabel,
  NumberInput,
  rem,
  Text,
  Textarea,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

export function MasterSettingForm({
  information,
}: {
  information: CopyMasterDetail;
}) {
  const t = useTranslation();
  const [form, setForm] = useState<CopyMasterSetting>({
    imageUrl: information.imageUrl,
    name: information.name,
    bio: information.bio,
    maxAmount: information.maxAmount,
    minAmount: information.minAmount,
    shareHistory: information.shareHistory,
    publicProfile: information.publicProfile,
    maxFollowers: information.followers.max,
  });
  return (
    <Box className="space-y-10">
      <Flex justify="center" align="center" direction="column">
        <Avatar size={80} src={form.imageUrl} />
        <Text fz={20} fw="bold">
          {form.name}
        </Text>
      </Flex>
      <Box>
        <InputLabel fz={14}>{t("Bio")}</InputLabel>
        <Textarea
          size="sm"
          placeholder={t("Your bio")}
          rows={3}
          value={form.bio}
          onChange={(e) =>
            setForm({
              ...form,
              bio: e.currentTarget.value?.trim() || "",
            })
          }
        />
      </Box>
      <Box>
        <InputLabel fz={14}>{t("Settlement Method")}</InputLabel>
        <Input disabled value={t("High-Water Mark")} />
      </Box>
      <Box>
        <InputLabel fz={14}>{t("Max Followers")}</InputLabel>
        <NumberInput
          size="sm"
          thousandSeparator
          rightSection={<></>}
          value={form.maxFollowers}
          onChange={(value) =>
            setForm({ ...form, maxFollowers: Number(value) })
          }
        />
      </Box>
      <Box>
        <InputLabel fz={14}>{t("Copy trade amount")}</InputLabel>
        <Flex justify={"space-between"} w={"100%"}>
          <NumberInput
            size="sm"
            rightSection={<></>}
            value={form.minAmount}
            onChange={(value) =>
              setForm({ ...form, minAmount: Number(value) })
            }
          />
          <NumberInput
            size="sm"
            rightSection={<></>}
            thousandSeparator
            value={form.maxAmount}
            onChange={(value) =>
              setForm({ ...form, maxAmount: Number(value) })
            }
          />
        </Flex>
      </Box>
      <Box>
        <InputLabel fz={14}>{t("Profit sharing")}</InputLabel>
        <Flex justify={"space-between"} w={"100%"}>
          <Flex
            direction={"column"}
            bg={"#f8f8f8"}
            h={60}
            w={"40%"}
            justify="center"
            align="center"
          >
            <Text fw={600} fz={12}>
              {t("Master")}
            </Text>
            <Text fw={700} fz={16}>
              {information.shares.master}%
            </Text>
          </Flex>
          <Flex
            direction={"column"}
            bg={"#f8f8f8"}
            h={60}
            w={"40%"}
            justify="center"
            align="center"
          >
            <Text fw={600} fz={12}>
              {t("Promoter")}
            </Text>
            <Text fw={700} fz={16}>
              {information.shares.promoter}%
            </Text>
          </Flex>
        </Flex>
        <Text c={"dimmed"} fz={12} mt={5}>
          {t("To modify the master's profit share, email us at")}
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            support@omtrade.com
          </span>
        </Text>
      </Box>
      <Flex
        justify="space-between"
        align="center"
        style={{
          cursor: "pointer",
        }}
      >
        <InputLabel fz={14}>
          {t("Display position and history")}
        </InputLabel>
        <Checkbox
          size="sm"
          checked={form.shareHistory}
          onClick={() =>
            setForm({
              ...form,
              shareHistory: Boolean(!form.shareHistory),
            })
          }
        />
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        style={{
          cursor: "pointer",
        }}
      >
        <InputLabel fz={14}>
          {t("Public Your Master Profile")}
        </InputLabel>
        <Checkbox
          size="sm"
          checked={form.publicProfile}
          onClick={() =>
            setForm({
              ...form,
              publicProfile: Boolean(!form.publicProfile),
            })
          }
        />
      </Flex>
      <Box w={"100%"}>
        <Button
          fullWidth
          onClick={() => {
            updateMasterSettingApi(form)
              .then(() => {
                notifications.show({
                  color: "teal",
                  title: t("Success"),
                  message: t("Master setting updated"),
                  icon: (
                    <IconCheck
                      style={{ width: rem(18), height: rem(18) }}
                    />
                  ),
                  loading: false,
                  autoClose: 5000,
                  position: "top-center",
                });
              })
              .catch(() => {
                return notifications.show({
                  color: "red",
                  title: t("Something went wrong"),
                  message: t("Cannot update your master setting"),
                  icon: (
                    <IconCheck
                      style={{ width: rem(18), height: rem(18) }}
                    />
                  ),
                  loading: false,
                  autoClose: 5000,
                  position: "top-center",
                });
              })
              .finally(() => {
                modals.closeAll();
              });
          }}
        >
          {t("Confirm")}
        </Button>
      </Box>
    </Box>
  );
}
