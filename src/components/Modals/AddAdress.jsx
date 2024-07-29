"use client";

import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Grid,
  GridItem,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FormInput from "../ui/FormInput";
import { getSession } from "@/lib/auth";
import { ENDPOINTS } from "@/api/endpoints";
import GoogleMapsAutocomplete from "../GoogleAutoComplete/GoogleMapsAutocomplete";

export default function AdressModal({
  children,
  data = false,
  isEdit = false,
  setAddressInfo,
  addNewAddres,
  handleAdressSelect,
  deleteUserAdress,
}) {

  console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isRequesting, setIsRequesting] = useState(false);

  const [city, setCity] = useState(data.city ? data.city : "");
  const [floor, setFloor] = useState(data.floor ? data.floor : "");
  const [apartment, setApartment] = useState(
    data.apartment_number ? data.apartment_number : ""
  );
  const [entrance, setEntrance] = useState(data.entrance ? data.entrance : "");
  const [intercom, setIntercom] = useState(data.intercom ? data.intercom : "");

  async function postUserAdress(headers, address) {
    return await fetch(`${ENDPOINTS.postUserAdress()}`, {
      method: "POST",
      headers,
      body: JSON.stringify(address),
    });
  }

  async function patchUserAdress(id, headers, address) {
    return await fetch(`${ENDPOINTS.patchUserAdress(id)}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(address),
    });
  }

  const sendAdress = async () => {
    setIsRequesting(true);
    const address = {
      city,
      floor,
      apartment_number: apartment,
      entrance,
      intercom,
      is_primary: true,
    };

    const { access_token } = await getSession();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const res = isEdit
      ? await patchUserAdress(data.id, headers, address)
      : await postUserAdress(headers, address);
    const responseData = await res.json();
    if (res.ok) {
      if (isEdit) {
        setAddressInfo(responseData);
      } else {
        addNewAddres(responseData);
      }
      handleAdressSelect(responseData.id, responseData);
      onClose();
      setIsRequesting(false);
    }
  };

  return (
    <>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent fontFamily={"roboto"}>
          {isRequesting && (
            <Box
              zIndex={999}
              position={"absolute"}
              bg={"rgba(0,0,0,0.5)"}
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Spinner color={"orange.500"} size={"xl"} />
            </Box>
          )}
          <ModalHeader>
            <Text
              fontWeight={"700"}
              fontSize={"16px"}
              lineHeight={"22px"}
              color={"rgba(54, 54, 54, 1)"}
            >
              Добавить новый адрес
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              gridTemplateColumns={"repeat(2, minmax(0,1fr))"}
              rowGap={"20px"}
              columnGap={"16px"}
            >
              <GridItem colSpan={2}>
                <GoogleMapsAutocomplete city={city}  setCity={setCity} />
              </GridItem>
          
              <GridItem colSpan={1}>
                <FormInput
                  title={"Квартира"}
                  title_en={"Apartment number"}
                  value={apartment}
                  setValue={setApartment}
                  type={"text"}
                  required
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormInput
                  title={"Подъезд"}
                  title_en={"Entrance"}
                  value={entrance}
                  setValue={setEntrance}
                  type={"number"}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormInput
                  title={"Этаж"}
                  title_en={"Floor"}
                  value={floor}
                  setValue={setFloor}
                  type={"number"}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <FormInput
                  title={"Домофон"}
                  title_en={"Intercom"}
                  value={intercom}
                  setValue={setIntercom}
                  type={"number"}
                />
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter
            flexDir={"column"}
            gap={"20px"}
            fontWeight={"400"}
            lineHeight={"22px"}
            color={"#fff"}
            mt={"50px"}
          >
            <Button
              width={"100%"}
              h={"50px"}
              borderRadius={"10px"}
              bg={"rgba(40, 167, 69,0.75)"}
              fontSize={"18px"}
              _hover={{
                bg: "rgba(40, 167, 69,1)",
              }}
              color={"#fff"}
              onClick={sendAdress}
            >
              Сохранить
            </Button>
            {isEdit && (
              <Button
                width={"100%"}
                h={"50px"}
                borderRadius={"10px"}
                bg={"rgba(203, 70, 9, .75)"}
                fontSize={"18px"}
                _hover={{
                  bg: "rgba(203, 70, 9, 1)",
                }}
                color={"#fff"}
                onClick={() => {
                  deleteUserAdress(data.id);
                  onClose();
                }}
              >
                Удалить
              </Button>
            )}
            <Button
              width={"100%"}
              h={"50px"}
              color={"rgba(203, 70, 9, 1)"}
              border={"1px solid rgba(203, 70, 9, 1)"}
              borderRadius={"10px"}
              bg={"#fff"}
              onClick={onClose}
            >
              Отменить
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
