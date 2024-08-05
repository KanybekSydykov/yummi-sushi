import { Flex, Skeleton } from "@chakra-ui/react";
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
      <Skeleton width={"200px"} height={"120px"} borderRadius={"10px"} />
      <Skeleton width={"200px"} height={"120px"} borderRadius={"10px"} />
      <Skeleton width={"200px"} height={"120px"} borderRadius={"10px"} />
      <Skeleton width={"200px"} height={"120px"} borderRadius={"10px"} />
      <Skeleton width={"200px"} height={"120px"} borderRadius={"10px"} />
    </Flex>
  );
};

export default CategoriesNavbarSkeleton;
