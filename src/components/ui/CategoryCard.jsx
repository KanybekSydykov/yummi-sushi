"use client";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CategoryCard = ({ item }) => {
  useEffect(() => {
  }, [item]);

  const categoryTextStyles = {
    fontFamily: "roboto",
    fontWeight: "600",
    fontSize: "20px",
    textAlign: "center",
    color: "fontgray",
    _groupHover: {
      color: "main",
    },
  };
  return (
    <Flex
      role="group"
      _hover={{
      boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.1)",
        transform: "scale3d(1.02, 1.02, 1.01)",
      }}
      boxShadow={ "0px 0px 5px rgba(0, 0, 0, 0.1)"}
      flexDir={"column"}
      borderRadius={"20px"}
      transition={"all 0.3s ease"}
      alignItems={"center"}
      position={"relative"}
      w={{ base: "174px", lg: "243px" }}
      maxW={{
        base: "calc(50% - 5px)",
        lg: "calc(25% - 15px)",
        xl: "calc(20% - 16px)",
      }}
      p={'8px'}
      pb={'16px'}
    >
      <AspectRatio
        ratio={1}
        width={"100%"}
        height={"100%"}
        borderRadius={{ base: "20px", lg: "30px" }}
        overflow={"hidden"}
        transition={"all 0.3s ease"}
      >
        <Image src={item?.image ? item?.image : "/category-ph.png"} fill sizes="100%" />
        {/* <Image src={'/category-img.png'} fill/> */}
      </AspectRatio>
      <Text {...categoryTextStyles}>{item?.name}</Text>
      <Link
        href={`/category/${item?.slug}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Flex>
  );
};

export default CategoryCard;
