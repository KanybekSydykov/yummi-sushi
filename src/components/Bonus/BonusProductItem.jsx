import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import AddBonusToCart from "./AddBonusToCart";

const BonusProductItem = ({ item,bonusId }) => {
  return (
    <Flex
      flexDir={"column"}
      width={"200px"}
      bg={"#8098ef"}
      borderRadius={"15px"}
      p={"16px"}
      alignItems={"center"}
      gap={"10px"}
    >
      <AspectRatio
        width={{ base: "75px", lg: "100px" }}
        ratio={1}
        pos={"relative"}
      >
        <Image src={item.product_photo} alt={item.product_name} fill sizes="100%" />
      </AspectRatio>
      <Text
        fontFamily={"roboto"}
        fontWeight={"400"}
        fontSize={"16px"}
        color={"#fff"}
        textAlign={"center"}
        h={'48px'}
        noOfLines={2}
      >
        {item.product_name} {item.size}
      </Text>

      <AddBonusToCart item={item} bonusId={bonusId} />
    </Flex>
  );
};

export default BonusProductItem;
