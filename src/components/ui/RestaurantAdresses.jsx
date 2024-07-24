"use client";
import React, { useEffect, useState } from "react";
import AdressItem from "./AdressItem";
import { ENDPOINTS } from "@/api/endpoints";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import SpinnerBox from "./SpinnerBox";
import Image from "next/image";

const RestaurantAdresses = ({
  handleAdressSelect,
  selectedAdressId,
  setSelectedRestaurant,
  restaurants,
}) => {
  const [restaurantAdresses, setRestaurantAdresses] = useState(
    restaurants ? restaurants : []
  );
  const [isRequesting, setIsRequesting] = useState(false);

  console.log(restaurantAdresses);

  return (
    <Flex flexDir={"column"} gap={"20px"} position={"relative"}>
      {restaurantAdresses?.map((address) => (
        <RestoranAdressItem
          key={address.id}
          setSelectedRestaurant={setSelectedRestaurant}
          address={address}
          selectedAdressId={selectedAdressId}
          handleAdressSelect={handleAdressSelect}
        />
      ))}
      {isRequesting && <SpinnerBox />}
    </Flex>
  );
};

export default RestaurantAdresses;

function RestoranAdressItem({
  address,
  selectedAdressId,
  handleAdressSelect,
  setSelectedRestaurant,
}) {
  return (
    <Flex
      flexDir={"row"}
      flexWrap={"wrap"}
      gap={"20px"}
      w={"100%"}
      borderRadius={"10px"}
      border={`2px solid ${
        address.id === selectedAdressId ? "#FF8341" : "#EAEAEA"
      }`}
      p={"10px"}
      alignItems={"center"}
      flexGrow={1}
      minH={"80px"}
      cursor={"pointer"}
      onClick={() => {
        setSelectedRestaurant(address), handleAdressSelect(address.id);
      }}
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
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Flex
        flexDir={"row"}
        gap={"8px"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Text>{address.opening_hours}</Text>:
        <Text>{address.closing_hours}</Text>
      </Flex>
    </Flex>
  );
}
