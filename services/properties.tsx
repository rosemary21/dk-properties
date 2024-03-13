import { GetPropertiesResponseProps, PropertyResponseProps } from "@/types";
import { dker } from "@/utils/Links";
import { useRouter } from "next/navigation";
import { openErrorNotification } from "@/utils/openNotification";

type GetPropertiesProps = {
  location: string | null;
  prices: string;
  property: string;
  pageSize: number;
  pageNo: string;
};

export default function PropertiesServices() {
  const router = useRouter();

  async function getProperties({
    location,
    pageNo,
    pageSize,
    prices,
    property,
  }: GetPropertiesProps) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (!location) return;

    const body = JSON.stringify({
      location,
      prices,
      property,
      pageSize,
      pageNo,
    });

    const options = { method: "POST", headers, body };
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/productdescription/search`;
    try {
      const response = await fetch(url, options);
      const result: GetPropertiesResponseProps = await response.json();
      if (result.responseDto.code == dker) {
        openErrorNotification(result.responseDto.message);
        return;
      }
      localStorage.setItem(
        "properties",
        JSON.stringify(result.productDescriptionDtoList)
      );
      return result.productDescriptionDtoList;
    } catch (error: any) {
      openErrorNotification(error.message + ", try to refresh your browser");
    }
  }

  async function getAProperty(id: number) {
    const localData = localStorage.getItem("properties");
    if (!localData) return;
    const properties: PropertyResponseProps[] = JSON.parse(localData);
    const property = properties.find((property) => property.id === id);
    if (!property) return;
    localStorage.setItem("property", JSON.stringify(property));
    router.push("/details");
  }

  return { getProperties, getAProperty };
}
