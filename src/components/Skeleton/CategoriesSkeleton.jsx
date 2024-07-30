import { Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

const CategoriesSkeleton = () => {
  return (
    <Flex
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={{ base: "center", lg: "flex-start" }}
      flexWrap={"wrap"}
      columnGap={{ base: "10px", lg: "20px" }}
      rowGap={{ base: "30px", lg: "20px" }}
      mt={"30px"}
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Skeleton
          borderRadius={"20px"}
          w={{ base: "174px", lg: "243px" }}
          h={"281px"}
          startColor="#FF8341"
          endColor="#6d6d6d"
          key={i}
        ></Skeleton>
      ))}
    </Flex>
  );
};

export default CategoriesSkeleton;
