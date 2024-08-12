import { useCart } from "@/lib/context-api";
import { AspectRatio, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const CartBtn = ({ fn, textBlack = false, fixed = false }) => {
  const { getTotalQuantity } = useCart();

  return (
    <Flex
      onClick={fn}
      flexDir={"column"}
      gap={"7px"}
      justifyContent={fixed ? "center" : "flex-start"}
      alignItems={"center"}
      w={"50px"}
      h={"50px"}
      position={fixed ? "fixed" : "relative"}
      bottom={fixed ? "90px" : "unset"}
      right={fixed ? "16px" : "unset"}
      zIndex={fixed ? "100" : "unset"}
      borderRadius={fixed ? "50%" : "5px"}
      boxShadow={fixed ? "0px 0px 4px 4px #73737333" : "none"}
      bg={fixed ? "linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)" : "transparent"}
      cursor={"pointer"}
      transition={"all 0.3s ease"}
      _hover={{
        transform: "scale3d(1.05, 1.05, 1.05)",
        boxShadow:'0px 0px 7px 0px rgba(255, 213, 65, 1)',
        bg: "linear-gradient(152deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)",
      }}
    >
      <AspectRatio ratio={1} width={"24px"} h={"24px"} position={"relative"} filter={fixed ? "invert(0%) sepia(100%) saturate(0%) hue-rotate(90deg) brightness(200%) contrast(100%)" : 'none'}>
        <Image src={"/cart-icon.svg"} alt="profile" fill sizes="100%" />
      </AspectRatio>
      {fixed ? null : (
        <Text
          fontFamily={"roboto"}
          fontWeight={"300"}
          fontSize={"12px"}
          textAlign={"center"}
          color={textBlack ? "fontgray" : "#fff"}
        >
          Корзина
        </Text>
      )}

    {getTotalQuantity() > 0 &&  <Flex
        bg={"rgba(54, 54, 54, 1)"}
        color={"#fff"}
        fontSize={"12px"}
        position={"absolute"}
        top={"-5px"}
        right={"-5px"}
        borderRadius={"7px"}
        width={"19px"}
        h={"19px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {getTotalQuantity()}
      </Flex>}
    </Flex>
  );
};

export default CartBtn;
