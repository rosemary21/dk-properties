import { Button, Modal } from "@mantine/core";
import classes from "./Error.module.css";
import { FaRegFrown } from "react-icons/fa";

interface Props {
  isErrorModalOpened: boolean;
  closeErrorModal: () => void;
  message: string;
}

export default function Error({
  closeErrorModal,
  isErrorModalOpened,
  message,
}: Props) {
  return (
    <Modal
      opened={isErrorModalOpened}
      onClose={closeErrorModal}
      centered
      radius={14}
      withCloseButton={false}
      size="md"
    >
      <div className={classes.container}>
        <h2>Error Message</h2>
        <FaRegFrown className={classes.icon} />
        <p>{message}</p>

        <Button
          color="#e80e0f"
          className="mt-6 mx-auto w-full"
          onClick={closeErrorModal}
        >
          Done
        </Button>
      </div>
    </Modal>
  );
}
