import { ENDPOINTS } from "@/api/endpoints";
import ProductList from "@/components/ui/ProductList";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const getProducts = async (params) => {
  const data = await fetch(`${ENDPOINTS.getCategoryData(params.category)}`, {
    cache: "no-store",
    headers: {
      "Accept-Language": `${params.locale}`,
    },
  });
  const products = await data.json();
  return products;
};

const GetCategoryData = async ({ params, start = false }) => {
  const products = await getProducts(params);

  const headingStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "22px", lg: "36px" },
    textAlign: start ? "left" : "center",
    color: "main",
    marginBottom: { base: "20px", lg: "40px" },
    my: { base: "12px", lg: "16px" },
  };
  return (
    <Box
      as={"section"}
      id={params.category}
      paddingTop={{ base: start ? "30px" : "0px", lg: start ? "100px" : "0px" }}
    >
      <Heading {...headingStyles}>
        {products?.products[0].category_name}
      </Heading>

      <ProductList products={products ? products : null} start={start} />
    </Box>
  );
};

export default GetCategoryData;
