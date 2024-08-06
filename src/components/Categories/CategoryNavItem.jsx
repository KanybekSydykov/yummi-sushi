"use client";

import useIntersectionObserver from "@/lib/Oserver";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const CategoryNavItem = ({
  data,
  isMain = false,
  onMainPage = false,
  firstSection,
  activeCategory,
  onClickLink
}) => {

  const handleLinkClick = (e) => {
    e.preventDefault();
    const section = document.getElementById(data.slug);
    if (section) {
      section.scrollIntoView({
        behavior: "instant", // Use smooth behavior for better UX
        block: "start",
      });
    }
    onClickLink(data.slug);
  };
  

  return (
    <Flex
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      pos={"relative"}
      width={"auto"}
      cursor={"pointer"}
      fontWeight={activeCategory === data.slug ? "500" : "400"}
      color={activeCategory === data.slug ? "main" : "rgba(0,0,0,0.5)"}
      fontSize={activeCategory === data.slug ? "17px" : "16px"}
      _hover={{
        transform: "translateY(-5px)",
        color: "main",
        borderColor: "#ff8341",
      }}
      _groupHover={{
        gap: "16px",
      }}
      transform={
        activeCategory === data.slug ? "translateY(-2px)" : "translateY(0px)"
      }
      transition={"all 0.1s ease"}
      p={"6px 12px"}
      flexShrink={0}
      bg={"#fff"}
      h="100%"
      borderBottom={
        activeCategory === data.slug
          ? "2px solid #ff8341"
          : "2px solid transparent"
      }
    >
      <AspectRatio
      display={{base:'none',lg:'block'}}
        ratio={1}
        height={"auto"}
        maxH={"0px"}
        maxW={"0px"}
        opacity={"0"}
        _groupHover={{
          maxHeight: "unset",
          maxWidth: "unset",
          opacity: "1",
        }}
        transition={"all 0.3s linear"}
        width={{ base: isMain ? "20px" : "40px", lg: isMain ? "24px" : "60px" }}
      >
        <Image
          src={data?.image}
          fill
          sizes="100%"
          alt={data.name}
          style={{ objectFit: "contain" }}
        />
      </AspectRatio>

      <Text fontFamily={"roboto"} transition={"all 0.1s linear"}>
        {data.name}
      </Text>

      <a
        href={isMain ? "/" : `${onMainPage ? "#" : "/category/"}${data.slug}`}
        onClick={handleLinkClick}
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
