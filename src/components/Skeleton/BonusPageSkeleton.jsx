import { Box, Container, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Suspense } from "react";

const BonusPageSkeleton = () => {
  return (
        <Container
          maxW={{ base: "container.xl", xl: "1296px" }}
          p={{ base: "20px", xl: "50px 0px" }}
        >
          <Flex flexDir={"row"} gap={{base:'20px',lg:"64px"}} mt={"40px"}>
            <Skeleton
              width={{ base: "100%", lg: "calc(50% - 32px)" }}
              aspectRatio={{ base: 358 / 328, lg: 648 / 480 }}
              borderRadius={"30px"}
            />
    
            <Skeleton
              p={{ base: "30px", lg: "60px" }}
              width={{ base: "100%", lg: "calc(50% - 32px)" }}
              borderRadius={"30px"}
              aspectRatio={{ base: 358 / 328, lg: 648 / 480 }}
            />
          </Flex>
            
        </Container>
  )
}

export default BonusPageSkeleton