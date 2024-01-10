import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import classes from "./TitleBar.module.css";

export default function TitleBar({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className={classes.container}>
      <FaChevronLeft
        size={20}
        onClick={() => router.back()}
        className="cursor-pointer"
      />
      <h3 className="text-center text-[#46312A] font-bold text-lg">{title}</h3>
      <span></span>
    </div>
  );
}
