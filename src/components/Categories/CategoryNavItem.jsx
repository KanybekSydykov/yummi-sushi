"use client";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CategoryNavItem = ({ data ,isMain = false,onMainPage=false}) => {
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
        transform: "scale3d(1.02, 1.02, 1.01)",
        boxShadow:'0px 0px 3px 3px rgba(0,0,0,0.3)'
      }}
      transition={"all 0.5s ease"}
      role="group"
      boxShadow={'0px 0px 5px 0px rgba(0,0,0,0.3)'}
      p={'2px'}
      flexShrink={0}
      bg={'#fff'}
    >
      <AspectRatio
        ratio={1}
        width={{ base: "40px", lg: "60px" }}
      >
        <Image src={data?.image} fill sizes="100%" alt={data.name} style={{ objectFit: "contain" }} />
      </AspectRatio>

      <Text
        fontFamily={"roboto"}
        fontWeight={"400"}
        fontSize={"16px"}
        transition={"all 0.3s ease"}
        color={category === data.slug ? "main" : "#000"}
        _groupHover={{
          color: "main",
        }}
      >
        {data.name}
      </Text>

      <Link
        href={isMain ? "/" : `${onMainPage ? '#':'/category/'}${data.slug}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          scrollBehavior: "smooth",
        }}
      />
    </Flex>
  );
};

export default CategoryNavItem;
