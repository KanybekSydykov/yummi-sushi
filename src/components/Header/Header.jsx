import { AspectRatio, Box, Container, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Logo from "../ui/Logo";
import Search from "../Search/Search";
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import CallBox from "../ui/CallBox";
import MenuDrawer from "../Drawer/MenuDrawer";
import ProfileBtn from "../ui/ProfileBtn";
import CartBtn from "../ui/CartBtn";
import LoginModal from "../Modals/Login";
import CartDrawer from "../Drawer/CartDrawer";

const Header = () => {
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
              <LoginModal textBlack={true}/>
              <CartDrawer textBlack={true}  />
            </Flex>
          </Flex>
        </Flex>

        <Box display={{ base: "block", lg: "none" }}>
          <Search />
        </Box>

        <MenuDrawer />
      </Flex>
    </Container>
  );
};

export default Header;
