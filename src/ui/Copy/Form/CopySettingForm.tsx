import { CopySetting } from "@/common/types";
import useSPETranslation from "@/hooks/useSPETranslation";
import {
  fetchCopySetting,
  followApi,
  saveCopySetting,
} from "@/services/apis";
import { error, success } from "@/utils/notifications";
import { reloadWindow } from "@/utils/utility";
import {
  Box,
  Button,
  Flex,
  InputLabel,
  NumberInput,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useEffect, useState } from "react";

export function CopySettingForm({
  masterAccountId,
}: {
  masterAccountId: string;
}) {
  const t = useSPETranslation();
  const [newFollower, setNewFollower] = useState(false);
  const [form, setForm] = useState<CopySetting>();
  const [followAmount, setFollowAmount] = useState(0);

  useEffect(() => {
    fetchCopySetting(masterAccountId).then((form) => {
      setNewFollower(!form);
      setForm(
        form || {
          masterAccountId,
          ratio: 0,
          maxAmount: 0,
          minAmount: 0,
          maxMarginPerMonth: 0,
          tpRatio: 0,
          slRatio: 0,
        },
      );
    });
  }, [masterAccountId]);
  if (newFollower) {
    return (
      <Box className="space-y-10">
        <InputLabel fw={600} fz={14}>
          {t("Copy Trade Ratio (%)")}
        </InputLabel>
        <NumberInput
          rightSection={<></>}
          size="sm"
          value={form?.ratio || 0}
          step={1}
          onChange={(v) =>
            setForm(_save(form, "ratio", Math.round(Number(v))))
          }
        />
        <InputLabel fw={600} fz={14}>
          {t("Follow amount (USDT)")}
        </InputLabel>
        <NumberInput
          rightSection={<></>}
          thousandSeparator
          size="sm"
          value={followAmount}
          step={1}
          onChange={(v) => setFollowAmount(Math.round(Number(v)))}
        />
        <Box w={"100%"}>
          <Button
            mt={5}
            fullWidth
            disabled={!form}
            onClick={() => {
              form &&
                followApi(masterAccountId, form.ratio, followAmount)
                  .then(() => {
                    success(t("Success"), t("Follow success"));
                  })
                  .catch(() => {
                    error(
                      t("Something went wrong"),
                      t("Cannot update follow trader"),
                    );
                  })
                  .finally(() => {
                    modals.closeAll();
                    reloadWindow();
                  });
            }}
          >
            {t("Follow")}
          </Button>
        </Box>
      </Box>
    );
  }
  return (
    <Box className="space-y-10">
      <InputLabel fw={600} fz={14}>
        {t("Copy Trade Ratio (%)")}
      </InputLabel>
      <NumberInput
        rightSection={<></>}
        size="sm"
        value={form?.ratio || 0}
        step={1}
        onChange={(v) =>
          setForm(_save(form, "ratio", Math.round(Number(v))))
        }
      />
      <InputLabel fw={600} fz={14}>
        {t("Min./Max. Margin Per Order")}
      </InputLabel>
      <Flex align="center" justify="space-between">
        <NumberInput
          rightSection={<></>}
          thousandSeparator
          size="sm"
          value={form?.maxAmount || 0}
          min={0}
          onChange={(v) =>
            setForm(_save(form, "maxAmount", Number(v)))
          }
        />
        <NumberInput
          rightSection={<></>}
          thousandSeparator
          size="sm"
          value={form?.minAmount || 0}
          min={0}
          onChange={(v) =>
            setForm(_save(form, "minAmount", Number(v)))
          }
        />
      </Flex>
      <InputLabel fw={600} fz={14}>
        {t("Max. Margin Per Month (%)")}
      </InputLabel>
      <NumberInput
        rightSection={<></>}
        thousandSeparator
        size="sm"
        value={form?.maxMarginPerMonth || 0}
        min={0}
        max={100}
        step={1}
        onChange={(v) =>
          setForm(_save(form, "maxMarginPerMonth", Number(v)))
        }
      />
      <InputLabel fw={600} fz={14}>
        {t("Take-Profit Ratio (%)")}
      </InputLabel>
      <NumberInput
        rightSection={<></>}
        thousandSeparator
        size="sm"
        value={form?.tpRatio || 0}
        min={0}
        max={100}
        step={1}
        onChange={(v) =>
          setForm(_save(form, "tpRatio", Math.round(Number(v))))
        }
      />
      <InputLabel fw={600} fz={14}>
        {t("Stop-Loss Ratio (%)")}
      </InputLabel>
      <NumberInput
        rightSection={<></>}
        thousandSeparator
        size="sm"
        value={form?.slRatio || 0}
        min={0}
        max={100}
        step={1}
        onChange={(v) =>
          setForm(_save(form, "slRatio", Math.round(Number(v))))
        }
      />
      <Box w={"100%"}>
        <Button
          mt={5}
          fullWidth
          disabled={!form}
          onClick={() => {
            form &&
              saveCopySetting(form)
                .then(() => {
                  success(t("Success"), t("Copy setting updated"));
                })
                .catch(() => {
                  error(
                    t("Something went wrong"),
                    t("Cannot update your copy setting"),
                  );
                })
                .finally(() => {
                  modals.closeAll();
                });
          }}
        >
          {t("Save")}
        </Button>
      </Box>
    </Box>
  );
}

function _save<T extends Record<string, unknown>>(
  form: T | undefined,
  key: string,
  value: unknown,
) {
  if (!form) {
    return undefined;
  }
  return {
    ...form,
    [key]: value,
  } as T;
}
