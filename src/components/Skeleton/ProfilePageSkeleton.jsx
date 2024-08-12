import {
  Container,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const ProfilePageSkeleton = () => {
  return (
    <Container
      maxW={{ base: "container.xl", xl: "1296px" }}
      p={{ base: "20px", xl: "0px" }}
      pt={{ xl: "50px" }}
      minH={"100dvh"}
      h={"auto"}
    >
      <Flex
        flexDir={"row"}
        gap={"50px"}
        mt={"50px"}
        position={"relative"}
        minH={{ base: "100dvh", lg: "auto" }}
      >
        <Flex flexDir={"column"}>
          <Flex
            flexDir={"row"}
            gap={"10px"}
            alignItems={"center"}
            p={"14px 20px"}
          >
            <SkeletonCircle size="20px" />
            <SkeletonText noOfLines={1} />
          </Flex>
          <Flex
            flexDir={"row"}
            gap={"10px"}
            alignItems={"center"}
            p={"14px 20px"}
          >
            <SkeletonCircle size="20px" />
            <SkeletonText noOfLines={1} />
          </Flex>
          <Flex
            flexDir={"row"}
            gap={"10px"}
            alignItems={"center"}
            p={"14px 20px"}
          >
            <SkeletonCircle size="20px" />
            <SkeletonText noOfLines={1} />
          </Flex>
          <Flex
            flexDir={"row"}
            gap={"10px"}
            alignItems={"center"}
            p={"14px 20px"}
          >
            <SkeletonCircle size="20px" />
            <SkeletonText noOfLines={1} />
          </Flex>
        </Flex>

        <Skeleton
          borderRadius={"10px"}
          p={"30px"}
          w={{ base: "100%", lg: "400px" }}
          h={{ base: "100%", lg: "400px" }}
        />
      </Flex>
    </Container>
  );
};

export default ProfilePageSkeleton;
