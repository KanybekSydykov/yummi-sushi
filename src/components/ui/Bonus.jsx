'use client'
import { ENDPOINTS } from "@/api/endpoints";
import { getSession } from "@/lib/auth";
import { useCart } from "@/lib/context-api";
import { Link } from "@/lib/navigation";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import BonusImg from '@/../public/bonus-icon.webp'

import React, { useEffect } from "react";

const Bonus = ({textColor='fontgray'}) => {
    const {isAuthenticated,setBonusAmount,bonusAmount} = useCart()

    async function getBonusAmount(){

        const {access_token} = await getSession()

      try {
        const response = await fetch(ENDPOINTS.getBonusAmount(), {
            headers: {
              Authorization: `Bearer ${access_token}`,
            }   
           })

           const data = await response.json()
           const bonus = data.bonus ? data.bonus : 0
           setBonusAmount(bonus)
      } catch (error) {
        throw new Error(error);
      }
    }

    useEffect(() => {
        if(isAuthenticated) getBonusAmount()
        
    }, [isAuthenticated])


  return (
    <Flex
    flexDir={"column"}
    gap={"7px"}
    justifyContent={"flex-start"}
    alignItems={"center"}
    w={"50px"}
    h={"50px"}
    position={"relative"}
    cursor={"pointer"}
    transition={"all 0.3s ease"}
    borderRadius={'5px'}
    _hover={{
      transform: "scale3d(1.05, 1.05, 1.05)",
      bg: "linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)), #FF8341",

    }}
    >
        <Flex flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
  {bonusAmount !== 0 && isAuthenticated && <Text fontFamily={'roboto'} fontWeight={'600'} fontSize={'10px'} color={'#000'}>
        +{Math.floor(bonusAmount)}
    </Text>}
      <AspectRatio
        position={"relative"}
        width={"24px"}
        height={"24px"}
        ratio={1}
      >
        <Image
          src={BonusImg}
          alt="bonus"
          fill
          sizes="24px"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </AspectRatio>
      </Flex>

      <Text
        fontFamily={"roboto"}
        fontWeight={"300"}
        fontSize={"12px"}
        color={textColor}
      >
        Бонус
      </Text>
      <Link href={'/bonus'} tabIndex={-1} prefetch={false} style={{position: 'absolute', top: '0', left: '0', bottom: '0', right: '0', width: '100%', height: '100%'}} />

    </Flex>
  );
};

export default Bonus;
