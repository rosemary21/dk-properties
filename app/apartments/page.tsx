import Navbar from "@/components/navbar/Navbar";
import LandMain from "@/components/lands/LandMain/LandMain";
import PropertyBody from "@/components/propertyBody/PropertyBody";
import PropertyType from "@/utils/PropertyType";
import Footer from "@/components/Footer/Footer";

export default function Lands() {
  
  return (
    <div>
      <Navbar />
      <LandMain />
      <PropertyBody propertyType={PropertyType.propertyApartment} />
      <Footer />
    </div>
  );
}
