"use client";
import { useCart } from "@/lib/context-api";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import React from "react";


const AddBonusToCart = ({ item,bonusId }) => {
  const { addBonusItem, bonusAmount } = useCart();
  const toast = useToast();

  const handleAddBonus = () => {
    const body = {
      bonusId,
      quantity: 1,
      ...item,
    };

    addBonusItem(body);
    toast({
      title: "Товар добавлен в корзину",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top-right",
      render: ({ id, onClose }) => (
        <Flex
          id={id}
          bg={"rgb(55,53,53)"}
          p={"8px 12px"}
          borderRadius={"10px"}
          color={"#fff"}
          flexDir={"column"}
          gap={"8px"}
          fontFamily={"roboto"}
          fontWeight={"400"}
          onClick={onClose}
        >
          <Text fontSize={"14px"}>Добавлено:</Text>
          <Text fontSize={"16px"}>
            {item.product_name} {item.size}
          </Text>
        </Flex>
      ),
    });
  };

  return (
    <Button
      isDisabled={bonusAmount < item.bonus_price}
      bg={"rgba(255,131,65,0.75)"}
      onClick={handleAddBonus}
      _hover={{ bg: "rgba(255,131,65,1)" }}
      _active={{ bg: "#FF8341" }}
      _focus={{ bg: "rgba(255,131,65,1)"  }}
      borderRadius={"5px"}
    >
      <Text
        fontFamily={"roboto"}
        fontWeight={"600"}
        fontSize={"14px"}
        color={"#fff"}
      >
        Добавить за {item.bonus_price}
      </Text>
    </Button>
  );
};

export default AddBonusToCart;
