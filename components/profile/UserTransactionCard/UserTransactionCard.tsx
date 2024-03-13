"use client";

import { TransactionsListProps } from "@/types";
import classes from "./UserTransactionCard.module.css";
import Image from "next/image";

interface Props {
  transaction: TransactionsListProps;
}

// [
//   {
//     currency: "",
//     id: 6,
//     amount: "780000.00",
//     transactionStatus: "Pending",
//     descriptionCode: "Jones Painting",
//     imageList: [
//       {
//         id: 5,
//         version: 0,
//         delFlag: "N",
//         createdOn: null,
//         modifiedOn: null,
//         imageUrl:
//           "https://res.cloudinary.com/dsdhgipbp/image/upload/v1710269089/ibzuyjjsy481qyy7sd5g.jpg",
//       },
//     ],
//   },
// ];

const UserTransactionCard = ({ transaction }: Props) => {
  const { amount, transactionStatus, currency, descriptionCode, imageList } =
    transaction;

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
    <div className={classes.userCardContainer}>
      <div className={classes.imageContainer}>
        <Image
          src={imageList[0].imageUrl}
          alt="apartment"
          width={200}
          height={100}
        />
        <div className={classes.detailsContainer}>
          <div>
            <p>Property Name</p>
            <h3>{descriptionCode}</h3>
          </div>

          <div>
            <p>Amount</p>
            <h3>
              {currency} {amount}
            </h3>
          </div>
        </div>
      </div>

      <div className="receipt_down">
        {/* <div className="receipt_customer_details">
          <div>
            <p className="receipt_customer_name" style={{ fontSize: "13px" }}>
              userName
            </p>
            <p className="receipt_customer_phone" style={{ fontSize: "10px" }}>
              transactionId
            </p>
          </div>
        </div> */}
        <div className={classes.status} style={receiptStatusStyle}>
          <i className={statusIcon()}></i>
          {transactionStatus}
        </div>
      </div>

      {/* <p
        className="rejection_reason"
        style={{ display: reasonForRejection !== "" ? "block" : "none" }}
      >
        {reasonForRejection}
      </p> */}
    </div>
  );
};

export default UserTransactionCard;
