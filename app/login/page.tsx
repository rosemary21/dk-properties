"use client";

import Navbar from "@/components/navbar/Navbar";
import classes from "./page.module.css";
import { Tabs } from "@mantine/core";
import LoginTabs from "@/components/login/LoginTab/LoginTab";
import SignIn from "@/components/login/SignIn/SignIn";
import Register from "@/components/login/Register/Register";
import Footer from "@/components/Footer/Footer";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.loginContainer}>
          <h4 className={classes.title} data-aos="fade-down">
            Welcome Back
          </h4>

          <Tabs defaultValue="signIn" color="#E80E0F">
            <LoginTabs />
            <SignIn />
            <Register />
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
