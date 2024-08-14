"use client";
import React, { useEffect, useState } from "react";
import AdressItem from "./AdressItem";
import { ENDPOINTS } from "@/api/endpoints";
import { AspectRatio, Flex, Text } from "@chakra-ui/react";
import SpinnerBox from "./SpinnerBox";
import Image from "next/image";

const isRestaurantOpen = (openingHour, closingHour) => {
  const now = new Date();
  const currentHour = now.getHours();

  // Convert hours to numbers if they're in string format
  const opening = parseInt(openingHour, 10);
  const closing = parseInt(closingHour, 10);

  console.log(opening, closing, currentHour);
  

   if(currentHour >= opening && currentHour <= closing) {
    return true;
   } else {
    return false;
   }
};

const RestaurantAdresses = ({
  handleAdressSelect,
  selectedAdressId,
  setSelectedRestaurant,
  restaurants,
  selectedRestaurant
}) => {
  const [restaurantAdresses, setRestaurantAdresses] = useState(
    restaurants ? restaurants : []
  );
  const [isRequesting, setIsRequesting] = useState(false);
  
  return (
    <Flex flexDir={"column"} gap={"20px"} position={"relative"}>
      {restaurantAdresses?.map((address) => (
        <RestoranAdressItem
          key={address.id}
          setSelectedRestaurant={setSelectedRestaurant}
          address={address}
          selectedAdressId={selectedAdressId}
          handleAdressSelect={handleAdressSelect}
          selectedRestaurant={selectedRestaurant}
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
  selectedRestaurant
  
}) {

  const [isOpen, setIsOpen] = useState(isRestaurantOpen(address.opening_hours, address.closing_hours));

  return (
    <Flex
      flexDir={"row"}
      flexWrap={"wrap"}
      gap={"20px"}
      w={"100%"}
      borderRadius={"10px"}
      bg={isOpen ? "white" : "rgb(243, 243, 247)"}
      border={`2px solid ${
        selectedRestaurant?.id === address.id && isOpen ? "#FF8341" : "#EAEAEA"
      }`}
      p={"10px"}
      alignItems={"center"}
      flexGrow={1}
      minH={"80px"}
      cursor={isOpen ? "pointer" : "not-allowed"}
      onClick={isOpen ? () => {
        setSelectedRestaurant(address);
      } : null }
    >
      <AspectRatio
        ratio={1}
        w={"20px"}
        h={"20px"}
        position={"relative"}
        flexShrink={0}
      >
        <Image src={"/location-icon.svg"} fill alt="location" sizes="100%" />
      </AspectRatio>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Flex
        flexDir={"row"}
        gap={"8px"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        fontSize={'14px'}
        color={ isOpen ? 'green.500' : 'red.500'}
      >
        <Text>
         Заказы принимаем с
        </Text>
        <Text>{address.opening_hours}</Text> до
        <Text>{address.closing_hours}</Text>
      </Flex>
    </Flex>
  );
}
