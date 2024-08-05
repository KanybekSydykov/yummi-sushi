"use client";
import { AspectRatio, Flex, Heading, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context-api";

const ProductCard = ({ product }) => {
  const t = useTranslations("Common");
  const { setSelectedProduct } = useCart();
  const router = useRouter();


  function handleProductClick(product) {
    setSelectedProduct(product);
    router.push(`/product/${product.id}`, { scroll: false });
  }
  return (
    <Flex
      flexDir={{ base: "row", lg: "column" }}
      flexWrap={"wrap"}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      borderRadius={"20px"}
      bg={"rgba(249,250,251,0.75)"}
      width={{ base: "100%", lg: "240px" }}
      overflow={"hidden"}
      transition={"all 0.3s ease-in-out"}
      boxShadow={"0px 0px 2px 0px rgba(0, 0, 0, 0.25)"}
      _hover={{
        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
        bg: "rgba(249,250,251,1)",
      }}
      cursor="pointer"
      maxW={{ base: "100%", lg: "240px" }}
      onClick={() => handleProductClick(product)}
      role="group"
    >
      <Box
        overflow={"hidden"}
        w={{ base: "158px", lg: "240px" }}
        h={{ base: "auto", lg: "240px" }}
        flexShrink={0}
        borderBottomRightRadius={{base:"20px",lg:'unset'}}

      >
        <AspectRatio
          ratio={1}
          width={{ base: "158px", lg: "240px" }}
          height={{ base: "100%", lg: "240px" }}
          position="relative"
          transition="transform 0.3s ease"
          _groupHover={{
            transform: "scale3d(1.1, 1.1, 1.05)",
          }}
        >
          <Image
            src={product?.photo ? product?.photo : "/category-img.png"}
            fill
            alt="product image"
            sizes="100% 100%"
          />
          {/* <Image src={"/category-img.png"} fill alt="product image" priority={true} sizes="100%" /> */}
        </AspectRatio>
      </Box>

      <Flex
        p={{ base: "6px 12px", lg: "16px" }}
        flexDir={"column"}
        gap={"16px"}
        h={{ base: "auto", lg: "244px" }}
        justifyContent={{ base: "flex-start", lg: "space-between" }}
        maxW={{ base: "158px", lg: "240px" }}
      >
        <Heading
          fontFamily={"roboto"}
          fontWeight={"600"}
          fontSize={{ base: "16px", lg: "18px" }}
          color={"#0a0a0a"}
          h={"43px"}
          noOfLines={{ base: 3, lg: 2 }}
        >
          {product?.name}
        </Heading>

        <Flex
          flexDir={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"16px"}
          display={{ base: "none", lg: "flex" }}
        >
          <Text
            fontFamily="roboto"
            fontWeight="700"
            fontSize={{ base: "20px", lg: "22px" }}
            color="main"
          >
            {product?.product_sizes[0].discounted_price
              ? product.product_sizes[0].discounted_price
              : product?.product_sizes[0].price}{" "}
            сом
          </Text>
          {product?.product_sizes[0].discounted_price && (
            <Text
              fontFamily="roboto"
              fontWeight="400"
              fontSize={{ base: "18px", lg: "20px" }}
              color="lightgray"
              textDecoration="line-through"
            >
              {product?.product_sizes[0].price} сом
            </Text>
          )}
        </Flex>

        <Text
          noOfLines={{ base: 3, lg: 2 }}
          fontFamily="roboto"
          fontWeight="400"
          fontSize={{ base: "14px", lg: "16px" }}
          color="fontgray"
        >
          {product?.description}
        </Text>

        <Flex display={{ base: "none", lg: "flex" }}>
          <CustomButton text={t("choose")} />
        </Flex>
      </Flex>
      <Flex
        display={{ base: "flex", lg: "none" }}
        p={"6px 12px"}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        gap={"32px"}
      >
        <Flex
          flexDir={"row"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={"16px"}
        >
          <Text
           fontFamily="roboto"
           fontWeight="700"
           fontSize={{ base: "20px", lg: "22px" }}
           color="main"
          >
            {product?.product_sizes[0].discounted_price
              ? product.product_sizes[0].discounted_price
              : product?.product_sizes[0].price}{" "}
            сом
          </Text>
          {product?.product_sizes[0].discounted_price && (
            <Text  fontFamily="roboto"
            fontWeight="400"
            fontSize={{ base: "18px", lg: "20px" }}
            color="lightgray"
            textDecoration="line-through">
              {product?.product_sizes[0].price} сом
            </Text>
          )}
        </Flex>
        <Flex display={{ base: "flex", lg: "none" }}>
          <CustomButton text={t("choose")} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProductCard;
