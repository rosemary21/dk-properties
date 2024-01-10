"use client";

import { useWindowSize } from "usehooks-ts";
import { Select } from "@mantine/core";
import { AiOutlineHome } from "react-icons/ai";
import NaijaStates from "naija-state-local-government";
import classes from "../home/main/Main.module.css";
import usePropertyStore from "@/store/PropertyStore";

type Props = {
  className: string;
};

export default function SelectState({ className }: Props) {
  const state = usePropertyStore((prev) => prev.state);
  const onChangeState = usePropertyStore((prev) => prev.onChangeState);

  const { width } = useWindowSize();
  return (
    <Select
      placeholder="Select states to search properties"
      data={NaijaStates.states()}
      leftSection={<AiOutlineHome size={19} />}
      defaultValue={NaijaStates.states()[24]}
      size={width < 576 ? "sm" : width > 576 && width < 992 ? "md" : "lg"}
      value={state}
      onChange={onChangeState}
      className={`${classes.selectForm} ${className}`}
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-delay="700"
    />
  );
}
