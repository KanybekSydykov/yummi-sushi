import { Flex} from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getTranslations } from "next-intl/server";

const ProductList = async ({ products, start = false }) => {
  const t = await getTranslations("Common");



  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      columnGap="20px"
      rowGap={{ base: "20px", lg: "40px" }}
      mb={{ base: "0px", lg: start ? "0px" : "129px" }}
      pt="30px"
    >
      {products?.products.map((product,index) => (
        <ProductCard
          key={index}
          product={product}
          t={t}
        />
      ))}
    </Flex>
  );
};

export default ProductList;
