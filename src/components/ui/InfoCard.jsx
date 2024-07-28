import { AspectRatio, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const headingStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "16px", lg: "22px" },
  textAlign: "center",
  color: "fontgray",
};

const textStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: "16px",
  textAlign: "center",
  color: "fontgray",
};

const InfoCard = ({ type, item }) => {
  if (type === "order-info") return <OrderInfo item={item} />;

  if (type === "delivery-info") return <DeliveryInfo item={item} />;

  if (type === "payment-info") return <PaymentInfo item={item} />;
};

export default InfoCard;

const OrderInfo = ({ item }) => {
  return (
    <Flex
      flexDir={"column"}
      padding={"30px"}
      bg={"#FFF"}
      position={"relative"}
      borderRadius={"30px"}
      transition={"all 0.3s ease"}
      maxW={{ base: "100%", lg: "calc(50% - 16px)" }}
      _hover={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        transform: "scale3d(1.02, 1.02, 1.01)",
      }}
    >
      <AspectRatio
        w={{ base: "80px", lg: "100px" }}
        ratio={1}
        h={{ base: "80px", lg: "100px" }}
        position={"relative"}
        mx={"auto"}
        borderRadius={"50%"}
        overflow={"hidden"}
        flexShrink={0}
        pos={"absolute"}
        zIndex={1}
        top={{ base: "-40px", lg: "-50px" }}
        left={{ base: "calc(50% - 40px)", lg: "calc(50% - 50px)" }}
      >
        <Image src={item.image} fill alt="infomation image" />
      </AspectRatio>

      <Flex flexDir={"column"} gap={"28px"}>
        <Heading mt={"40px"} {...headingStyles}>
          {item.title}
        </Heading>

        <Text {...textStyles}>{item.description}</Text>
      </Flex>
    </Flex>
  );
};

const DeliveryInfo = ({ item }) => {
  return (
    <Flex
      flexDir={"row"}
      padding={"30px"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      gap={"20px"}
      bg={"#F9FAFB"}
      position={"relative"}
      borderRadius={"30px"}
      h={{ base: "auto", lg: "162px" }}
      overflowY={"auto"}
      transition={"all 0.3s ease"}
      _hover={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        transform: "scale3d(1.02, 1.02, 1.01)",
      }}
    >
      <AspectRatio
        w={{ base: "80px", lg: "100px" }}
        ratio={1}
        h={{ base: "80px", lg: "100px" }}
        position={"relative"}
        mx={"auto"}
        borderRadius={"50%"}
        overflow={"hidden"}
        flexShrink={0}
      >
        <Image src={item.image} fill alt="infomation image" />
      </AspectRatio>

      <Flex flexDir={"column"} gap={"28px"}>
        <Heading {...headingStyles}>{item.title}</Heading>

        <Text {...textStyles}>{item.description}</Text>
      </Flex>
    </Flex>
  );
};
const PaymentInfo = ({ item }) => {
  return (
    <Flex
      flexDir={"column"}
      padding={"30px"}
      alignItems={"center"}
      justifyContent={"flex-start"}
      gap={"20px"}
      bg={"#F9FAFB"}
      position={"relative"}
      borderRadius={"30px"}
      h={{ base: "auto", lg: "263px" }}
      overflowY={"auto"}
      transition={"all 0.3s ease"}
      _hover={{
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        transform: "scale3d(1.02, 1.02, 1.01)",
      }}
      role="group"
    >
      <AspectRatio
        w={{ base: "80px", lg: "80px" }}
        ratio={1}
        h={{ base: "80px", lg: "80px" }}
        position={"relative"}
        mx={"auto"}
        borderRadius={"50%"}
        overflow={"hidden"}
        flexShrink={0}
        transition={"all 0.3s ease"}
        _groupHover={{
          transform: "scale(1.1)",
        }}
      >
        <Image src={item.image} fill alt="infomation image" />
      </AspectRatio>

      <Flex flexDir={"column"} gap={"28px"}>
        <Heading {...headingStyles}>{item.title}</Heading>

        <Text {...textStyles}>{item.description}</Text>
      </Flex>
    </Flex>
  );
};
