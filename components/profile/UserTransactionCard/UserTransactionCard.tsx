import { TransactionListProps } from "@/types";
import "./UserTransactionCard.module.css";
import Image from "next/image";

interface Props {
  transaction: TransactionListProps;
}

const UserTransactionCard = ({ transaction }: Props) => {
  const {
    userName,
    amount,
    imageUrl,
    transactionId,
    transactionStatus,
    reasonForRejection,
  } = transaction;

  const statusIcon = () => {
    if (transactionStatus.toLowerCase() == "pending")
      return "bx bxs-hourglass-bottom";
    if (transactionStatus.toLowerCase() == "confirmed") return "bx bx-check";
    else return "bx bx-x";
  };

  const statusBackgroundColor = () => {
    if (transactionStatus.toLowerCase() == "pending") return "#fef9c3";
    if (transactionStatus.toLowerCase() == "confirmed") return "#EBFFF1";
    else return "#ffebeb";
  };

  const statusColor = () => {
    if (transactionStatus.toLowerCase() == "pending") return "#b45309";
    if (transactionStatus.toLowerCase() == "confirmed") return "#119C2B";
    else return "red";
  };

  const receiptStatusStyle = {
    background: statusBackgroundColor(),
    color: statusColor(),
  };

  return (
    <div className="receipt_container">
      <div className="receipt_up">
        <Image src={imageUrl} alt="apartment" />
        <div className="property_details">
          <div>
            <p className="receipt_property_title">Property Name</p>
            <h3 className="receipt_property_name" style={{ fontSize: "13px" }}>
              3 Bedroom Apartment
            </h3>
          </div>

          <div>
            <p className="receipt_property_title">Amount</p>
            <h3 className="receipt_property_name" style={{ fontSize: "13px" }}>
              {amount}
            </h3>
          </div>
        </div>
      </div>

      <div className="receipt_down">
        <div className="receipt_customer_details">
          <div>
            <p className="receipt_customer_name" style={{ fontSize: "13px" }}>
              {userName}
            </p>
            <p className="receipt_customer_phone" style={{ fontSize: "10px" }}>
              {transactionId}
            </p>
          </div>
        </div>
        <div className="receipt_status_completed" style={receiptStatusStyle}>
          <i className={statusIcon()}></i>
          {transactionStatus}
        </div>
      </div>

      <p
        className="rejection_reason"
        style={{ display: reasonForRejection !== "" ? "block" : "none" }}
      >
        {reasonForRejection}
      </p>
    </div>
  );
};

export default UserTransactionCard;
