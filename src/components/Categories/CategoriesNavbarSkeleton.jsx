import { Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CategoriesNavbarSkeleton = () => {
  return (
    <Flex
      flexDir={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      gap={"20px"}
      flexWrap={"nowrap"}
      overflowX={"auto"}
      maxW={{ base: "container.xl", xl: "1296px" }}
      mx={"auto"}
    >
      <SkeletonText noOfLines={1} fontSize={"18px"} width={"88px"} />
      <SkeletonText noOfLines={1} fontSize={"18px"} width={"88px"} />
      <SkeletonText noOfLines={1} fontSize={"18px"} width={"88px"} />
      <SkeletonText noOfLines={1} fontSize={"18px"} width={"88px"} />
      <SkeletonText noOfLines={1} fontSize={"18px"} width={"88px"} />
    </Flex>
  );
};

export default CategoriesNavbarSkeleton;
