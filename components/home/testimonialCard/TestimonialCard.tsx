import { Image } from "@mantine/core";
import { FaStar } from "react-icons/fa";
import classes from "../testimonial/Testimonial.module.css";

interface Props {
  name: string;
  location: string;
  testimonial: string;
  img: string;
  delay: string;
}

export default function TestimonialCard({
  name,
  location,
  testimonial,
  img,
  delay,
}: Props) {
  return (
    <div
      className={classes.testimonial_card}
      data-aos="fade-up-right"
      data-aos-delay={delay}
    >
      <span className={classes.testimonialStars}>
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
        <FaStar size={18} />
      </span>
      <p className={classes.testimonial}>{testimonial}</p>
      <div className={classes.testimonial_person}>
        <Image src={img} alt={name} />
        <span>
          <h4>{name}</h4>
          <p>{location}</p>
        </span>
      </div>
    </div>
  );
}
