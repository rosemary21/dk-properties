import Image from "next/image";
import classes from "./About.module.css";
import LeftOverlay from "/public/curve-left-overlay.png";
import RightOverlay from "/public/curve-right-overlay.png";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import aboutData from "@/data/home/About";
import AboutCard from "../aboutCard/AboutCard";

export default function About() {
  return (
    <div className={classes.container}>
      <div className={classes.aboutTop}>
        <p
          className={classes.title}
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          Your Dream <span className="text-primary">Property</span> Now Within
          Reach
        </p>
        <div
          className={classes.description}
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          <FaQuoteLeft />
          <p>
            The top property center platform in Nigeria is D&apos;kulerative. We
            offer people the greatest property search experience both online and
            offline with a web-based platform for property sales by linking them
            with reliable and verified real estate agents.
          </p>
          <FaQuoteRight />
        </div>
      </div>

      <div className={classes.aboutBottom}>
        {aboutData.map((data) => (
          <AboutCard key={data.id} {...data} />
        ))}
      </div>

      <Image
        className={classes.overlayLeft}
        src={LeftOverlay}
        alt="overlayLeft"
      />
      <Image
        className={classes.overlayRight}
        src={RightOverlay}
        alt="overlayRight"
      />
    </div>
  );
}
