
'use client';

import { useCart } from "@/lib/context-api";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProfileBtn = ({ fn ,textBlack = false}) => {
  const {isAuthenticated} = useCart()
  const router = useRouter()

  function handleProfileClick() {
    if(!isAuthenticated){
      fn()
    } else {
      router.push('/profile?tab=profile')
    }
  }

  return (
    <Flex
      onClick={handleProfileClick}
      flexDir={"column"}
      gap={"7px"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      w={'47px'}
      h={'50px'}
      position={'relative'}
      cursor={'pointer'}
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
        isAuthenticated ? 'Профиль' : 'Войти'
      }
        </Text>
    </Flex>
  );
};

export default ProfileBtn;
