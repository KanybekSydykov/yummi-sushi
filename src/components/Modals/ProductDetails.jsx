"use client";

import {
  AspectRatio,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Addon from "../ui/Addon";
import CustomButton from "../ui/CustomButton";
import { useCart } from "@/lib/context-api";

const productNameStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "18px", lg: "20px" },
  color: "#0a0a0a",
};

const priceStyles = {
  fontFamily: "roboto",
  fontWeight: "700",
  fontSize: { base: "20px", lg: "22px" },
  color: "main",
};

const discountStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "18px", lg: "20px" },
  color: "lightgray",
  textDecoration: "line-through",
};

const descriptionStyles = {
  fontFamily: "roboto",
  fontWeight: "400",
  fontSize: { base: "14px", lg: "16px" },
  color: "fontgray",
};

const imageStyles = {
  ratio: 1,
  width: { base: "100%", lg: "450px" },
  height: { base: "100%", lg: "450px" },
  flexShrink: 0,
  borderRadius: "25px",
  overflow: "hidden",
};

function ProductDetails({
  isOpen,
  onClose,
  product,
  size = undefined,
  selectedAddons = [],
  isEdit = false,
  config,
}) {
  const [selectedSize, setSelectedSize] = useState();
  const [addons, setAddons] = useState([]);
  const { addItem, editItem } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const toast = useToast();
  useEffect(() => {
    if (!product) return;
    if (size) {
      setSelectedSize(size);
    } else {
      setSelectedSize(product.product_sizes[0]);
    }

    setTotalPrice(product.product_sizes[0].discounted_price ? product.product_sizes[0].discounted_price : product.product_sizes[0].price);
  }, [product]);

  console.log(totalPrice);

  const handleAddonClick = (addon) => {
    if (addons.includes(addon)) {
      setAddons(addons.filter((a) => a !== addon));
    } else {
      setAddons([...addons, addon]);
    }
  };

  useEffect(() => {
    const price =  parseFloat(selectedSize?.discounted_price || selectedSize?.price);
    const addonsTotalPrice = addons.reduce(
      (sum, addon) => sum + (parseFloat(addon.price) || 0),
      0
    );
    setTotalPrice(price + addonsTotalPrice);
  }, [selectedSize,addons]);

  console.log(product);


  const handleAddToCart = () => {
    const sizePrice = parseFloat(selectedSize?.discounted_price || selectedSize?.price);
    const addonsTotalPrice = addons.reduce(
      (sum, addon) => sum + (parseFloat(addon.price) || 0),
      0
    );

    // Calculate full price (size price + addons price) and format it
    const fullPrice = (sizePrice + addonsTotalPrice).toFixed(2);

    const item = {
      id: uuidv4(),
      product: product,
      selectedSize: selectedSize,
      addons: addons,
      quantity: 1,
      price: fullPrice, // Use the calculated full price here
    };

    if (isEdit) {
      item.id = config.id;
      item.quantity = config.quantity;
      editItem(item);
      onClose();
      return;
    }

    addItem(item);
    toast({
      title: "Товар добавлен в корзину",
      status: "success",
      duration: 1500,
      isClosable: true,
      position: "top-right",
      render: ({ id, onClose }) => (
        <Flex
          id={id}
          bg={"rgb(55,53,53)"}
          p={"8px 12px"}
          borderRadius={"10px"}
          color={"#fff"}
          flexDir={"column"}
          gap={"8px"}
          fontFamily={"roboto"}
          fontWeight={"400"}
          onClick={onClose}
        >
          <Text fontSize={"14px"}>Добавлено:</Text>
          <Text fontSize={"16px"}>
            {product.name} {selectedSize.size}
          </Text>
        </Flex>
      ),
    });
    onClose();
  };

  if (!product) return null;

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="10px"
        />
        <ModalContent
          minW={{ base: "auto", lg: "fit-content" }}
          minH={{ base: "auto", lg: "fit-content" }}
          borderRadius={"25px"}
          width={{ base: "calc(100% - 32px)", lg: "fit-content" }}
          height={{ base: "80dvh", lg: "fit-content" }}
        >
          <ModalCloseButton
            top={{ base: "-36px", lg: "0.5rem" }}
            left={{ base: "calc(50% - 16px)", lg: "calc(100% - 40px)" }}
            bg={{ base: "white", lg: "none" }}
            borderRadius={"50%"}
            _focusVisible={{ boxShadow: "none" }}
          />
          <ModalBody p={{ base: "16px", lg: "30px" }}>
            <Flex
              flexDir={{ base: "column", lg: "row" }}
              gap={{ base: "20px", lg: "40px" }}
            >
              <AspectRatio {...imageStyles}>
                <Image
                  src={product.photo ? product.photo : "/category-img.png"}
                  fill
                  alt="product image"
                  sizes="100%"
                  priority={true}
                />
              </AspectRatio>

              <Flex flexDir={"column"} flexGrow={1} maxW={"550px"} gap={"16px"}>
                <Heading {...productNameStyles}>{product.name}</Heading>
                <Flex
                  bg={"rgb(243, 243, 247)"}
                  flexDir={"row"}
                  borderRadius={"30px"}
                  p={"2px 2.5px"}
                  w={"fit-content"}
                >
                  {product.product_sizes.map((size) => (
                    <Button
                      key={size.size}
                      onClick={() => setSelectedSize(size)}
                      borderRadius={"30px"}
                      bg={
                        selectedSize?.id === size.id ? "white" : "transparent"
                      }
                      boxShadow={
                        selectedSize?.id === size.id
                          ? "1px 0px 10px 0px rgba(0,0,0,0.3)"
                          : "none"
                      }
                      _focus={{ bg: "white" }}
                      _hover={{ bg: "white" }}
                      color={"#000"}
                      fontSize={"16px"}
                      fontWeight={"500"}
                      transition={"all .3s ease"}
                      w={"120px"}
                    >
                      {size.size}
                    </Button>
                  ))}
                </Flex>

                <Flex
                  flexDir={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  gap={"8px"}
                >
                  <Text {...priceStyles}>{selectedSize?.discounted_price ? selectedSize?.discounted_price : selectedSize?.price} сом</Text>
                  {selectedSize?.discounted_price && (
                    <Text {...discountStyles}>
                      {selectedSize?.price} сом
                    </Text> 
                  )}
                </Flex>

                <Text {...descriptionStyles}>{product.description}</Text>

                <Flex flexDir={"column"}>
                  <Text
                    fontFamily={"roboto"}
                    fontWeight={"700"}
                    fontSize={"20px"}
                    color={"fontgray"}
                  >
                    Добавки
                  </Text>

                  <Flex
                    mt={"20px"}
                    flexDir={"row"}
                    flexWrap={"wrap"}
                    gap={"16px"}
                  >
                    {product.toppings.map((topping) => (
                      <Addon
                        key={topping.name}
                        topping={topping}
                        handleAddon={handleAddonClick}
                        active={selectedAddons?.includes(topping)}
                      />
                    ))}
                  </Flex>
                </Flex>
                <CustomButton
                  text={
                    isEdit
                      ? `Сохранить ${totalPrice} сом`
                      : `В корзину за ${totalPrice} сом`
                  }
                  fn={handleAddToCart}
                />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductDetails;
