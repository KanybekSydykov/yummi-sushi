import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";

const EmptyCart = ({onClose}) => {
  return (
    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} gap={'50px'} h={'100%'}>
      <Image src={"/empty-cart.png"} width={200} height={200} />

      <Text fontFamily={'roboto'} fontSize={'16px'} fontWeight={'500'} textAlign={'center'} maxW={'350px'}>
        Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар. Мы
        доставим ваш заказ от 1000 сом
      </Text>

    <CustomButton text={'Закрыть'} fn={onClose} />
    </Flex>
  );
};

export default EmptyCart;
