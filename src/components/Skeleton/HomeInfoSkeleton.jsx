import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react'
import React from 'react'

const HomeInfoSkeleton = () => {
  return (
    <Flex
    flexDir={"column"}
    bg={"#F9FAFB"}
    py={"40px"}
    px={{ base: "16px", lg: "0px" }}
    borderRadius={"30px"}
  >
    <SkeletonText noOfLines={1} fontSize={{ base: "22px", lg: "36px" }} />
    <Flex
      flexDir={"row"}
      mt={{ base: "30px", lg: "50px" }}
      columnGap={{ base: "60px", lg: "20px" }}
      rowGap={{ base: "60px", lg: "60px" }}
      flexWrap={"wrap"}
      w={"100%"}
      justifyContent={"center"}
      maxW={{ base: "container.xl", xl: "1296px" }}
      mx={"auto"}
      px={{ base: "0px", lg: "16px" }}
    >
      <Skeleton 
      maxW={{ base: "100%", lg: "calc(50% - 16px)" }}
      flexGrow={1}
      height={'250px'}
      />
      <Skeleton 
      maxW={{ base: "100%", lg: "calc(50% - 16px)" }}
      flexGrow={1}
      height={'250px'}
      />

    </Flex>
  </Flex>
  )
}

export default HomeInfoSkeleton