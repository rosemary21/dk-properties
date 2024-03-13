"use client";

import { dkss, getToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  openErrorNotification,
  openSuccessNotification,
} from "@/utils/openNotification";

type Props = {
  emailAddress: string;
};

export default function NewsLetterService() {
  const [isLoading, setIsLoading] = useState(false);

  const token = getToken();
  const router = useRouter();

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
              openSuccessNotification(
                "Thank you for subscribing to our newsletter. We’re happy to always inform you about our latest activities"
              );
            } else {
              setIsLoading(false);
              openErrorNotification(result.responseDto.message);
              return;
            }
          });
      } catch (error: any) {
        setIsLoading(false);
        openErrorNotification(error.message);
      }
    } else {
      setIsLoading(false);
      openErrorNotification("Login and try again...");
      router.push("/login");
    }
  }

  return {
    isLoading,
    handleJoinNewsletter,
  };
}
