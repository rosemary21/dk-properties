"use client";
import Link from "next/link";
import classes from "./Main.module.css";
import Image from "next/image";
import { FaMeta, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Select } from "@mantine/core";
import { AiOutlineHome } from "react-icons/ai";
import NaijaStates from "naija-state-local-government";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";
import BgImage from "@/public/homeMainBg.png";
import OverlayLine from "@/public/lineOverlay.png";
import SelectState from "@/components/selectState/SelectState";

export default function HomeMain() {
  const [value, setValue] = useState<string | null>("");
  const { width } = useWindowSize();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.propertyMainLeft}>
        <p
          className={classes.subtitle}
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          Best Property Platform
        </p>
        <p
          className={classes.title}
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="300"
        >
          Property Acquisition made seamless
        </p>
        <p
          className={classes.description}
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="500"
        >
          D&apos;kerulative Properties simplifies property acquisition with a
          seamless application. Discover a user-friendly platform for
          hassle-free real estate transactions, making your property journey
          effortless and efficient.
        </p>

        <SelectState className="" />
      </div>

      <div
        className={classes.propertyMainCenter}
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        <Image
          src={BgImage}
          alt="backgound image"
          fill
          priority
          sizes="(max-width: 768px) 100%"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={classes.propertyMainRight}>
        <Link
          href="https://www.facebook.com/"
          target="_blank"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <FaMeta size={20} />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="300"
        >
          <FaInstagram size={20} />
        </Link>
        <Link
          href="https://twitter.com/"
          target="_blank"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="500"
        >
          <FaXTwitter size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="700"
        >
          <FaLinkedinIn size={20} />
        </Link>
      </div>

      <div className={classes.overlayLine1}>
        <Image
          src={OverlayLine}
          alt="line1"
          fill
          priority={false}
          sizes="(max-width: 768px) 100%"
        />
      </div>
      <div className={classes.overlayLine2}>
        <Image
          src={OverlayLine}
          alt="line2"
          fill
          priority={false}
          sizes="(max-width: 768px) 100%"
        />
      </div>
      <div className={classes.overlayLine3}>
        <Image
          src={OverlayLine}
          alt="line3"
          fill
          priority={false}
          sizes="(max-width: 768px) 100%"
        />
      </div>
    </div>
  );
}
