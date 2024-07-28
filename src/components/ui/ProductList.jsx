"use client";

import { Flex, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductDetails from "../Modals/ProductDetails";

const ProductList = ({products}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const items = [...products.products]


  const [selectedProduct,setSelectedProduct] = useState(null);

  const handleButtonClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Flex
      flexDir={"row"}
      flexWrap={"wrap"}
      columnGap={"20px"}
      rowGap={{ base: "20px", lg: "40px" }}
      mb={{ base: "111px", lg: "129px" }}
      pt={'30px'}
    >
     {products?.products?.map(product => <ProductCard key={product.id} product={product} onButtonClick={handleButtonClick} />)}
      <ProductDetails isOpen={isOpen} onClose={onClose} product={selectedProduct} />
    </Flex>
  );
};

export default ProductList;
