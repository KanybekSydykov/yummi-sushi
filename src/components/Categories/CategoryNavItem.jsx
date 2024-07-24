"use client";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CategoryNavItem = ({ data }) => {
  const { category } = useParams();

  return (
    <Flex
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      pos={"relative"}
      width={"200px"}
      gap={"16px"}
      cursor={"pointer"}
      borderRadius={"10px"}
      _hover={{
        bg: "rgba(0,0,0,0.05)",
        transform: "scale3d(1.02, 1.02, 1.01)",
      }}
      transition={"all 0.3s ease-in"}
      role="group"
    >
      <AspectRatio
        ratio={1}
        width={{ base: "40px", lg: "60px" }}
      >
        <Image src={data?.image} fill sizes="100%" alt={data.name} />
      </AspectRatio>

      <Text
        fontFamily={"roboto"}
        fontWeight={"600"}
        fontSize={"18px"}
        transition={"all 0.3s ease"}
        color={category === data.slug ? "main" : "#000"}
        _groupHover={{
          color: "main",
        }}
      >
        {data.name}
      </Text>

      <Link
        href={`/category/${data.slug}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      />
    </Flex>
  );
};

export default CategoryNavItem;
