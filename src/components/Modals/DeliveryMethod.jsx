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
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import AdressItem from "../ui/AdressItem";
import CustomButton from "../ui/CustomButton";
import AdressModal from "./AddAdress";
import UserAddreses from "../Profile/UserAddreses";
import RestaurantAdresses from "../ui/RestaurantAdresses";

const DELIVERY_OPTIONS = ["Самовывоз", "Доставка"];
const TITLE = ["Мои адреса", "Адреса филиалов"];

function DeliveryMethod({
  isOpen,
  onClose,
  setDeliveryMethod,
  deliveryMethod,
  handleAdressSelect,
  selectedAdressId,
  restaurants,
  setSelectedRestaurant
}) {

  console.log(restaurants);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign={"center"}
            fontSize={"32px"}
            fontWeight={"400"}
            fontFamily={"roboto"}
          ></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              bg={"rgb(243, 243, 247)"}
              flexDir={"row"}
              borderRadius={"30px"}
              p={"2px 2.5px"}
              w={"fit-content"}
              mx={"auto"}
              mb={"30px"}
            >
              <Button
                onClick={() => setDeliveryMethod("Доставку")}
                borderRadius={"30px"}
                bg={deliveryMethod === "Доставку" ? "white" : "transparent"}
                boxShadow={
                  deliveryMethod === "Доставку"
                    ? "1px 0px 10px 0px rgba(0,0,0,0.3)"
                    : "none"
                }
                _focus={{ bg: "white" }}
                _hover={{ bg: "white" }}
                color={"#000"}
                fontSize={"16px"}
                fontWeight={"500"}
                transition={"all .3s ease"}
                w={"160px"}
              >
                Доставка
              </Button>
              <Button
                onClick={() => setDeliveryMethod("Самовывоз")}
                borderRadius={"30px"}
                bg={deliveryMethod === "Самовывоз" ? "#fff" : "transparent"}
                boxShadow={
                  deliveryMethod === "Самовывоз"
                    ? "-1px 0px 10px 0px rgba(0,0,0,0.3)"
                    : "none"
                }
                transition={"all .3s ease"}
                _focus={{ bg: "white" }}
                _hover={{ bg: "white" }}
                color={"#000"}
                fontSize={"16px"}
                fontWeight={"500"}
                w={"160px"}
              >
                Самовывоз
              </Button>
            </Flex>
            <Box py={'20px'}>

            {deliveryMethod === "Доставку" ? (
              <UserAddreses handleAdressSelect={handleAdressSelect} selectedAdressId={selectedAdressId}/>
            ) : (
              <RestaurantAdresses handleAdressSelect={handleAdressSelect} selectedAdressId={selectedAdressId} restaurants={restaurants} setSelectedRestaurant={setSelectedRestaurant} />
            )}
            </Box>
          </ModalBody>

          <ModalFooter justifyContent={"space-between"} gap={"30px"}>
            {deliveryMethod === 0 && (
              <AdressModal>
                <Button
                  borderRadius={"30px"}
                  bg={"rgb(255 240 230)"}
                  color={"rgb(209, 87, 0)"}
                  _hover={{ bg: "rgb(255, 210, 179)" }}
                  fontSize={"16px"}
                  fontWeight={"500"}
                >
                  Добавить адрес
                </Button>
              </AdressModal>
            )}
            <Button
              flexGrow={1}
              borderRadius={"30px"}
              bg={"rgb(255 240 230)"}
              color={"rgb(209, 87, 0)"}
              _hover={{ bg: "rgb(255, 210, 179)" }}
              fontSize={"16px"}
              fontWeight={"500"}
              onClick={onClose}
            >
              Выбрать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeliveryMethod;
