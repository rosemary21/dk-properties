"use client";

import {
  dker,
  getToken,
  getUserName,
  userEmail,
  userToken,
} from "@/utils/Links";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  openErrorNotification,
  openSuccessNotification,
} from "@/utils/openNotification";

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
  const router = useRouter();
  const apiKey = getToken();

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
        openErrorNotification(data.responseDto.message);
        return;
      }
      setIsLoading(false);
      openSuccessNotification(data?.responseDto?.message);
      Cookies.set(userToken, data.token);
      Cookies.set(userEmail, data.emailAddress);
      const user = getUserName();
      router.push(`/profile/${user}`);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
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
        openErrorNotification(result.responseDto.message);
        return;
      }
      setIsLoading(false);
      openSuccessNotification(result.responseDto.message);
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
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
        openSuccessNotification(result.responseDto.message);
        return;
      } else {
        setIsLoading(false);
        openErrorNotification(result.responseDto.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
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
        openErrorNotification(result.res.code.message);
        return;
      } else {
        openSuccessNotification(result?.resp?.message);
        Cookies.remove(userEmail);
        Cookies.remove(userToken);
        localStorage.clear();
        setIsLoading(false);
        router.push("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    handleLogIn,
    handleSignUp,
    logOutUser,
    handleUpdateUser,
  };
}
