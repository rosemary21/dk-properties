"use client";

import Footer from "@/components/Footer/Footer";
import About from "@/components/home/about/About";
import Category from "@/components/home/category/Category";
import FeaturedListing from "@/components/home/featuredListing/FeaturedListing";
import HomeMain from "@/components/home/main/Main";
import Testimonial from "@/components/home/testimonial/Testimonial";
import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeMain />
      <About />
      <Category />
      <Testimonial />
      <FeaturedListing />
      <Footer />
    </>
  );
}
