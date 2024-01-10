import { Button } from "@mantine/core";
import classes from "./Category.module.css";
import Link from "next/link";
import { useState } from "react";
import { NumberOfPropertiesProp } from "@/types";
import CategoryCard from "../categoryCard/CategoryCard";

export default function Category() {
  const propertiesCategories = ["PROSHO", "PROAPA", "PROLAN"];
  const [numberOfProperties, setNumberOfProperties] = useState(
    {} as NumberOfPropertiesProp
  );

  const categories = [
    {
      id: 0,
      category: propertiesCategories[2],
      count: numberOfProperties.PROLAN,
      image: "/land-cat.png",
      link: "/lands",
      animation: "zoom-in-right",
    },
    {
      id: 1,
      category: propertiesCategories[0],
      count: numberOfProperties.PROSHO,
      image: "/shortlets-cat.png",
      link: "/shortlets",
      animation: "zoom-in-down",
    },
    {
      id: 2,
      category: propertiesCategories[1],
      count: numberOfProperties.PROAPA,
      image: "/apartments-cat.png",
      link: "/apartments",
      animation: "zoom-in-left",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <div
          className={classes.description}
          data-aos="fade-up-right"
          data-aos-delay="200"
        >
          <h3>We give the Best Property Deal</h3>
          <p>
            Colonel gravity get thought fat smiling add but. Wonder twenty
            hunted and put income set desire expect.
          </p>
        </div>
        <Link
          href="/lands"
          className={classes.btn}
          data-aos="fade-up-left"
          data-aos-delay="400"
        >
          <Button color="#E80E0F">View All Property</Button>
        </Link>
      </div>

      <div className={classes.bottom}>
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
