import Image from "next/image";
import classes from "./AboutCard.module.css";

interface Props {
  id: number;
  icon: string;
  title: string;
  description: string;
  animation: {
    card: string;
    index: string;
  };
}

export default function AboutCard({
  id,
  icon,
  title,
  description,
  animation,
}: Props) {
  return (
    <div
      className={classes.aboutCard}
      data-aos={animation.card}
      data-aos-duration="700"
    >
      <div
        className={classes.aboutCardIndex}
        data-aos={animation.index}
        data-aos-duration="700"
        data-aos-delay="200"
      >{`0${id}`}</div>
      <span className={classes.aboutCardDetails}>
        <div
          className={classes.aboutCardImage}
          data-aos={animation.index}
          data-aos-duration="700"
          data-aos-delay="400"
        >
          <Image
            src={icon}
            alt={title.toLowerCase()}
            fill
            sizes="(max-width: 768px) 100%"
          />
        </div>

        <h4
          className="text-[#00003f]"
          data-aos={animation.index}
          data-aos-duration="700"
          data-aos-delay="600"
        >
          {title}
        </h4>
        <p
          className="text-gray-500"
          data-aos={animation.index}
          data-aos-duration="700"
          data-aos-delay="800"
        >
          {description}
        </p>
      </span>
    </div>
  );
}
