"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "../Modals/ProductDetails";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "@/lib/navigation";

const ProductList = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const items = [...products.products];
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const productId = searchParams.get("product");
    if (productId) {
      const product = items.find((item) => item.id === +productId);
      if (product && isOpen===false) {
        setSelectedProduct(product);
        onOpen();
      }
    } else if(isOpen) {
      onClose();
    }
  }, [searchParams, items]);

  const handleButtonClick = (product) => {
    router.replace(`${path}?product=${product.id}`,{scroll:false});
  };

  return (
    <Flex
      flexDir={"row"}
      flexWrap={"wrap"}
      columnGap={"20px"}
      rowGap={{ base: "20px", lg: "40px" }}
      mb={{ base: "111px", lg: "129px" }}
      pt={"30px"}
    >
      {products?.products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onButtonClick={handleButtonClick}
        />
      ))}
      <ProductDetails
        isOpen={isOpen}
        onClose={onClose}
        product={selectedProduct}
      />
    </Flex>
  );
};

export default ProductList;
