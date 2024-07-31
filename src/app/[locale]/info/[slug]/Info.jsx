import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Info = ({ data }) => {
  return (
    <Flex
      fontFamily={"roboto"}
      flexDir={"column"}
      gap={"50px"}
      py={{ lg: "30px" }}
    >
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        px={"16px"}
        gap={"40px"}
      >
        <Flex flexDir={"column"} gap={"26px"} maxW={"640px"}>
          <Text
            fontWeight={"700"}
            fontSize={{ base: "20px", lg: "36px" }}
            lineHeight={{ base: "23px", lg: "50px" }}
            textTransform={"uppercase"}
          >
            {data.title}
          </Text>
          <Text
            fontWeight={"400"}
            fontSize={"16px"}
            lineHeight={"24px"}
            color={"rgba(118, 118, 118, 1)"}
            whiteSpace={'pre-wrap'}
          >
            {data.description}
          </Text>
        </Flex>

        <Box
          w={{ base: "100%", lg: "100%" }}
          maxW={{ base: "390px", lg: "420px" }}
          height={{ base: "100%", lg: "auto" }}
          maxH={{ base: "418px", lg: "410px" }}
          position={"relative"}
        >
          <Image
            src={data.image || "/about-img.jpeg"}
            fill
            alt={"about"}
            sizes="100%"
            priority
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Info;
