/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getUserName } from "@/utils/Links";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, TextInput, Select } from "@mantine/core";
import Image from "next/image";
import TransactionService from "@/services/Transaction";
import { CssLoader } from "@/utils/Loader";

export default function UploadTransaction() {
  const [file, setFile] = useState<FileList | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [uploadStates, setUploadStates] = useState({
    description: "",
    amount: "",
    currency: "",
    username: "",
  });
  const { handleUploadTransaction, isLoading } = TransactionService();
  const userName = getUserName();

  const uploadFormRef = useRef<HTMLFormElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files as unknown as FileList;
    setFile(files);
    if (files) {
      setImageSrc(URL.createObjectURL(files[0]));
    }
  };

  const getFilesFromSystem = () => {
    fileRef.current?.click();
  };

  useEffect(() => {
    setUploadStates((prev) => ({ ...prev, username: userName }));
  }, []);

  return (
    <>
      {imageSrc && (
        <div className="relative w-2/3 my-2 mx-auto rounded-sm h-[200px]">
          <Image src={imageSrc} alt="" fill priority />
        </div>
      )}

      <form
        className="w-full flex flex-col gap-4"
        onSubmit={(e) =>
          handleUploadTransaction({
            e,
            file,
            setFile,
            uploadStates,
            setUploadStates,
            setImageSrc,
          })
        }
        ref={uploadFormRef}
      >
        <input
          type="file"
          name="uploadTransaction"
          hidden
          ref={fileRef}
          onChange={handleFileChange}
        />

        <Button
          type="button"
          onClick={getFilesFromSystem}
          className="w-full mt-4"
          variant="light"
        >
          {imageSrc ? "Image Uploaded" : "Upload image"}
        </Button>

        <TextInput
          label="Description"
          withAsterisk
          placeholder="Description"
          value={uploadStates.description}
          onChange={(e) =>
            setUploadStates((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          name="description"
        />

        <TextInput
          label="Amount"
          withAsterisk
          placeholder="Amount"
          value={uploadStates.amount}
          onChange={(e) =>
            setUploadStates((prev) => ({
              ...prev,
              amount: e.target.value,
            }))
          }
          name="amount"
        />

        <Select
          label="Currency"
          withAsterisk
          placeholder="Currency"
          data={["₦", "£", "$", "€"]}
        />

        <TextInput
          label="User name"
          withAsterisk
          placeholder="Username"
          value={uploadStates.username}
          onChange={(e) =>
            setUploadStates((prev) => ({
              ...prev,
              username: e.target.value,
            }))
          }
          name="userName"
        />

        {imageSrc && (
          <Button variant="light" type="button" onClick={() => setImageSrc("")}>
            Clear Files
          </Button>
        )}

        <Button type="submit">Submit</Button>
      </form>

      {isLoading && <CssLoader />}
    </>
  );
}
