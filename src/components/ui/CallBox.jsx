import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const CallBox = ({ inMenu = false }) => {
  const t = useTranslations("HomePage");

  return (
    <Flex
      display={{ base: inMenu ? "flex" : "none", lg: "flex" }}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"16px"}
      pos={"relative"}
      fontFamily={"roboto"}
      h={"max-content"}
      flexShrink={0}
    >
      <Text
        fontWeight={"300"}
        fontSize={"14px"}
        textAlign={"center"}
        color={inMenu ? "#fff" : "fontgray"}
      >
        {t("callToAction")}
      </Text>
      <Flex flexDir="row" gap={"10px"} alignItems={"center"}>
        <AspectRatio ratio={1} w={"36px"} h={"36px"}>
          <Image src={"/phone_icon.svg"} alt="phone" fill priority />
        </AspectRatio>
        <Text
          fontWeight={"700"}
          fontSize={inMenu ? "24px" : "28px"}
          color={inMenu ? "#fff" : "fontgray"}
        >
          +996 508 842 444
        </Text>
        <Link
          href={"tel:996508842444"}
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default CallBox;
