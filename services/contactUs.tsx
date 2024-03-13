"use client";
import { ResponseDtoProps } from "@/types";
import { dker, getToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import {
  openErrorNotification,
  openSuccessNotification,
} from "@/utils/openNotification";
import { useState } from "react";

type Props = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
};

export default function ContactUsService() {
  const [isLoading, setIsLoading] = useState(false);
  const token = getToken();
  const router = useRouter();

  async function contactUsApi({
    emailAddress,
    firstName,
    lastName,
    message,
    phoneNumber,
  }: Props) {
    setIsLoading(true);
    if (token) {
      const headers = new Headers();
      headers.append("apiKey", token);
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        message,
      });

      const options = { method: "POST", headers, body };
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/contact/add`;
        const response = await fetch(url, options);
        const result = await response.json();
        const res = result.responseDto as ResponseDtoProps;
        if (res.code === dker) {
          setIsLoading(false);
          openErrorNotification(res.message);
          return;
        }
        setIsLoading(false);
        openSuccessNotification(res.message || "Message was sent successfully");
      } catch (error: any) {
        setIsLoading(false);
        openErrorNotification(error.message);
        return;
      }
    } else {
      setIsLoading(false);
      openErrorNotification("Login to send a message...");
      router.push("/login");
    }
  }
  
  return { contactUsApi, isLoading };
}
