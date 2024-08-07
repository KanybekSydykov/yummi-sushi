"use client";

import { useRouter } from "@/lib/navigation";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const CategoryNavItem = ({
  data,
  isMain = false,
  onMainPage = false,
  firstSection,
  onClickLink
}) => {
  const router = useRouter();
  const params = useParams();



  const handleLinkClick = () => {
    if(onMainPage && !isMain){
      return;
    } else if(isMain){
      router.push(`/`);
    } else {
      router.push(`/category/${data.slug}`);
    }
  };
  

  return (
    <Flex
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      pos={"relative"}
      width={"auto"}
      cursor={"pointer"}
      // fontWeight={activeCategory === data.slug ? "500" : "400"}
      // color={activeCategory === data.slug ? "main" : "rgba(0,0,0,0.5)"}
      // fontSize={{base:'14px',lg:activeCategory === data.slug ? "17px" : "16px"}}
      _hover={{
        transform: "translateY(-5px)",
        color: "main",
        borderColor: "#ff8341",
      }}
      _groupHover={{
        gap: "16px",
      }}
      // transform={
      //   activeCategory === data.slug ? "translateY(-2px)" : "translateY(0px)"
      // }
      transition={"all 0.1s ease"}
      p={"6px 12px"}
      flexShrink={0}
      bg={"#fff"}
      h="100%"


    >
      <AspectRatio
      display={{base:'none',lg:'block'}}
        ratio={1}
        height={"auto"}
        maxH={"0px"}
        maxW={"0px"}
        opacity={"0"}
        _groupHover={{
          maxHeight:{base:'0',lg: "unset"},
          maxWidth: {base:'0',lg:"unset"},
          opacity: "1",
        }}
        transition={"all 0.1s linear"}
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

      {/* <a
        href={isMain ? "/" : `${onMainPage ? "#" : "/category/"}${data.slug}`}
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
      /> */}
    </Flex>
  );
};

export default CategoryNavItem;
