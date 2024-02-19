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
            src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="service-pic-1"
          />
        </div>

        <div className={classes.service_table}>
          <h2 data-aos="fade-up">
            Book an Inspection Today and Find Your Dream Property
          </h2>
          <p data-aos="fade-up">
            If you are interested in any of our properties, you can book an
            inspection online and visit them in person. You can also contact us
            by phone or email and we will arrange a convenient time for you. Our
            agents will guide you through the features and benefits of each
            property and answer any questions you may have. Don’t miss this
            opportunity to find your dream property in Lagos. Book an inspection
            today and get ready to move in.
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
            <button className={classes.btn_primary} data-aos="fade-up">
              YES! I WANT BOOK “OFFICE PACKAGE”
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
