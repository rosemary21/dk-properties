"use client";
import {
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
} from "@mantine/core";
import classes from "./Error.module.scss";
import image from "@/public/error.svg";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image
          src={image.src}
          className={classes.mobileImage}
          alt="error_image"
        />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" className={classes.message}>
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            color="#E80E0F"
            onClick={() => router.push("/")}
          >
            Get back to home page
          </Button>
        </div>
        <Image
          src={image.src}
          className={classes.desktopImage}
          alt="error_image"
        />
      </SimpleGrid>
    </Container>
  );
}
