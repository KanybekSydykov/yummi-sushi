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
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FormInput from "../ui/FormInput";
import { useRouter, useSearchParams } from "next/navigation";
import CustomButton from "../ui/CustomButton";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import OrderDetailsModal from "./OrderDetailsModal";
import { ENDPOINTS } from "@/api/endpoints";

const MyOrders = ({ token }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      const res = await fetch(`${ENDPOINTS.getUserOrders()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setOrders(data);
      }
    } catch (error) {
      throw new Error({ status: error.status || 500 });
    }
  }

  function handleOrderDetails(order) {
    setSelectedOrder(order);
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
        w={{ base: "100%", lg: "auto" }}
        flexGrow={1}
        overflow={"hidden"}
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
                <Tr >
                  <Th isNumeric>№</Th>
                  <Th isNumeric>Цена</Th>
                  <Th isNumeric>Баллы</Th>
                  <Th isNumeric>Товаров</Th>
                  <Th>Адрес</Th>
                  <Th>Дата</Th>
                  <Th>Статус</Th>
                </Tr>
              </Thead>

              <Tbody>
                {orders.map((order) => (
                  <Tr
                    key={order.id}
                    cursor={"pointer"}
                    onClick={() => handleOrderDetails(order)}
                    _hover={{ bg: "rgba(255, 131, 65, 0.2)" }}
                  >
                    <Td isNumeric>{order.id}</Td>
                    <Td isNumeric>{order.total_amount} </Td>
                    <Td isNumeric>
                      {order.total_bonus_amount
                        ? order.total_bonus_amount
                        : "-"}
                    </Td>
                    <Td isNumeric>{order.order_items.length}</Td>
                    <Td>{order.order_time}</Td>
                    <Td>{order.order_time}</Td>
                    <Td>Доставлен</Td>
                  </Tr>
                ))}
              </Tbody>

              <Tfoot>
                <Tr>
                  <Th>№</Th>
                  <Th isNumeric>Цена</Th>
                  <Th isNumeric>Баллы</Th>
                  <Th isNumeric>Товаров</Th>
                  <Th>Адрес</Th>
                  <Th>Дата</Th>
                  <Th>Статус</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Flex>
        <OrderDetailsModal order={selectedOrder} isOpen={isOpen} onClose={onClose} />
      </Flex>
    );
  } else {
    return null;
  }
};

export default MyOrders;
