"use client";

import { dker, getToken, userEmail, userToken } from "@/utils/Links";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import openNotification from "@/utils/openNotification";

type LogInProps = {
  userName: string;
  password: string;
};

type RegisterProps = {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  userName: string;
  password: string;
  confirmPassword: string;
};

type UpdateUserProps = Pick<
  RegisterProps,
  "email" | "firstName" | "lastName" | "password" | "userName" | "userType"
>;

export default function AuthService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const apiKey = getToken();

  const [opened, { open, close }] = useDisclosure(false);

  async function handleLogIn({ userName, password }: LogInProps) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/login/customer`;
    setIsLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({ userName, password });
    const options = { method: "POST", headers, body };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.responseDto.code == dker) {
        setIsLoading(false);
        setError(data.responseDto.message);
        open();
        return;
      }
      setIsLoading(false);
      Cookies.set(userToken, data.token);
      Cookies.set(userEmail, data.emailAddress);
      router.back();
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    }
  }

  async function handleSignUp({
    confirmPassword,
    email,
    firstName,
    lastName,
    password,
    userName,
    userType,
  }: RegisterProps) {
    setIsLoading(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      userType,
      userName,
      password,
      confirmPassword,
    });

    const options = { method: "POST", headers, body };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/add`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.responseDto.code === dker) {
        setIsLoading(false);
        setError(result.responseDto.message);
        open();
      }
      setIsLoading(false);
      setSuccess(true);
      // setTimeout(() => {
      //   if (typeof window !== "undefined" && window.location) {
      //     window.location.reload();
      //   }
      // }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      open();
    } finally {
      setIsLoading(false);
      setError("");
    }
  }

  async function handleUpdateUser({
    email,
    firstName,
    lastName,
    password,
    userName,
    userType,
  }: UpdateUserProps) {
    setIsLoading(true);
    const headers = new Headers();
    headers.append("apiKey", apiKey);
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      firstName,
      lastName,
      email,
      userType,
      userName,
      password,
    });

    const options = { method: "POST", headers, body };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/update`;

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.responseDto.code === dker) {
        setIsLoading(false);
        setError(result.responseDto.message);
        open();
      } else {
        setIsLoading(false);
        openNotification({ message: result.responseDto.message });
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      open();
    } finally {
      setIsLoading(false);
      setError("");
    }
  }

  async function logOutUser() {
    setIsLoading(true);
    const headers = new Headers();
    headers.append("apiKey", apiKey);
    const options = { method: "GET", headers };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/logout`;
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result.resp.code == dker) {
        setIsLoading(false);
        setError(result.res.code.message);
        return;
      } else {
        Cookies.remove(userEmail);
        Cookies.remove(userToken);
        localStorage.clear();
        setIsLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
    } finally {
      setIsLoading(false);
      setError("");
    }
  }

  return {
    isLoading,
    error,
    handleLogIn,
    opened,
    close,
    handleSignUp,
    success,
    logOutUser,
    handleUpdateUser,
  };
}
