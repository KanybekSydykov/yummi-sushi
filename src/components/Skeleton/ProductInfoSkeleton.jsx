import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const ProductInfoSkeleton = () => {
  return (
    <Flex
    flexDir={{ base: "column", lg: "row" }}
    gap={{ base: "20px", lg: "40px" }}
    p={"40px 50px"}
  >
    <Skeleton
      ratio={1}
      width={{ base: "100%", lg: "450px" }}
      height={{ base: "100%", lg: "450px" }}
      minH={{ base: "100vw", lg: "450px" }}
      minW={{ base: "150px", lg: "450px" }}
      flexShrink={0}
      borderRadius="25px"
      position={{
        base: "relative",
        lg: "sticky",
      }}
      top={{
        base: "unset",
        lg: 0,
      }}
    />

    <Flex
      flexDir={"column"}
      flexGrow={1}
      maxW={"550px"}
      gap={"16px"}
      pb={"25px"}
    >
     <SkeletonText noOfLines={1} />
      <Flex
        bg={"rgb(243, 243, 247)"}
        flexDir={"row"}
        borderRadius={"30px"}
        p={"2px 2.5px"}
        w={"fit-content"}
      >
        {[0,1].map((size) => (
          <Skeleton
            key={size.size}
            borderRadius={"30px"}
            w={"120px"}
          />
        ))}
      </Flex>

      <Flex
        flexDir={"row"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={"8px"}
      >
        <SkeletonText noOfLines={1} width={'75px'} />
      </Flex>

      <SkeletonText noOfLines={5} width={"100%"} />
      <Flex
        position={{ base: "sticky", lg: "relative" }}
        left={{ base: "0", lg: "unset" }}
        bottom={{ base: "0", lg: "unset" }}
        padding={{ base: "0px", lg: "0px" }}
        bg={{ base: "rgba(255,255,255,0.25)", lg: "transparent" }}
      >
        <Skeleton width={'350px'} borderRadius={'30px'}/>
      </Flex>
    </Flex>
  </Flex>
  )
}

export default ProductInfoSkeleton