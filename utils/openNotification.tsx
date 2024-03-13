import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle, FaRegSmile, FaRegFrown } from "react-icons/fa";
import { notification } from "antd";

type Props = {
  message: string;
};

export default function openNotification({ message }: Props) {
  notifications.show({
    withCloseButton: true,
    title: "Success Message",
    message,
    color: "green",

    icon: <FaRegCheckCircle size={24} />,
  });
}

export const openErrorNotification = (message: string) => {
  notification.open({
    message: "Error",
    description: message,
    duration: 10,
    icon: <FaRegFrown color="red" size={24} />,
  });
};

export const openSuccessNotification = (message: string) => {
  notification.open({
    message: "Success",
    description: message,
    duration: 5,
    icon: <FaRegSmile color="#71b324" size={24} />,
  });
};
