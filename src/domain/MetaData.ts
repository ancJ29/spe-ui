import { get } from "lodash";

export type Metadata = {
  version: string;
  application: Record<string, unknown>;
};

export type MenuType = "link" | "group" | "panel";

export type Menu = {
  type: MenuType;
  description: string;
  label: string;
  url: string;
  children: Partial<Menu[]>;
  panelFooter: Partial<{
    title: string;
    description: string;
    children: Partial<Menu[]>;
    button: {
      label: string;
      url: string;
    };
  }>;
};

export type footerInfo = {
  copyRight: string;
  privacyTerms: {
    name: string;
    url: string;
  };
  termOfService: {
    name: string;
    url: string;
  };
  socials: {
    url: string;
    icon: string;
  }[];
  groups: {
    name: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
};

export function getLogo(data?: Metadata): string {
  return get(data, "application.logo") as string;
}

export function getHeaderMenu(data?: Metadata): Menu[] {
  return get(data, "application.headers.common.menu", []);
}

export function getFooter(data?: Metadata): footerInfo {
  return get(data, "application.footers.common", {}) as footerInfo;
}
