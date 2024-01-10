import React from "react";
import TestimonialCard from "../testimonialCard/TestimonialCard";
import testimonials from "@/data/home/Testimonial";
import classes from "./Testimonial.module.css";

export default function Testimonial() {
  return (
    <section className={classes.container}>
      <h2 className={classes.testimonial_header} data-aos="fade-up-right">
        Loved by businesses, and individuals across the globe.
      </h2>

      <div className={classes.testimonial_cards}>
        {testimonials.map((data) => (
          <TestimonialCard key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
}
