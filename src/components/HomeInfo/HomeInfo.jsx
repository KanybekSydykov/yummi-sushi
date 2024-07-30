'use client';
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import InfoCard from "../ui/InfoCard";
import {motion} from "framer-motion"

const HomeInfo = ({ info }) => {
  const titleStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "22px", lg: "36px" },
    textAlign: "center",
    color: "main",
    mb: "20px",
  };

  return (
    <Flex as={motion.div}
      flexDir={"column"}
      mt={{ base: "100px", lg: "120px" }}
      mb={{ base: "158px", lg: "143px" }}
      initial={{opacity:0,y:30}}
      transition={{duration:1.8,ease:"linear"}}
      whileInView={{opacity:1,y:0}}
      viewport={{ once: true, amount: { base: 0.8, lg: 0.3 } }}
    >
      <Flex
        flexDir={"column"}
        bg={"#F9FAFB"}
        py={"40px"}
        px={{ base: "16px", lg: "0px" }}
        borderRadius={"30px"}
      >
        <Text {...titleStyles}>Типы заказов</Text>
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
          px={{base:'0px',lg:'16px'}}

        >
          {info?.order.map((item) => (
            <InfoCard key={item.title} item={item} type={"order-info"} />
          ))}
        </Flex>
      </Flex>
      <Flex flexDir={"column"} py={"40px"} borderRadius={"30px"}>
        <Text {...titleStyles}>Условия доставки</Text>
        <Flex
          flexDir={{base:"column",lg:"row"}}
          mt={{ base: "30px", lg: "50px" }}
          columnGap={{ base: "60px", lg: "20px" }}
          rowGap={{ base: "60px", lg: "60px" }}
          flexWrap={"wrap"}
          w={"100%"}
          justifyContent={"center"}
          maxW={{ base: "container.xl", xl: "1296px" }}
          mx={"auto"}
          px={'16px'}
        >
          {info?.delivery.map((item) => (
            <InfoCard key={item.title} item={item} type={"delivery-info"} />
          ))}
        </Flex>
      </Flex>
      <Flex flexDir={"column"} py={"40px"} borderRadius={"30px"}>
        <Text {...titleStyles}>Способы оплаты</Text>
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
          px={'16px'}

        >
          {info?.payment.map((item) => (
            <InfoCard key={item.title} item={item} type={"payment-info"} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomeInfo;
