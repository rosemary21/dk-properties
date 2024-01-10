"use client";

import TitleBar from "@/components/TitleBar/TitleBar";
import Navbar from "@/components/navbar/Navbar";

export default function Checkout() {
  return (
    <div className="max-[992px]:px-[20px] min-[993px]:px-[100px]">
      <Navbar />
      <TitleBar title="Checkout" />
    </div>
  );
}
