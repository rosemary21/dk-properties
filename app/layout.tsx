/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider, Loader } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import theme from "@/config/MantineThemes";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIdleTimer } from "react-idle-timer";
import Cookies from "js-cookie";
import { userEmail, userToken } from "@/utils/Links";
import { useRouter } from "next/navigation";
import openNotification from "@/utils/openNotification";
import AuthService from "@/services/auth";

const poppins = Poppins({
  subsets: ["devanagari"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {logOutUser} = AuthService()

  const timeOut = async () => {
    await logOutUser();
    localStorage.clear();
    Cookies.remove(userToken);
    Cookies.remove(userEmail);
    router.push("/");
    openNotification({
      message:
        "This User has been inactive for more than 10 minutes, Please Login to continue",
    });
  };

  const onIdle = () => {
    timeOut();
  };

  useIdleTimer({
    onIdle,
    timeout: 1000 * 60 * 10,
    promptTimeout: 0,
    events: [
      "mousemove",
      "keydown",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
    ],
    immediateEvents: [],
    debounce: 0,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    syncTimers: 0,
  });

  useEffect(() => {
    const loggedInUser = Cookies.get(userToken);
    if (loggedInUser) {
      return;
    } else {
      router.push("/");
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <title>Dkerulative Properties</title>

        {/* Box icons cdn */}
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>

        {/* AOS */}
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        ></link>
        <script defer src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      </head>
      <body className={poppins.className}>
        <MantineProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            {children}
            <Notifications />
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
