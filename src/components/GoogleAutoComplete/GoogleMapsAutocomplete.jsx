// components/GoogleMapsAutocomplete.js
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import { Box, Flex, Input, Text } from "@chakra-ui/react";

const libraries = ["places"];

const GoogleMapsAutocomplete = ({ city,setCity }) => {
  const inputRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [selectedAdress, setSelectedAdress] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBE48_b_ypN4lXhuTRjxUa_zykGMYGCVCk", // Replace with your actual API key
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();

      if (inputRef.current) {
        if(city){
            inputRef.current.value = city;
        }
        const handleInputChange = (e) => {
          const value = e.target.value;
          setInputValue(value);

          if (autocompleteService) {
            autocompleteService.getPlacePredictions(
              { input: value },
              (predictions, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  predictions
                ) {
                  console.log("Predictions:", predictions);
                  setAddresses(predictions);
                }
              }
            );
          }
        };

        inputRef.current.addEventListener("input", handleInputChange);

        return () => {
          if (inputRef.current) {
            inputRef.current.removeEventListener("input", handleInputChange);
          }
        };
      }
    }
 
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  function handleAddressSelect(address) {
    setSelectedAdress(address);
    setCity(address);
    inputRef.current.value = address;
    setAddresses([]);
  }

  console.log(addresses, selectedAdress);
  return (
    <Flex position={"relative"} flexDir={"column"} gap={"8px"}>
      <label
        htmlFor="address"
        style={{
          fontFamily: "var(--chakra-fonts-roboto)",
          fontWeight: "300",
          fontSize: "16px",
          lineHeight: "24px",
          color: "rgba(54,54,54,1)",
        }}
      >
        Город,улица и дом
      </label>
      <Input
        ref={inputRef}
        type="text"
        id="address"
        placeholder="Адрес"
        width={"100%"}
        height={"56px"}
        padding={"0.5rem 0.5rem"}
        fontSize={"1rem"}
        border={"1px solid rgb(160,160,160)"}
        borderRadius={"10px"}
        _focus={{
          outline: "none",
          borderColor: "rgba(203, 70, 9, .5)",
          boxShadow: "0 0 0 1px rgba(203, 70, 9, .25)",
        }}
      />
      {addresses.length > 0 ? (
        <Flex
          className="autocomplete-dropdown-container"
          position={"absolute"}
          top={"100%"}
          left={0}
          width={"100%"}
          maxH={"200px"}
          overflowY={"auto"}
          flexDir={"column"}
          bg={"#fff"}
          zIndex={10}
        >
          {addresses.map((address, index, array) => (
            <Box
              key={index}
              p={"12px 6px"}
              borderBottom={
                array.length - 1 === index ? "none" : "1px solid #eaeaea"
              }
              _hover={{ bg: "#f5f5f5" }}
              onClick={() => handleAddressSelect(address.description)}
              cursor={"pointer"}
            >
              <Text fontFamily={"roboto"} fontSize={"16px"} fontWeight={"400"}>
                {address.description}
              </Text>
            </Box>
          ))}
        </Flex>
      ) : null}
    </Flex>
  );
};

export default GoogleMapsAutocomplete;
