import BN from "@/common/big-number";
import { Application, ApplicationFooter, Menu } from "@/common/types";
import logger from "@/services/logger";
import { get } from "lodash";
export type {
  Application,
  ApplicationFooter,
  Menu
} from "@/common/types";

export type MenuType = "link" | "group" | "panel";

export function getLogo(data?: Application): string {
  return get(data, "applications.logo.pc") as string;
}

export function getHeaderMenu(data?: Application): Menu[] {
  return get(data, "applications.layout.header.common.menu", []);
}

export function getFooter(data?: Application): ApplicationFooter {
  logger.debug("getFooter", data);
  logger.debug("check BN", BN.add("121313", "12121212.1212121212121"));
  return get(
    data,
    "applications.layout.footer.common",
    {},
  ) as ApplicationFooter;
}
