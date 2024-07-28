'use client'
import { AspectRatio, Box, Container, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import Logo from "../ui/Logo";
import Search from "../Search/Search";
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import CallBox from "../ui/CallBox";
import MenuDrawer from "../Drawer/MenuDrawer";
import LoginModal from "../Modals/Login";
import CartDrawer from "../Drawer/CartDrawer";
import Bonus from "../ui/Bonus";

const Header = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Container boxShadow={" 0px 0px 7px 0px #73737333"} maxW={"unset"}>
      <Flex
        maxW={{ base: "container.xl", xl: "1296px" }}
        mx={"auto"}
        py={"20px"}
        gap={{ base: "0px", lg: "40px" }}
        flexDir={"row"}
        alignItems={"center"}
        justifyContent={{ base: "space-between", lg: "flex-start" }}
      >
        <Logo />
        <Flex
          flexDir={"row"}
          flexGrow={1}
          alignItems={"center"}
          justifyContent={"space-between"}
          display={{ base: "none", lg: "flex" }}
        >
          <Search />
          <CallBox />
          <Flex flexDir={"row"} gap={"30px"}>
            <LocaleSwitcher />
            <Flex flexDir={"row"} gap={"16px"}>
              <Bonus />
              <LoginModal textBlack={true} closeMenu={onClose}/>
              <CartDrawer textBlack={true}  />
            </Flex>
          </Flex>
        </Flex>

        <Box display={{ base: "block", lg: "none" }}>
          <Search />
        </Box>

        <MenuDrawer onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Container>
  );
};

export default Header;
