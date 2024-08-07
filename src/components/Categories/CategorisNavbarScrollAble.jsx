"use client";

import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CategoryNavItem from "./CategoryNavItem";
import useIntersectionObserver from "@/lib/Oserver";
import { Link } from "@/lib/navigation";
import { useParams } from "next/navigation";

const CategorisNavbarScrollAble = ({
  categories,
  onMainPage = false,
  homeLink,
  locale,
}) => {
  const params = useParams();
  const activeCategory = params.category;

  return (
    <Flex
      h={{ base: "auto", lg: "54px" }}
      _hover={{ height: { base: "auto", lg: "90px" } }}
      flexDir={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      overflowX={"auto"}
      whiteSpace={"nowrap"}
      transition={"all 0.3s ease"}
      role="group"
      w={"100%"}
      maxW={"100dvw"}
      bg={"#fff"}
      gap={"20px"}
      pt={{ base: "4px", lg: "0px" }}
      ps={{ base: "1px", lg: "24px" }}
      pe={{ base: "8px", lg: "44px" }}
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {!onMainPage && (
        <Box
          position={"relative"}
          borderBottom={"2px solid transparent"}
          _hover={{
            borderColor: "#ff8341",
            height: "72px",
          }}
          h={'38px'}
        >
          <CategoryNavItem data={homeLink} isMain={true} />
          <Link
            href="/"
            scroll={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      )}
      {categories.map((category) => (
        <Box
          data-to-scrollspy-id={category.slug}
          key={category.id}
          position={"relative"}
          borderBottom={`2px solid ${
            activeCategory === category.slug ? "#ff8341" : "transparent"
          } `}
          transition={"all 0.3s ease"}
          _hover={{
            borderColor: "#ff8341",
          }}
          fontWeight={activeCategory === category.slug ? "500" : "400"}
          color={activeCategory === category.slug ? "main" : "rgba(0,0,0,0.75)"}
          fontSize={{
            base: "14px",
            lg: activeCategory === category.slug ? "17px" : "16px",
          }}
        >
          <CategoryNavItem
            data={category}
            onMainPage={onMainPage}
            firstSection={categories[0].slug}
          />
          <Link
            href={
              onMainPage ? `#${category.slug}` : `/category/${category.slug}`
            }
            scroll={onMainPage ? true : false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default CategorisNavbarScrollAble;
