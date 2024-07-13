import { AuthenticationPayload } from "@/common/types";
import axios from "./axios";

export default async function getMe(): Promise<AuthenticationPayload> {
  const res = await axios.get<{
    code: number;
    result?: AuthenticationPayload;
  }>("/api/me");
  if (!res.data.result) {
    throw new Error("Failed to get me");
  }
  return res.data.result;
}
