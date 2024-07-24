"use client";
import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import CallBox from "../ui/CallBox";
import Link from "next/link";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import ProfileBtn from "../ui/ProfileBtn";
import CartBtn from "../ui/CartBtn";
import Image from "next/image";
import LoginModal from "../Modals/Login";
import CartDrawer from "./CartDrawer";

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const linkStyles = {
    fontWeight: "400",
    fontSize: "16px",
    color: "#fff",
    textTranform: "uppercase",
  };

  return (
    <Box display={{ base: "block", lg: "none" }} h={'36px'}>
      <Grid width={'36px'} height={'36px'} flexShrink={0} gap={'4px'} onClick={onOpen} gridTemplateColumns={"repeat(3, 1fr)"}>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
       <GridItem pos={'relative'}>
        <Image src={'/sushi-menu2.png'} fill alt={'menu'} />
       </GridItem>
      </Grid>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color={"white"} size={"lg"} />

          <DrawerBody bg={"black"}>
            <Flex flexDir={"column"} justifyContent={'space-evenly'} alignItems={'center'} height={'100%'}>
              <CallBox inMenu={true} />

              <Flex
                flexDir={"column"}
                gap={"50px"}
                alignItems={"center"}
                justifyContent={"center"}
                fontFamily={"roboto"}
              >
                <Link href={"/"} style={linkStyles}>
                  Главная
                </Link>
                <Link href={"/info/delivery"} style={linkStyles}>
                  Доставка
                </Link>
              </Flex>

              <LocaleSwitcher inMenu={true} />

              <Flex flexDir={'row'} gap={'16px'} alignItems={'flex-start'} justifyContent={'center'} >
                <LoginModal />

                <CartDrawer />
                
              </Flex>


            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuDrawer;
