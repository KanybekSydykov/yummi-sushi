import { useCart } from "@/lib/context-api";
import { AspectRatio, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
const headingStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: "16px",
  textAlign: "left",
  color: "#010101",
};
const priceStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "16px", lg: "20px" },
  color: "main",
};

const descriptionStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "14px", lg: "16px" },
  color: "fontgray",
  noOfLines: 2,
};

const BonusCartItem = ({ product, isLast }) => {
  const {
    increaseBonusItemQuantity,
    decreaseBonusItemQuantity,
    removeBonusItem,
    bonusAmount
  } = useCart();
  return (
    <Flex
      flexDir={"column"}
      borderBottom={isLast ? "none" : "1px solid #E2E2E2"}
      pb={"16px"}
    >
      <Flex flexDir={"row"} gap={"16px"} alignItems={"flex-start"}>
        <AspectRatio
          ratio={1}
          w={{ base: "75px", lg: "75px" }}
          flexShrink={0}
          position={"relative"}
        >
          <Image
            src={product.product_photo}
            fill
            alt={"pizza"}
            sizes="100%"
            style={{
              borderRadius: "10px",
              boxShadow: " 0px 0px 1px 0px #87878740",
            }}
          />
        </AspectRatio>
        <Flex
          flexDir={"column"}
          gap={"8px"}
          flexGrow={1}
        >
          <Flex flexDir={"row"} justifyContent={"space-between"}>
            <Flex flexDir={"row"} gap={"8px"} alignItems={"center"}>
              <Heading {...headingStyles}>{product.product_name}</Heading>
              <Text
                fontFamily={"roboto"}
                fontWeight={"300"}
                fontSize={"12px"}
                color={"fontgray"}
              >
                {product.size}
              </Text>
            </Flex>
            <Flex flexDir={"row"} alignItems={"center"} gap={"6px"}>
              {product.quantity > 1 && (
                <Text
                  fontSize={"12px"}
                  fontFamily={"roboto"}
                  fontWeight={"600"}
                  color={"fontgray"}
                >
                  {product.quantity} x
                </Text>
              )}
              <Text {...priceStyles}>0 сом</Text>
            </Flex>
          </Flex>
          <Text {...descriptionStyles}>{product.product_description}</Text>
        </Flex>
      </Flex>

      <Flex flexDir={"row"} gap={"8px"} mt={"16px"}>
        <Button
          w={"32px"}
          h={"32px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          p={"6px"}
          filter={"grayscale(100%)"}
          _hover={{
            filter: "grayscale(0%)",
          }}
          onClick={(e) => {
            product.quantity <= 1
              ? removeBonusItem(product.bonusId)
              : decreaseBonusItemQuantity(product.bonusId);
          }}

        >
          <Image
            src={"/minus-icon.svg"}
            width={16}
            height={16}
            alt={"minus"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>

        <Text
          w={"32px"}
          h={"32px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          color={"#000"}
          textAlign={"center"}
          fontWeight={"400"}
          fontSize={"16px"}
          lineHeight={"24px"}
          fontFamily={"roboto"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {product.quantity}
        </Text>
        <Button
          w={"32px"}
          h={"32px"}
          borderRadius={"8px"}
          border={"1px solid rgba(226, 226, 226, 1)"}
          bg={"transparent"}
          p={"6px"}
          filter={"grayscale(100%)"}
          _hover={{
            filter: "grayscale(0%)",
          }}
          _disabled={{
            cursor: "not-allowed",
            opacity: "0.5",
          }}
          onClick={(e) => {
            e.stopPropagation();
            increaseBonusItemQuantity(product.bonusId);
          }}
          isDisabled={bonusAmount < product.bonus_price}

        >
          <Image
            src={"/plus-icon.svg"}
            width={16}
            height={16}
            alt={"plus"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>

        <Button
          w={"32px"}
          h={"32px"}
          borderRadius={"8px"}
          border={"1px solid rgba(255, 131, 66, .75)"}
          bg={"transparent"}
          p={"6px"}
          background={"rgba(255, 131,66, 0.55)"}
          ml={"auto"}
          _hover={{
            background: "rgba(255, 131,66, 1)",
          }}
          onClick={() => removeBonusItem(product.bonusId)}
        >
          <Image
            src={"/delete-icon.svg"}
            width={16}
            height={16}
            alt={"delete"}
            style={{
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Button>
      </Flex>
    </Flex>
  );
};

export default BonusCartItem;
