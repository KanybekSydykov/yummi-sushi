"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "../Modals/ProductDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "@/lib/navigation";
import Link from "next/link";
import { useCart } from "@/lib/context-api";

const ProductList = ({ products, start = false }) => {


  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      columnGap="20px"
      rowGap={{ base: "20px", lg: "40px" }}
      mb={{ base: "0px", lg: start ? "0px" : "129px" }}
      pt="30px"
    >
      {products?.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </Flex>
  );
};

export default ProductList;
