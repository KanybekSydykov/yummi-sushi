"use client";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import ProductDetails from "../Modals/ProductDetails";

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

const CartItem = ({
  isLast = false,
  item,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scope, animate] = useAnimate();

  async function handleDelete() {
    if (scope.current) {
      await animate(scope.current, { opacity: 0, x: -200 }, { duration: 0.3 });
      deleteItem(item.id);
    }
  }

  return (
    <>
      <Flex
        flexDir={"column"}
        ref={scope}
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
              src={item.product.photo}
              fill
              alt={"pizza"}
              sizes="100%"
              style={{
                borderRadius: "10px",
                boxShadow: " 0px 0px 1px 0px #87878740",
              }}
            />
            {/* <Image
                src={"/category-img.png"}
                fill
                alt={"pizza"}
                sizes="100%"
                style={{
                  borderRadius: "10px",
                  boxShadow: " 0px 0px 1px 0px #87878740",
                }}
              /> */}
          </AspectRatio>
          <Flex flexDir={"column"} gap={"8px"} onClick={() => onOpen()} flexGrow={1}>
            <Flex flexDir={"row"} justifyContent={"space-between"}>
              <Flex flexDir={"row"} gap={"8px"} alignItems={"center"}>
                <Heading {...headingStyles}>{item.product.name}</Heading>
                <Text
                  fontFamily={"roboto"}
                  fontWeight={"300"}
                  fontSize={"12px"}
                  color={"fontgray"}
                >
                  {item.selectedSize.size}
                </Text>
              </Flex>
              <Flex flexDir={"row"} alignItems={"center"} gap={"6px"}>
                {item.quantity > 1 && (
                  <Text
                    fontSize={"12px"}
                    fontFamily={"roboto"}
                    fontWeight={"600"}
                    color={"fontgray"}
                  >
                    {item.quantity} x
                  </Text>
                )}
                <Text {...priceStyles}>{item.price}</Text>
              </Flex>
            </Flex>
            <Text {...descriptionStyles}>{item.product.description}</Text>
            {item.addons.length > 0 ? (
              <Box>
                <Text
                  fontWeight={"600"}
                  fontFamily={"roboto"}
                  fontSize={"14px"}
                >
                  Добавки {item.addons.length}
                </Text>
                <Flex gap={"8px"} mt={"8px"} flexDir={"row"} flexWrap={"wrap"}>
                  {item.addons.map((addon) => (
                    <Text
                      flexShrink={0}
                      fontWeight={"300"}
                      fontSize={"12px"}
                      fontFamily={"roboto"}
                      key={addon.name}
                    >
                      +{addon.name} {addon.price} сом
                    </Text>
                  ))}
                </Flex>
              </Box>
            ) : null}
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
              item.quantity <= 1 ? handleDelete() : decreaseQuantity(item.id);
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
            {item.quantity}
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
              increaseQuantity(item.id);
            }}
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
            onClick={handleDelete}
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

      <ProductDetails
        isOpen={isOpen}
        onClose={onClose}
        product={item.product}
        size={item.selectedSize}
        selectedAddons={item.addons}
        isEdit={true}
        config={{ id: item.id, quantity: item.quantity }}
      />
    </>
  );
};

export default CartItem;
