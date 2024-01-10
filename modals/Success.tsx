import { Button, Modal } from "@mantine/core";
import classes from "./Error.module.css";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  isSuccessModalOpened: boolean;
  closeSuccessModal: () => void;
  message: string;
  status: string;
}

export default function Success({
  closeSuccessModal,
  isSuccessModalOpened,
  message,
  status,
}: Props) {
  return (
    <Modal
      opened={isSuccessModalOpened}
      onClose={closeSuccessModal}
      centered
      radius={17}
      withCloseButton={false}
    >
      <div className={classes.container}>
        <h2>{status}</h2>
        <FaCheckCircle className={classes.icon} />
        <p>{message}</p>
        <Button
          color="#e80e0f"
          className="mt-6 mx-auto"
          onClick={closeSuccessModal}
        >
          Done
        </Button>
      </div>
    </Modal>
  );
}
