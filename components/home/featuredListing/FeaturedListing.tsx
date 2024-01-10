import { Button, Image, Table } from "@mantine/core";
import classes from "./FeaturedListing.module.css";
import Link from "next/link";

export default function FeaturedListing() {
  return (
    <div className="my-12">
      <h2 className={classes.service_header} data-aos="fade-up">
        Featured Listing of the Week
      </h2>

      <div className={classes.service_container}>
        <div className={classes.service_imgs}>
          <Image
            className={classes.service_pic_1}
            src="/service-upper.png"
            alt="service-pic-1"
          />
          <Image
            className={classes.service_pic_2}
            src="/service-lower.png"
            alt="service-pic-2"
          />
        </div>

        <div className={classes.service_table}>
          <h2 data-aos="fade-up">
            The and collecting for the motionless difficulty son.
          </h2>
          <p data-aos="fade-up">
            Conveying or northward offending admitting perfectly my. Colonel
            gravity get thought fat smiling add but difficult situations.
          </p>

          <Table
            highlightOnHover
            verticalSpacing="sm"
            striped
            withTableBorder
            stripedColor="rgb(0 0 0 / 5%)"
            highlightOnHoverColor="#e80e0f1f"
            data-aos="fade-up"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Budget</Table.Th>
                <Table.Th>Size</Table.Th>
                <Table.Th>Type</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Confidential</Table.Td>
                <Table.Td>
                  1200 m<sup>2</sup>
                </Table.Td>
                <Table.Td>Office</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Th>Status</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Flat</Table.Th>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Done</Table.Td>
                <Table.Td>Lagos, Nigeria</Table.Td>
                <Table.Td>8 Room</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>

          <Link href="/contact" className="mx-auto">
            <Button color="#E80E0F" size="lg" data-aos="fade-up">
              YES! I WANT BOOK “OFFICE PACKAGE”
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
