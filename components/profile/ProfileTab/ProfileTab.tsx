"use client";

import { Tabs } from "@mantine/core";
import { GrUpdate, GrTransaction } from "react-icons/gr";
import { FaUpload } from "react-icons/fa";
import { useState } from "react";

export default function ProfileTabList() {
  const [active, setActive] = useState("transaction");

  return (
    <Tabs.List grow>
      <Tabs.Tab
        value="transaction"
        leftSection={<GrTransaction size={15} />}
        style={{
          color: active === "transaction" ? "#e80e0f" : "black",
          fontWeight: "bold",
        }}
        onClick={() => setActive("transaction")}
      >
        Transactions
      </Tabs.Tab>
      <Tabs.Tab
        value="upload"
        leftSection={<FaUpload size={15} />}
        style={{
          color: active === "upload" ? "#e80e0f" : "black",
          fontWeight: "bold",
        }}
        onClick={() => setActive("upload")}
      >
        Upload
      </Tabs.Tab>
      <Tabs.Tab
        value="update"
        leftSection={<GrUpdate size={15} />}
        style={{
          color: active === "update" ? "#e80e0f" : "black",
          fontWeight: "bold",
        }}
        onClick={() => setActive("update")}
      >
        Update
      </Tabs.Tab>
    </Tabs.List>
  );
}
