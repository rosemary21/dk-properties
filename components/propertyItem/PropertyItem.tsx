"use client";
import { PropertyResponseProps } from "@/types";
import classes from "./PropertyItem.module.css";
import { FaArrowRight } from "react-icons/fa";
import PropertiesServices from "@/services/properties";
import formatCurrency from "@/utils/FormatCurrency";

interface PropertyBoxProps {
  item: PropertyResponseProps;
}

export default function PropertyItem({ item }: PropertyBoxProps) {
  const { id, location, description, amount, imagesList, currency } = item;

  const { getAProperty } = PropertiesServices();

  return (
    <div
      className={classes.box}
      style={{ backgroundImage: `url(${imagesList[0].imageUrl})` }}
    >
      <div className={classes.box_feature}>
        {amount ? <p>{formatCurrency(currency, amount)}</p> : null}
      </div>

      <div className={classes.box_overlay}>
        <div>
          <h3 className="capitalize">{description}</h3>
          <p className="capitalize">{location}</p>
        </div>
        <button className={classes.box_btn} onClick={() => getAProperty(id)}>
          <FaArrowRight size={20} className={classes.icon} />
        </button>
      </div>
    </div>
  );
}
