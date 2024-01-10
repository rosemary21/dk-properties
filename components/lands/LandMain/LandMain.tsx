"use client";

import SelectState from "@/components/selectState/SelectState";
import classes from "./LandMain.module.css";
import { Button } from "@mantine/core";
import useCheckBoxStore from "@/store/CheckBoxStore";
import CheckboxTable from "@/components/checkBoxTable/CheckboxTable";

export default function LandMain() {
  const handleRefresh = useCheckBoxStore((state) => state.refresh);

  return (
    <div className={classes.mainContainer}>
      <h1
        className={classes.header}
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        Available Properties
      </h1>
      <SelectState className="sm:w-full md:w-[566px]" />
      <div
        className={classes.filter}
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="900"
      >
        <div className="w-full items-center flex justify-between">
          <p className={classes.title}>Filter</p>
          <Button color="#E80E0F" onClick={handleRefresh}>
            Refresh
          </Button>
        </div>

        <CheckboxTable />
      </div>
    </div>
  );
}
