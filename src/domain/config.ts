import btc from "@/assets/images/coins/BTC.svg";
import eth from "@/assets/images/coins/ETH.svg";
import usdt from "@/assets/images/coins/usdt.svg";
import { ASSET_COIN_LIST } from "@/common/configs";

export const COIN_IMAGES: Record<string, string> = {
  BTC: btc,
  ETH: eth,
  USDT: usdt,
};

export const ASSET_COIN_OPTIONS = Object.entries(ASSET_COIN_LIST).map(([coin, name]) => ({
  label: name,
  value: coin,
  image: COIN_IMAGES[coin] || "",
}));
