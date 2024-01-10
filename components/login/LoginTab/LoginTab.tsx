"use client";
import { Tabs } from "@mantine/core";
import { useState } from "react";

export default function LoginTabs() {
  const [state, setState] = useState("signIn");

  const styles = (tab: string) => {
    return {
      fontSize: "18px",
      color: state === tab ? "#E80E0F" : "black",
      fontWeight: "600",
    };
  };

  return (
    <Tabs.List grow justify="center">
      <Tabs.Tab
        value="signIn"
        style={styles("signIn")}
        onClick={() => setState("signIn")}
        id="signInBtn"
        data-aos="fade-right"
      >
        Sign In
      </Tabs.Tab>
      <Tabs.Tab
        value="register"
        style={styles("register")}
        onClick={() => setState("register")}
        data-aos="fade-left"
      >
        Register
      </Tabs.Tab>
    </Tabs.List>
  );
}
