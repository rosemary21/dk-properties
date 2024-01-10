"use client";
import { useState } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Logo from "@/public/logo.png";
import classes from "./Navbar.module.scss";
import Image from "next/image";
import navLinks from "@/data/navbar/NavbarData";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Drawer } from "@mantine/core";
import { getUserName } from "@/utils/Links";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);

  const userName = getUserName();

  const items = navLinks.map(({ link, label }) => (
    <Link
      key={label}
      href={link}
      className={classes.link}
      data-active={active === link || undefined}
      onClick={() => setActive(link)}
    >
      {label}
    </Link>
  ));

  return (
    <div>
      <header className={`${classes.header} shadow-md`}>
        <Container size="md" className={classes.inner}>
          <Link href="/">
            <Image
              src={Logo}
              alt="logo"
              width={55}
              height={60}
              priority
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Link>

          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>

          <Link href={userName ? `/profile/${userName}` : "/login"}>
            <FaRegUser
              size={18}
              className={
                pathname === "/login"
                  ? "text-primary cursor-pointer hover:text-primary transition-all sm:flex hidden"
                  : "text-black cursor-pointer hover:text-primary transition-all sm:flex hidden"
              }
              onClick={() => {
                setActive("");
              }}
            />
          </Link>

          <Burger opened={opened} onClick={open} hiddenFrom="xs" size="sm" />
        </Container>

        <Drawer
          opened={opened}
          onClose={close}
          position="top"
          title={<span className="font-bold">Menu</span>}
          size="sm"
        >
          {items}
        </Drawer>
      </header>
    </div>
  );
}
