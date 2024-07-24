"use client";

import { AspectRatio, Flex, position, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const addonTitleStyle = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: "14px",
  color: "#555555",
};

const cardStyles = {
  flexDir: "column",
  position: "relative",
  flexShrink: 0,
  width: "100px",
  height: "175px",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "6px",
  borderRadius: "15px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  userSelect:'none',
  _hover:{
    boxShadow: "0px 0px 4px 2px rgba(255, 131, 65, .25)",
    borderColor:'rgba(255, 131, 65, 1)'
  }
};

const Addon = ({topping,handleAddon,active=false}) => {
  const [isActive, setIsActive] = useState(false);

  console.log(active);

  useEffect(() => {
    setIsActive(active)
  }, [active])

  function handleAddonClick(e) {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setIsActive((prev) => !prev);
    handleAddon(topping)
  }

  return (
    <Flex
      border={`1px solid ${isActive ? "#FF8341" : "#A0A0A0"}`}
      onClick={handleAddonClick}
      {...cardStyles}
    >
      {isActive && (
        <Image
          src={"/check-icon.svg"}
          width={18}
          alt={"check"}
          height={18}
          style={{ position: "absolute", top: "12px", right: "12px" ,zIndex:10}}
        />
      )}
      <AspectRatio ratio={1} width={"75px"} h={"75px"}>
        <Image src={topping.photo ? topping.photo : "/category-img.png"} fill alt={"addon"} priority sizes="100%"/>
      </AspectRatio>

      <Text {...addonTitleStyle}>{topping.name}</Text>

      <Flex flexDir={"row"} justifyContent={"space-between"} w={"100%"}>
        <Text fontFamily="roboto" fontWeight="700" fontSize="16px" color="main">
          {topping.price}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Addon;
