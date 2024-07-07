import logger from "../logger";

import axios from "axios";

type MfaCheckResponse = {
  result: {
    hasMfa: boolean;
  };
};

export default async function checkMfa({
  email,
  mobile,
  type,
}: {
  type: 1 | 2;
  mobile?: string;
  email?: string;
}): Promise<{ hasMfa: boolean }> {
  return axios
    .post<MfaCheckResponse>("/api/check", { email, mobile, type })
    .then((res) => {
      const hasMfa = Boolean(res.data?.result?.hasMfa);
      return { hasMfa };
    })
    .catch((err) => {
      logger.error("Failed to check MFA", err);
      return { hasMfa: false };
    })
    .finally(() => {
      // Do something
    });
}
