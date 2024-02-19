"use client";
import { Carousel } from "@mantine/carousel";
import classes from "./DetailaMain.module.css";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { PropertyResponseProps } from "@/types";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Breadcrumbs, Anchor, Button } from "@mantine/core";
import PropertyType from "@/utils/PropertyType";
import { useRouter } from "next/navigation";
import formatCurrency from "@/utils/FormatCurrency";
import { Table } from "@mantine/core";
import TransactionService from "@/services/Transaction";

export default function DetailsMain() {
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  const [property, setProperty] = useState({} as PropertyResponseProps);
  const [propertyLink, setPropertyLink] = useState<string[]>([]);
  const [pdfLink, setPdfLink] = useState<string>("");
  const { checkout } = TransactionService();

  const router = useRouter();

  const items = [
    { title: "Home", href: "/", color: "black", className: "breadCrumBlack" },
    {
      title: propertyLink[0],
      href: propertyLink[1],
      color: "black",
      className: "breadCrumBlack",
    },
    {
      title: property && property.code,
      href: "#",
      color: "#888",
      className: "breadCrumGray",
    },
  ].map((item, index) => (
    <Anchor
      key={index}
      className={item.className}
      underline="never"
      component="button"
      onClick={() => router.push(item.href)}
    >
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    const localData = localStorage.getItem("propertyType");
    if (!localData) return;
    if (localData === PropertyType.propertyLand) {
      setPropertyLink(["Lands", "/lands"]);
    } else if (localData === PropertyType.propertyApartment) {
      setPropertyLink(["Apartments", "/apartments"]);
    } else {
      setPropertyLink(["Shortlets", "/shortlets"]);
    }
  }, []);

  useEffect(() => {
    const localData = localStorage.getItem("property");
    if (!localData) return;
    const property = JSON.parse(localData) as PropertyResponseProps;
    setProperty(property);
  }, []);

  const landDocLink = () => {
    if (typeof property?.landDoc !== null && property?.landDoc) {
      return property?.landDoc[0].imageUrl;
    }
    return "";
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className="left">
          <Carousel
            withIndicators
            height={350}
            loop
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            nextControlIcon={<FaChevronRight size={22} />}
            previousControlIcon={<FaChevronLeft size={22} />}
          >
            {property.imagesList &&
              property.imagesList.map((image) => (
                <Carousel.Slide
                  key={image.id}
                  className="relative w-full h-full"
                >
                  {image.imageUrl.endsWith("mp4") ? (
                    <video
                      src={image.imageUrl}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full"
                    ></video>
                  ) : (
                    <Image
                      src={image.imageUrl}
                      alt={property.description}
                      fill
                      priority
                      sizes="(max-width: 768px) 100%"
                    />
                  )}
                </Carousel.Slide>
              ))}
          </Carousel>
        </div>
        <div className="right">
          <Breadcrumbs separator="→" mt="xs">
            {items}
          </Breadcrumbs>

          <h2 className={classes.title}>{property && property.code}</h2>

          <div className={classes.description}>
            {property && property.description}
          </div>

          <div className="my-4">
            <Table highlightOnHover highlightOnHoverColor="#e80e0e24">
              <Table.Thead>
                <Table.Tr>
                  {property.percentageDiscount && <Table.Th>Discount</Table.Th>}
                  {property.productSize && <Table.Th>Size</Table.Th>}
                  {property.price && <Table.Th>Price</Table.Th>}
                  {property.location && <Table.Th>location</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  {property.percentageDiscount && (
                    <Table.Td>{property.percentageDiscount}%</Table.Td>
                  )}
                  {property.productSize && (
                    <Table.Td>{property.productSize}</Table.Td>
                  )}
                  {property.price && <Table.Td>{property.price}</Table.Td>}
                  {property.location && (
                    <Table.Td>{property.location}</Table.Td>
                  )}
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </div>

          <div className={classes.descriptionAmount}>
            {formatCurrency(property.currency, property.amount)}
          </div>
        
          <div className="flex items-center mt-5 gap-6">
            <a href={landDocLink()} target="_blank" download={true}>
              <Button className={classes.payBtn} size="lg">
                Continue
              </Button>
            </a>

            <Button
              className={classes.contactUsBtn}
              size="lg"
              onClick={() => router.push("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
