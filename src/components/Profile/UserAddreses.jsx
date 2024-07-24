"use client";
import { ENDPOINTS } from "@/api/endpoints";
import { getSession } from "@/lib/auth";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdressModal from "../Modals/AddAdress";
import CustomButton from "../ui/CustomButton";
import AdressItem from "../ui/AdressItem";

const UserAddreses = ({handleAdressSelect,selectedAdressId}) => {
  const [addresses, setAddresses] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const getUserAddresses = async () => {
    const { access_token } = await getSession();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const res = await fetch(ENDPOINTS.getUserAdress(), {
      headers,
    });

    const data = await res.json();

    if (res.ok) {
      setAddresses(data);
      console.log(res);
      setIsRequesting(false);
    }
  };

  const deleteUserAdress = async (id) => {
    const { access_token } = await getSession();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    };
    const res = await fetch(ENDPOINTS.deleteAdress(id), {
      method: "DELETE",
      headers,
    });
    if (res.ok) {
      setAddresses((prev)=>prev.filter((address)=>address.id !== id))
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    setIsRequesting(true);
    getUserAddresses();
  }, []);

  function addNewAddres(adress){
    setAddresses((prev) => [...prev, adress])
  }

  console.log(addresses);

  return (
    <Box position={"relative"}>
      {!isRequesting ? (
        <Flex flexDir={"column"} gap={'40px'}>
          {addresses.length > 0 ? (
            <Flex w={"100%"} flexDir={"column"} gap={"24px"}>
              {addresses.map((address) => (
                <AdressItem key={address.id} address={address} selectedAdressId={selectedAdressId} handleAdressSelect={handleAdressSelect} deleteUserAdress={deleteUserAdress} />
              ))}
            </Flex>
          ) : (
            <Flex
              flexDir={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"24px"}
              w={"100%"}
            >
              <Text>
                У вас нет сохраненных адресов!
                <br />
                Добавьте адрес для доставки:
              </Text>
            </Flex>
          )}
          <AdressModal addNewAddres={addNewAddres} handleAdressSelect={handleAdressSelect}>
            <CustomButton text={"Добавить адрес"} />
          </AdressModal>
        </Flex>
      ) : (
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
    </Box>
  );
};

export default UserAddreses;
