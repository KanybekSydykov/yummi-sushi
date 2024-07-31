import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ProfileBtn = ({ fn ,textBlack = false,isAuthenticated}) => {

  const t = useTranslations("Common");

  return (
    <Flex
      onClick={() => fn()}
      flexDir={"column"}
      gap={"7px"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      w={'50px'}
      h={'50px'}
      position={'relative'}
      cursor={'pointer'}
      transition={"all 0.3s ease"}
      borderRadius={'5px'}
      _hover={{
        transform: "scale3d(1.05, 1.05, 1.05)",
        bg: "linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), #FF8341",

      }}
    >
      <AspectRatio ratio={1} width={"24px"} h={"24px"} position={"relative"}>
        <Image src={"/profile-icon.svg"} alt="profile" fill />
      </AspectRatio>
      <Text
      fontFamily={'roboto'}
      fontWeight={'300'}
      fontSize={'12px'}
      textAlign={'center'}
      color={textBlack ? 'fontgray' : '#fff'}
      >{
        isAuthenticated ? t('profile') : t('login')
      }
        </Text>

    </Flex>
  );
};

export default ProfileBtn;
