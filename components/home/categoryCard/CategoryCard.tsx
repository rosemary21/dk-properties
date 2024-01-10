import Link from "next/link";
import classes from "./CategoryCard.module.css";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  category: string;
  count: number;
  image: string;
  link: string;
  animation: string;
};

export default function CategoryCard({
  category,
  count,
  image,
  link,
  animation,
}: Props) {
  const renderCategory = (category: string) => {
    if (category == "PROLAN") return "Lands";
    if (category == "PROAPA") return "Apartments";
    else return "Shortlets";
  };
  return (
    <Link
      href={link}
      className="w-full"
      data-aos={animation}
      aos-duration="1000"
    >
      <div
        className={classes.card}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div
          className={classes.description}
          data-aos="fade-up-right"
          data-aos-delay="300"
        >
          <div className={classes.left}>
            <p
              className={classes.categoryTop}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {renderCategory(category)}
            </p>
            <p className={classes.categoryBottom}>{`${
              count ? count : 0
            } Available`}</p>
          </div>

          <span
            className={classes.right}
            data-aos="fade-up-left"
            data-aos-delay="600"
          >
            <FaArrowRight size={21} className="text-white" />
          </span>
        </div>
      </div>
    </Link>
  );
}
