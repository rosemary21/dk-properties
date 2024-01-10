import { notifications } from "@mantine/notifications";
import { FaRegCheckCircle } from "react-icons/fa";

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
