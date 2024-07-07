import { rem } from "@mantine/core";
import {
  NotificationData,
  NotificationsProps,
  notifications,
} from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { ReactNode } from "react";

export const success = (
  title?: ReactNode,
  msg?: ReactNode,
  options?: Partial<NotificationData> & Partial<NotificationsProps>,
) => {
  notifications.show({
    color: "teal",
    title: title,
    message: msg,
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    loading: false,
    autoClose: 5000,
    position: "left",
    ...options,
  });
};

export const error = (
  title?: ReactNode,
  msg?: ReactNode,
  options?: Partial<NotificationData> & Partial<NotificationsProps>,
) => {
  notifications.show({
    color: "red",
    title: title,
    message: msg,
    icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    loading: false,
    autoClose: 5000,
    position: "left",
    ...options,
  });
};
