"use client";

import { AspectRatio, Box, CloseButton, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Link from "next/link";

const GetApp = () => {
  const t = useTranslations("GetApp");

  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
  {isVisible &&  <Flex
      display={{ base: "flex", lg: "none" }}
      p={"16px 8px 20px"}
      flexDir={"column"}
      gap={"20px"}
      position={"relative"}
    >
        <CloseButton onClick={() => setIsVisible(false)} pos={"absolute"}  top={"4px"} right={"4px"} />
      <Flex flexDir={"row"} gap={"10px"}>
        <AspectRatio
          w={"60px"}
          h={"60px"}
          pos={"relative"}
          ratio={1}
          flexShrink={0}
        >
          <Image src={"/logo.png"} alt={"logo"} fill sizes="100%" priority />
        </AspectRatio>

        <Flex flexDir={"column"} fontFamily={"roboto"} gap={'8px'}>
          <Heading fontWeight={"700"} fontSize={"16px"} color={"fontgray"}>
            {t("title")}
          </Heading>
          <Text fontWeight={"300"} fontSize={"14px"} color={"fontgray"}>
            {t("description")}
          </Text>
        </Flex>
      </Flex>
      <Box pos={'relative'}>
      <CustomButton fontWeight={"700"} text={t("download")} borderRadius={'8px'} h={'40px'} bg={'linear-gradient(304deg, rgba(255, 131, 65, 1) 0%, rgba(255, 213, 65, 1) 100%)'} />
    <Link href={"https://play.google.com/store/apps/details?id=com.tatadev.yummi_sushi"} target={'_blank'} style={{position:'absolute',top:'0px',right:'0px',width:'100%',height:'100%'}} />
      </Box>
    </Flex>}
    </>

  );
};

export default GetApp;
