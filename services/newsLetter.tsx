"use client";

import { dkss, getToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  emailAddress: string;
};

export default function NewsLetterService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const token = getToken();
  const router = useRouter();

  const [
    isSuccessModalOpened,
    { open: openSuccessModal, close: closeSuccessModal },
  ] = useDisclosure(false);
  const [isErrorModalOpened, { open: openErrorModal, close: closeErrorModal }] =
    useDisclosure(false);

  async function handleJoinNewsletter({ emailAddress }: Props) {
    setIsLoading(true);

    if (token) {
      const headers = new Headers();
      headers.append("apiKey", token);
      headers.append("Content-Type", "application/json");
      const body = JSON.stringify({ emailAddress });
      const options = { method: "POST", headers, body };
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/subscription/subcribe`;
      try {
        await fetch(url, options)
          .then((response) => response.json())
          .then((result) => {
            if (result.responseDto.code === dkss) {
              setIsLoading(false);
              setError("");
              openSuccessModal();
            } else {
              setIsLoading(false);
              setError(result.responseDto.message);
              openErrorModal();
            }
          });
      } catch (error: any) {
        setIsLoading(false);
        setError(error.message);
        openErrorModal();
      } finally {
        setIsLoading(false);
        setError("");
        setIsSuccess(false);
      }
    } else {
      setIsLoading(false);
      router.push("/login");
    }
  }

  return {
    isLoading,
    error,
    isSuccess,
    handleJoinNewsletter,
    isSuccessModalOpened,
    closeSuccessModal,
    isErrorModalOpened,
    closeErrorModal,
  };
}
