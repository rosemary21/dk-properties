"use client";
import PropertiesServices from "@/services/properties";
import classes from "./propertyBody.module.css";
import { useQuery } from "@tanstack/react-query";
import usePropertyStore from "@/store/PropertyStore";
import { useEffect, useState } from "react";
import useCheckBoxStore from "@/store/CheckBoxStore";
import PropertyItem from "../propertyItem/PropertyItem";
import NoPropertyAlert from "../noPropertyAlert/NoPropertyAlert";
import { Button, Pagination } from "@mantine/core";
import convertToString from "@/utils/convertToString";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { CssLoader } from "@/utils/Loader";
import Error from "@/modals/Error";

interface Props {
  propertyType: string;
}

export default function PropertyBody({ propertyType }: Props) {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const { getProperties } = PropertiesServices();
  const location = usePropertyStore((state) => state.state);
  const prices = useCheckBoxStore((state) => state.price);
  const property = propertyType;

  const pageNo = convertToString(pageNumber - 1);

  const { data: properties, isLoading } = useQuery({
    queryKey: [
      "getProperties",
      { location, pageNo, pageSize, prices, property },
    ],
    queryFn: () =>
      getProperties({ location, pageNo, pageSize, prices, property }),
  });

  useEffect(() => {
    localStorage.setItem("propertyType", propertyType);
  }, [propertyType]);

  return (
    <div className={classes.container}>
      <hr className={classes.propertyBreak} />
      {properties && properties.length > 0 ? (
        <>
          <div className={classes.propertyGroup}>
            {properties.map((property) => (
              <PropertyItem key={property.id} item={property} />
            ))}
          </div>
        </>
      ) : (
        <>
          <NoPropertyAlert />
        </>
      )}
      <Pagination
        total={Math.ceil(pageNumber / pageSize)}
        color="red"
        value={pageNumber}
        onChange={setPageNumber}
        siblings={1}
        defaultValue={1}
        boundaries={1}
        className="w-full flex items-center justify-center my-6"
        size="lg"
      />

      <div className={classes.userPreference}>
        <div className={classes.userPrefLeft}>
          <div className="property-box user-pref-left-box">
            <div className={classes.boxFeature}>{20 ? <p>3D</p> : null}</div>
          </div>
        </div>

        <div className={classes.userPrefRight}>
          <h2>Not found what you are looking for?</h2>
          <p>
            Let us know your preference and our business team will reach out to
            you with what matches your request.
          </p>
          <Link href="/contact">
            <Button
              color="#e80e0f38"
              size="lg"
              rightSection={<FaArrowRight className="text-primary" size={19} />}
            >
              <span className="text-primary">Tell Us</span>
            </Button>
          </Link>
        </div>
      </div>

      {isLoading && <CssLoader />}
    </div>
  );
}
