import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProfileMain from "@/components/profile/ProfileMain/ProfileMain";
import classes from "./page.module.css";

type Props = { params: { slug: string } };

export default function Profile({ params }: Props) {
  return (
    <div className={classes.container}>
      <Navbar />
      <ProfileMain user={params.slug} />
      <Footer />
    </div>
  );
}
