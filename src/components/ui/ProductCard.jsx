'use client';

import { AspectRatio, Flex, Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import CustomButton from "./CustomButton";
import { Link } from "@/lib/navigation";
import LoadingImage from "./LoadingImage";
import { useTranslations } from "next-intl";

const ProductCard =({ product }) => {
  const t = useTranslations("Common");
  return (
    <Flex
      className="product-card"
      flexDir={{ base: "row", lg: "column" }}
      flexWrap={"wrap"}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      borderRadius={"20px"}
      bg={"rgba(249,250,251,0.75)"}
      width={{ base: "100%", lg: "240px" }}
      overflow={"hidden"}
      transition={"all 0.3s ease"}
      boxShadow={"0px 0px 2px 0px rgba(0, 0, 0, 0.25)"}
      _hover={{
        "@media screen and (min-width: 992px)": {
          boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)",
          bg: "rgba(249,250,251,1)",
        },
      }}
      cursor="pointer"
      maxW={{ base: "100%", lg: "240px" }}
      role="group"
      position={"relative"}
    >
      <Link
        href={`/product/${product?.id}`}
        prefetch={false}
        scroll={false}
        tabIndex={-1}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 5,
        }}
      />
      <Box
        overflow={"hidden"}
        w={{ base: "158px", lg: "240px" }}
        h={{ base: "auto", lg: "240px" }}
        flexShrink={0}
        borderBottomRightRadius={{ base: "20px", lg: "unset" }}
      >
        <AspectRatio
          ratio={1}
          width={{ base: "158px", lg: "240px" }}
          height={{ base: "100%", lg: "240px" }}
          position="relative"
          transition="transform 0.3s ease"
          _groupHover={{
            "@media screen and (min-width: 992px)": {
              transform: "scale3d(1.1, 1.1, 1.05)",
            },
          }}
        >
          <LoadingImage
            priority={true}
            src={product?.photo}
            alt={product.name}
          />
          {/* <Image src={"/category-img.png"} fill alt="product image" priority={true} sizes="100%" /> */}
        </AspectRatio>
      </Box>

      <Flex
        p={{ base: "6px 12px", lg: "12px" }}
        flexDir={"column"}
        gap={"16px"}
        h={{ base: "auto", lg: "244px" }}
        justifyContent={{ base: "flex-start", lg: "space-between" }}
        maxW={{ base: "158px", lg: "240px" }}
      >
        <Heading
          fontFamily={"roboto"}
          fontWeight={"600"}
          fontSize={{ base: "16px", lg: "20px" }}
          color={"#0a0a0a"}
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
          {product?.product_sizes[0].discounted_price ? (
            <Text
              fontFamily="roboto"
              fontWeight="400"
              fontSize={{ base: "18px", lg: "20px" }}
              color="lightgray"
              textDecoration="line-through"
            >
              {product?.product_sizes[0].price} сом
            </Text>
          ) : ''}
        </Flex>

        <Text
          noOfLines={{ base: 3, lg: 2 }}
          fontFamily="roboto"
          fontWeight="400"
          fontSize={{ base: "14px", lg: "18px" }}
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
        gap={{ base: "16px", lg: "32px" }}
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
          {product?.product_sizes[0].discounted_price ? (
            <Text
              fontFamily="roboto"
              fontWeight="400"
              fontSize={{ base: "18px", lg: "20px" }}
              color="lightgray"
              textDecoration="line-through"
            >
              {product?.product_sizes[0].price} сом
            </Text>
          ) : (
            ""
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
