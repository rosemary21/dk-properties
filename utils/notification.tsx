import { Notifications } from "@mantine/notifications";

type Props = {
  message: string;
};

export default function Notification({ message }: Props) {
  return (
    <Notifications
      autoClose={4000}
      position="top-right"
      transitionDuration={500}
      title="Success Message"
      color="green"
      zIndex={999999999999}
    >
      <p className="text-lg text-[green] font-semibold">{message}</p>
    </Notifications>
  );
}
