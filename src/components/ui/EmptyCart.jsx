'use client'
import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useTranslations } from "next-intl";

const EmptyCart = ({onClose}) => {
  const tCart = useTranslations('Cart')

  return (
    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={'50px'} h={'100%'}>
      <Image src={"/empty-cart.png"} alt="empty-cart" width={200} height={200} />

      <Text fontFamily={'roboto'} fontSize={'16px'} fontWeight={'500'} textAlign={'center'} maxW={'350px'}>
        {tCart('emptyDesc')}
      </Text>

    <CustomButton text={tCart('close')} fn={onClose} />
    </Flex>
  );
};

export default EmptyCart;
