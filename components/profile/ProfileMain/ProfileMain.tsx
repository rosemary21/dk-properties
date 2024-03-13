"use client";

import { Button, Tabs } from "@mantine/core";
import ProfileTabList from "../ProfileTab/ProfileTab";
import AuthService from "@/services/auth";
import { CssLoader } from "@/utils/Loader";
import UploadTransaction from "../UploadTransactions/UploadTransactions";
import classes from "./ProfileMain.module.css";
import UpdateUser from "../UpdateUser/UpdateUser";
import UserTransactions from "../UserTransactions/UserTransactions";

export default function ProfileMain({ user }: { user: string }) {
  const { logOutUser, isLoading } = AuthService();
  return (
    <div className="mt-[12vh] md:w-[500px] sm:w-full mx-auto my-12">
      <div className="text-center my-4 font-medium capitalize text-lg">
        Welcome {user?.split("%40")[0]}
      </div>
      <Tabs defaultValue="transaction">
        <ProfileTabList />

        <Tabs.Panel value="transaction">
          <UserTransactions />
        </Tabs.Panel>

        <Tabs.Panel value="upload" className="my-5">
          <UploadTransaction />
        </Tabs.Panel>

        <Tabs.Panel value="update">
          <UpdateUser />
        </Tabs.Panel>
      </Tabs>

      <Button
        color="#E80E0f"
        onClick={logOutUser}
        className={classes.submitButton}
      >
        Sign out
      </Button>

      {isLoading && <CssLoader />}
    </div>
  );
}
