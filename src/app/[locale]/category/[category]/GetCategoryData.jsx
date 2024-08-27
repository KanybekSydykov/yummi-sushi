'use client';

import { Box, Heading } from "@chakra-ui/react";
import IntersectionObserverWrapper from "./FetchWhenVisible";
import ProductList from "@/components/ui/ProductList";
import { useEffect, useState } from 'react';
import { ENDPOINTS } from "@/api/endpoints";
import CategoryPageSkeleton from "@/components/Skeleton/CategoryPageSkeleton";

const GetCategoryData = ({ params, start = false, isFirstCategory = false }) => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const data = await fetch(`${ENDPOINTS.getCategoryData(params.category)}`, {
      cache: "no-cache",
      headers: {
        "Accept-Language": `${params.locale}`,
      },
    });
    const products = await data.json();
    setProducts(products);
  };

  useEffect(() => {
    if (isFirstCategory) {
      fetchProducts(); // Fetch immediately if it's the first category
    }
  }, [isFirstCategory]);

  const headingStyles = {
    fontFamily: "roboto",
    fontWeight: "700",
    fontSize: { base: "22px", lg: "36px" },
    textAlign: start ? "left" : "center",
    color: "main",
    marginBottom: { base: "20px", lg: "40px" },
  };

  return (
    <Box
      as={"section"}
      id={params.category}
      marginTop={{ base: start ? "50px" : "0px", lg: start ? "100px" : "0px" }}
    >
      <Heading {...headingStyles}>
        {products?.products[0]?.category_name}
      </Heading>
      {isFirstCategory ? (
        products ? <ProductList products={products} start={start} /> : <CategoryPageSkeleton />
      ) : (
        <IntersectionObserverWrapper onVisible={fetchProducts}>
          {products ? <ProductList products={products} start={start} /> : <CategoryPageSkeleton />}
        </IntersectionObserverWrapper>
      )}
    </Box>
  );
};

export default GetCategoryData;



// import { ENDPOINTS } from "@/api/endpoints";
// import ProductList from "@/components/ui/ProductList";
// import { Box, Flex, Heading } from "@chakra-ui/react";
// import React from "react";

// const getProducts = async (params) => {
//   const data = await fetch(`${ENDPOINTS.getCategoryData(params.category)}`, {
//     cache: "no-store",
//     headers: {
//       "Accept-Language": `${params.locale}`,
//     },
//   });
//   const products = await data.json();
//   return products;
// };

// const GetCategoryData = async ({ params, start = false }) => {
//   const products = await getProducts(params);

//   const headingStyles = {
//     fontFamily: "roboto",
//     fontWeight: "700",
//     fontSize: { base: "22px", lg: "36px" },
//     textAlign: start ? "left" : "center",
//     color: "main",
//     marginBottom: { base: "20px", lg: "40px" },
//   };
//   return (
//     <Box
//       as={"section"}
//       id={params.category}
//       paddingTop={{ base: start ? "50px" : "0px", lg: start ? "100px" : "0px" }}
//     >
//       <Heading {...headingStyles}>
//         {products?.products[0].category_name}
//       </Heading>

//       <ProductList products={products ? products : null} start={start} />
//     </Box>
//   );
// };

// export default GetCategoryData;
