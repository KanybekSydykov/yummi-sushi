"use client";
import { EditIcon } from "@chakra-ui/icons";
import { AspectRatio, Box, Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import AdressModal from "../Modals/AddAdress";

const AdressItem = ({ address,selectedAdressId,handleAdressSelect,deleteUserAdress }) => {

  const [addresInfo, setAddressInfo] = useState(address);

  console.log(addresInfo);

  const getAdressString = (item) => {
    return `${item.city}, ${
      item.entrance ? `, подъезд ${item.entrance}` : ""
    } ${item.floor ? `, этаж ${item.floor}` : ""} ${
      item.intercom ? `, домофон ${item.intercom}` : ""
    } `;
  };

  return (
    <Flex
      onClick={() => handleAdressSelect(address.id, address)}
      flexDir={"row"}
      borderRadius={"10px"}
      border={`2px solid ${address.id === selectedAdressId ? "#FF8341" : "#EAEAEA"}`}
      p={"10px"}
      gap={"10px"}
      alignItems={"center"}
      flexGrow={1}
      minH={"80px"}
      cursor={"pointer"}
    >
      <AspectRatio
        ratio={1}
        w={"20px"}
        h={"20px"}
        position={"relative"}
        flexShrink={0}
      >
        <Image src={"/location-icon.svg"} fill alt="location" />
      </AspectRatio>
      <Text maxW={"calc(100% - 60px)"} textAlign={"center"}>
        {getAdressString(addresInfo)}
      </Text>

      <Box ml="auto">
        <AdressModal
          data={addresInfo}
          isEdit={true}
          setAddressInfo={setAddressInfo}
          handleAdressSelect={handleAdressSelect}
          deleteUserAdress={deleteUserAdress}
        >
          <Button
            bg={"transparent"}
            minW={"unset"}
            minH={"unset"}
            w={"20px"}
            h={"20px"}
            color={"main"}
            _hover={{
              bg: "transparent",
            }}
            _focus={{
              bg: "transparent",
            }}
          >
            <EditIcon />
          </Button>
        </AdressModal>
      </Box>
    </Flex>
  );
};

export default AdressItem;
