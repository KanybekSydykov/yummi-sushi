"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  useDisclosure,
  AspectRatio,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import CartItem from "../ui/CartItem";
import Image from "next/image";

const headingStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: "16px",
  textAlign: "left",
  color: "#010101",
  display:'flex',
  flexDir:'row',
  alignItems:'center',
  gap:'10px',
};
const priceStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "20px", lg: "22px" },
  color: "main",
};

const descriptionStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "14px", lg: "16px" },
  color: "fontgray",
};
const OrderDetailsModal = ({ isOpen, onClose, onOpen, order }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={"20px"} maxW={{ base: "95%", lg: "980px" }}>
          <ModalBody>
            <Text
              fontFamily={"roboto"}
              fontWeight={"600"}
              fontSize={"20px"}
              textAlign={"center"}
              p={"16px"}
            >
              Детали заказа №1
            </Text>

            <Flex flexDir={"row"} w={"100%"}>
              {order?.order_items?.map((item) => (
                <Flex flexDir={"row"} gap={"16px"} alignItems={"center"}>
                  <AspectRatio
                    ratio={1}
                    w={{ base: "100px", lg: "150px" }}
                    flexShrink={0}
                    position={"relative"}
                  >
                    <Image
                      src={item.product.image}
                      fill
                      alt={"pizza"}
                      style={{
                        borderRadius: "10px",
                        boxShadow: " 0px 0px 1px 0px #87878740",
                      }}
                    />
                  </AspectRatio>
                  <Flex flexDir={"column"} gap={"8px"} >
                    <Heading {...headingStyles}>
                      {item.product.name}

                      {item.quantity > 1 && (
                        <Text
                          fontSize={"14px"}
                          fontFamily={"roboto"}
                          fontWeight={"600"}
                          color={"fontgray"}
                        >
                          x {item.quantity}
                        </Text>
                      )}
                    </Heading>
                    <Text {...descriptionStyles}>
                      18 хрустящих крыльев, пицца “Пепперони” (32 см), пицца
                      “Маргарита” (32 см), порция фри, 18 хрустящих крыльев,
                      пицца “Пепперони” (32 см), пицца “Маргарита” (32 см),
                      порция фри18 хрустящих крыльев, пицца “Пепперони” (32 см),
                      пицца “Маргарита” (32 см), порция фри
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={"#fff"}
              _hover={{ bg: "#fff" }}
              _focus={{ bg: "#fff" }}
              h={"60px"}
              w={"100%"}
              color={"main"}
              mr={3}
              p={0}
              fontFamily={"roboto"}
              fontWeight={"400"}
              fontSize={"20px"}
              boxShadow={"0px 0px 4px 0px rgba(151, 151, 151, 0.55)"}
              borderRadius={"10px"}
              onClick={() => {
                onClose();
              }}
            >
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;
