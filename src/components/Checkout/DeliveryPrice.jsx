"use client";

import { ENDPOINTS } from "@/api/endpoints";
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SpinnerBox from "../ui/SpinnerBox";

const DeliveryPrice = ({ id,token , setDeliveryPrice,adress}) => {
  const [price, setPrice] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);

  async function getDeliveryPrice() {
    setIsRequesting(true);

    try {
      const res = await fetch(ENDPOINTS.getDeliveryPrice(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_address_id: id,
        }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setPrice(data.delivery_info.delivery_fee);
        setDeliveryPrice(data.delivery_info.delivery_fee);
        setIsRequesting(false);
      }
    } catch (error) {
      setPrice('Неверный адрес');
      setIsRequesting(false);
    }

  }

  useEffect(() => {
    if(adress?.city){
      getDeliveryPrice();
    }
  }, [adress?.city]);

  return (
    <Box position={"relative"}>
      {id ? (
        <>{isRequesting ? <SpinnerBox size="sm" /> : <Text>{price} сом</Text>}</>
      ) : (
        <Text>адрес доставки не указан</Text>
      )}
    </Box>
  );
};

export default DeliveryPrice;
