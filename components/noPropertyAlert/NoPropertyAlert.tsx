import { Alert, Button } from "@mantine/core";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

export default function NoPropertyAlert() {
  const icon = <FaInfoCircle size={20} />;
  return (
    <Alert
      variant="light"
      color="red"
      radius="md"
      title={<h3 className="md:text-lg sm:text-sm text-primary">Property not found</h3>}
      icon={icon}
    >
      <p className="md:text-lg sm:text-sm">
        We apologize, but we couldn&apos;t find any properties in the specified
        location. Consider exploring other nearby locations for available
        properties.
      </p>
      <hr className="w-full bg-primary my-6 h-[2px]" />
      <p className="mb-6 md:text-lg sm:text-sm">
        If you have any further questions or need assistance, feel free to reach
        out to our support team.
      </p>
      <Link href="/contact">
        <Button color="red">Contact Us</Button>
      </Link>
    </Alert>
  );
}
