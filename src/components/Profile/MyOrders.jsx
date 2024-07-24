"use client";

import {
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "../ui/FormInput";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "../ui/CustomButton";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import OrderDetailsModal from "./OrderDetailsModal";

const MyOrders = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();


  function handleOrderDetails(){
    onOpen();
  }

  if (searchParams.get("tab") === "orders") {
    return (
      <Flex
        pos={{ base: "absolute", md: "relative" }}
        top={{ base: "0", md: "unset" }}
        left={{ base: "0", md: "unset" }}
        zIndex={"100"}
        bg={"#fff"}
        flexDir={"column"}
        gap={"20px"}
        boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
        borderRadius={"10px"}
        p={"30px"}
        w={{ base: "100%", lg: "fit-content" }}
        h={"fit-content"}
      >
        <Flex mb={"20px"} flexDir={"row"} gap={"30px"} alignItems={"center"}>
          <Button
            onClick={() => router.push("/profile")}
            display={{ base: "flex", md: "none" }}
            width={"50px"}
            h={"50px"}
            borderRadius={"50%"}
            bg={"#fff"}
            _hover={{
              bg: "#fff",
            }}
            _focus={{
              bg: "#fff",
            }}
            boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.25)"}
          >
            <ChevronLeftIcon width={"32px"} h={"32px"} />
          </Button>
          <Text fontFamily={"roboto"} fontSize={"18px"} fontWeight={"400"}>
            История заказов
          </Text>
        </Flex>

        <Flex>
          <TableContainer overflowX={"scroll"}>
            <Table variant="striped" colorScheme="gray">
              <TableCaption textAlign={{ base: "left", md: "center" }}>
                Нажмите на заказ чтобы посмотреть подробную информацию
              </TableCaption>
              <Thead>
                <Tr>
                  <Th isNumeric>№</Th>
                  <Th isNumeric>Цена</Th>
                  <Th isNumeric>Начислено баллов</Th>
                  <Th isNumeric>Товаров</Th>
                  <Th>Адрес</Th>
                  <Th>Статус</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr cursor={"pointer"} onClick={handleOrderDetails}>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>1000 сом</Td>
                  <Td isNumeric>25.4</Td>
                  <Td isNumeric>5</Td>
                  <Td>Турусбекова ул. 5 кв. 5 </Td>
                  <Td>Доставлен</Td>
                </Tr>
             
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>№</Th>
                  <Th isNumeric>Цена</Th>
                  <Th isNumeric>Начислено баллов</Th>
                  <Th isNumeric>Товаров</Th>
                  <Th>Адрес</Th>
                  <Th>Статус</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
        <OrderDetailsModal isOpen={isOpen} onClose={onClose}/>
      </Flex>
    );
  } else {
    return null;
  }
};

export default MyOrders;
