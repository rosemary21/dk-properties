"use client";
import { useDisclosure } from "@mantine/hooks";
import { ResponseDtoProps } from "@/types";
import { dker, getToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import { useState } from "react";
import openNotification from "@/utils/openNotification";

type Props = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  message: string;
};

export default function ContactUsService() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = getToken();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  async function contactUsApi({
    emailAddress,
    firstName,
    lastName,
    message,
    phoneNumber,
  }: Props) {
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
          setError(res.message);
          return;
        }
        setSuccess(true);
        openNotification({ message: "Message was sent successfully" });
      } catch (error: any) {
        setError(error.message);
        open();
        return;
      } finally {
        setSuccess(false);
        setError("");
        open();
      }
    } else {
      router.push("/login");
    }
  }
  return { error, success, contactUsApi, opened, close };
}
