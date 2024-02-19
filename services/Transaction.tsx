import { AllTransactionsProps, UploadTransactionResponseProps } from "@/types";
import { dker, getToken, getUserName } from "@/utils/Links";
import openNotification from "@/utils/openNotification";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useState,
} from "react";

interface UploadProps {
  e: FormEvent<HTMLFormElement>;
  file: FileList | null;
  setFile: Dispatch<SetStateAction<FileList | null>>;
  uploadStates: {
    description: string;
    amount: string;
    currency: string;
    username: string;
  };
  setUploadStates: Dispatch<
    SetStateAction<{
      description: string;
      amount: string;
      currency: string;
      username: string;
    }>
  >;
  setImageSrc: Dispatch<SetStateAction<string>>;
}

export default function TransactionService() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = getToken();
  const userName = getUserName();
  const router = useRouter();

  const handleUploadTransaction = async ({
    e,
    file,
    setFile,
    uploadStates,
    setUploadStates,
    setImageSrc,
  }: UploadProps) => {
    e.preventDefault();
    setIsLoading(true);
    const headers = new Headers();
    headers.append("apiKey", apiKey);

    const formdata = new FormData();
    if (!file) return;
    formdata.append("files", file[0], file[0].name);
    formdata.append("description", uploadStates.description);
    formdata.append("amount", uploadStates.amount);
    formdata.append("currency", uploadStates.currency);
    formdata.append("userName", uploadStates.username);

    const options = { method: "POST", headers, body: formdata };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transaction/upload`;

    try {
      const response = await fetch(url, options);
      const result: UploadTransactionResponseProps = await response.json();
      if (result.responseDto.code == dker) {
        setIsLoading(false);
        setErrorMessage(result.responseDto.message);
        return;
      } else {
        openNotification({
          message:
            uploadStates.username + " your " + result.responseDto.message,
        });
        setFile(null);
        setImageSrc("");
        setUploadStates((prev) => ({
          ...prev,
          amount: "",
          currency: "",
          description: "",
          username: "",
        }));
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  const getUserTransactions = async (pageNo: number, pageSize: number) => {
    const headers = new Headers();
    headers.append("apiKey", apiKey);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      pageSize: pageSize - 1,
      pageNo,
    });

    const options = { method: "POST", headers, body };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/transaction/all/property/page`;

    try {
      const response = await fetch(url, options);
      const result: AllTransactionsProps = await response.json();
      if (result.responseDto.code == dker) {
        setErrorMessage(result.responseDto.message);
      } else {
        return result.transactionList;
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const checkout = async (
    prodCode: string,
    setPdfLink: Dispatch<SetStateAction<string>>
  ) => {
    if (!apiKey) {
      router.push("/login");
    }
    try {
      setPdfLink(prodCode)
    } catch (error) {
      return error;
    }
  };

  return {
    isLoading,
    errorMessage,
    handleUploadTransaction,
    getUserTransactions,
    checkout,
  };
}
